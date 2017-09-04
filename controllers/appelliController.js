var Docenti = require('../models/personale').model('Prof');
var Appelli = require('../models/esame');
var Carriera = require('../models/appelliVerbalizzati');
var Studente = require('../models/user');
var Corsi = require('../models/corsi');

var AppelliController = function () { };

//Aggiunta appello
AppelliController.addAppello = function (data, callback) {
    var newAppello = new Appelli();

    newAppello.idCorso = data.idCorso;
    newAppello.data = data.data;
    newAppello.ora = data.ora;
    newAppello.aula = data.aula;
    newAppello.matricolaP = data.matricolaP;

    newAppello.save(function (err) {
        if (err) throw err;
        console.log('Appello salvato con successo!');
    });
}

//Modifica appello
AppelliController.updateAppelli = function (id, data, callback) {
    Appelli.findOneAndUpdate({ '_id': id },
        {
            'data': data.data,
            'ora': data.ora,
            'aula': data.aula
        }, function (err) {
            if (err) throw err;
            console.log('Dati aggiornati con successo!');
        });
}

//Eliminazione appello
AppelliController.removeAppelli = function (id, callback) {
    Appelli.findOneAndRemove({ '_id': id }, function (err) {
        if (err) throw err;
        console.log('Appello rimosso con successo!');
    });
}

//Verbalizzazione appello
AppelliController.verbalizzaAppello = function (data, matricolaS) {
    var newCarriera = new Carriera();

    newCarriera.codCorso = data.codCorso;
    newCarriera.data = data.data;
    newCarriera.esito = data.esito;
    Corsi.findOne({ 'codice': data.codCorso }, function (err, corso) {
        newCarriera.cfu = corso.cfu;

        //salva l'esame nella carriera dello studente
        Studente.findOne({ 'matricola': matricolaS }, function (err, studente) {
            studente.carriera.push(newCarriera);
            studente.save(function (err) {
                if (err) throw err;
                console.log('Verbalizzazione avvenuta con successo!');
            });

            //cancella lo studente da tutte le prenotazioni agli appelli del corso che ha verbalizzato
            Appelli.find({ 'idCorso': data.codCorso }, function (err, appelli) {
                if (err) throw err;
                appelli.forEach(function (appello) {
                    var i = appello.matricolaS.indexOf(matricolaS);
                    if (i > -1)
                        appello.matricolaS.splice(i, 1);
                    appello.save();
                });
            });
        });
    });
}

//Calcolo dei cfu conseguiti, della media aritmetica e ponderata
AppelliController.calcolaProgressione = function (matricolaS, callback) {
    Studente.findOne({ 'matricola': matricolaS }, function (err, studente) {
        if (err) return callback(err, null, null, null);
        else {
            var progressioneCfu = 0;
            var mediaPonderata = 0;
            var a = 0;
            var p = 0;
            var sommaA = 0;
            var sommaP = 0;
            studente.carriera.forEach(function (element) {
                progressioneCfu += element.cfu;
                if (typeof element.esito !== 'undefined') { //ignora i crediti liberi
                    a++;
                    p += element.cfu;
                    sommaA += element.esito;
                    sommaP += element.esito * element.cfu;
                }
            });
            var mediaAritmetica = sommaA / a;
            var mediaPonderata = sommaP / p;
            return callback(null, progressioneCfu, mediaAritmetica, mediaPonderata);
        }
    });
}

//Ritorna la lista degli appelli tenuti da un docente, ordinati per codice e data
AppelliController.listaAppelli = function (docente, callback) {
    Appelli.find({ 'matricolaP': docente }, function (err, listaAppelli) {
        if (err) return callback(err, null);
        else
            return callback(null, listaAppelli);
    }).sort('idCorso').sort('data');
}

//Ritorna la lista degli appelli attivi per un corso, ordinati per data
AppelliController.listaAppelliPerCorso = function (idCorso, callback) {
    Appelli.find({ 'idCorso': idCorso }, function (err, listaAppelliPerCorso) {
        if (err) return callback(err, null);
        else
            return callback(null, listaAppelliPerCorso);
    }).sort('data');
}

//Salvataggio della matricola dello studente nella lista dei prenotati ad un determinato appello
AppelliController.prenotazione = function (matricolaStudente, id) {
    Appelli.findOne({ '_id': id }, function (err, appello) {
        if (err) throw err;
        appello.matricolaS.push(matricolaStudente);
        appello.save();
    });
    console.log('Prenotazione avvenuta con successo');
}

//Rimozione della matricola dello studente dalla lista dei prenotati ad un determinato appello
AppelliController.cancellaPrenotazione = function (matricolaStudente, id) {
    Appelli.findOne({ '_id': id }, function (err, appello) {
        if (err) throw err;
        var i = appello.matricolaS.indexOf(matricolaStudente);
        if (i > -1)
            appello.matricolaS.splice(i, 1);
        appello.save();
    });
    console.log('Prenotazione cancellata con successo');
}

//Aggiunti gli esiti di un appello nel db
AppelliController.addEsito = function (listEsiti, id) {
    Appelli.findOne({ '_id': id }, function (err, appello) {
        if (err) throw err;
        listEsiti.forEach(function (thisEsito) {
            appello.esito.push(thisEsito);
        });
        appello.save(); //! save() è asincrono. Per salvare i dati nell'ordine esatto in cui vengono inseriti, prima vengono pushati in un array
    });
}

//Creazione di un array contenente gli esiti, nell'ordine in cui sono stati inseriti dal docente
AppelliController.arrayEsiti = function (array, esito, callback) {
    Appelli.find(function (err) {
        if (err) return callback(err, null);
        else {
            array.push(esito);
            return callback(null, array);
        }
    });
}

//Ritorna la matrice degli studenti e dei rispettivi esiti
AppelliController.seeEsiti = function (id, callback) {
    Appelli.findOne({ '_id': id }, function (err, appello) {
        if (err) return callback(err, null);
        var matriceVoti = [];
        var votoPersonale = [];
        for (var i = 0; i < appello.esito.length; i++) {
            votoPersonale = [appello.matricolaS[i], appello.esito[i]];
            matriceVoti.push(votoPersonale);
        }
        return callback(null, matriceVoti);
    });
}

//Controllo se lo studente è prenotato ad un determinato appello
AppelliController.checkStudente = function (matricolaStudente, id, callback) {
    Appelli.findOne({ '_id': id }, function (err, appello) {
        if (err) return callback(err, null);
        var bool = appello.matricolaS.find(o => o === matricolaStudente);
        if (typeof bool === 'undefined')
            return callback(null, false);
        else callback(null, true);
    });
}

//Ricerca di un determinato appello
AppelliController.findAppello = function (idCorso, callback) {
    Appelli.findOne({ '_id': idCorso }, function (err, appello) {
        if (err)
            return callback(err, null);
        else
            return callback(null, appello);
    })
}

//Lista degli appelli a cui uno studente è prenotato
AppelliController.listaPerStudente = function (matricolaS, callback) {
    Appelli.find({ 'matricolaS': matricolaS }, function (err, appelliPrenotati) {
        if (err) return callback(err, null);
        else
            return callback(null, appelliPrenotati);
    });
}

//Invio degli esiti agli studenti
AppelliController.sendEsitoStudente = function (matricolaS, idAppello, callback) {
    Appelli.findOne({ '_id': idAppello }, function (err, appello) {
        if (err) return callback(err, null, null, null);
        else {
            var i = 0;
            appello.matricolaS.forEach(function (element) {
                if (element === matricolaS) {
                    var myEsito = appello.esito[i];
                    return callback(null, myEsito, appello.data, appello.idCorso);
                }
                i++;
            });
        }
    });
}

module.exports = AppelliController;