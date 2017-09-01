var Corsi = require('../models/corsi');
var Facoltà = require('../models/corsiLaurea');
var Carriera = require('../models/appelliVerbalizzati');
var Studente = require('../models/user');

var CorsiController = function () { };

/** Creazione */
CorsiController.addCorso = function (data, callback) {
    var newCorso = new Corsi();

    newCorso.nome = data.nome;
    newCorso.codice = data.codice;
    newCorso.codFacoltà = data.codFacoltà;
    newCorso.matricolaP = data.matricolaP;
    newCorso.cfu = data.cfu;
    newCorso.anno = data.anno;

    newCorso.save(function (err) {
        if (err) throw err;
        console.log('Corso salvato con successo!');
    });
}

/** Aggiornamento dati */
CorsiController.updateCorso = function (cod, data, callback) {
    Corsi.findOneAndUpdate({ 'codice': cod },
        {
            'matricolaP': data.matricolaP,
            'cfu': data.cfu,
            'anno': data.anno
        }, function (err) {
            if (err) throw err;
            console.log('Dati aggiornati con successo!');
        });
}

/** Rimozione */
CorsiController.removeCorso = function (cod, callback) {
    Corsi.findOneAndRemove({ 'codice': cod }, function (err) {
        if (err) throw err;
        console.log('Corso rimosso con successo!');
    });
}

/** Ricerca di tutti i corsi disponibili */
CorsiController.listaCorsi = function (callback) {
    Corsi.find({}, function (err, corsi) {
        if (err) {
            console.log('Errore nella ricerca dei corsi ');
            return callback(err, null);
        }
        else
            return callback(null, corsi);
    }).sort('anno');
}

/** Ricerca dei corsi in base alla facoltà */
CorsiController.listaTuoiCorsi = function (userCodCorso, callback) {
    Corsi.find({ 'codFacoltà': userCodCorso }, function (err, tuoiCorsi) {
        if (err) {
            console.log('Errore nella ricerca dei corsi ');
            return callback(err, null);
        }
        else
            return callback(null, tuoiCorsi);
    }).sort('anno');
}

/** Inseriti i corsi nella tabella della rispettiva facoltà */
CorsiController.populateFacoltà = function (codFacoltà) {
    Facoltà.findOne({ 'codice': codFacoltà }, function (err, facoltà) {
        if (err) throw err;
        Corsi.find({ 'codFacoltà': codFacoltà }, function (err, corsi) {
            if (err) throw err;
            corsi.forEach(function (corso) {
                //controllo che non siano già presenti
                var confronto = facoltà.corsi.find(o => o === corso.codice);
                if (typeof confronto === 'undefined')
                    facoltà.corsi.push(corso.codice);
            });
            facoltà.save();
        });
    });
}

/** Ricerca dei corsi, in base al docente responsabile */
CorsiController.cercaCorsiDocente = function (matricolaP, callback) {
    Corsi.find({ 'matricolaP': matricolaP }, function (err, corsi) {
        if (err)
            return callback(err, null);
        else
            return callback(null, corsi);
    });
}

/** Ricerca dei corsi in base all'anno e alla facoltà frequentati */
CorsiController.corsiAnnuali = function (anno, codFacoltà, callback) {
    Corsi.find({ 'anno': anno, 'codFacoltà': codFacoltà }, function (err, corsiAnnuali) {
        if (err)
            return callback(err, null);
        else
            return callback(null, corsiAnnuali);
    });
}

CorsiController.appelliPrenotabili = function (utente, codFacoltà, callback) {
    Corsi.find({ 'codFacoltà': codFacoltà }, function (err, corsi) {
        var arrayAppelli = [];
        corsi.forEach(function (corso) {
            var confronto = true;
            if (corso.anno <= utente.annoCorso) {
                utente.carriera.forEach(function (c) {
                    if (c.codCorso === corso.codice)
                        confronto = false;
                });
                if (confronto)
                    arrayAppelli.push(corso);
            }
        });
        return callback(null, arrayAppelli);
    });
}

CorsiController.addCreditiLiberi = function (matricolaStudente, dati) {
    var newCarriera = new Carriera();
    newCarriera.codCorso = dati.codCorso;
    newCarriera.data = dati.data;
    newCarriera.cfu = dati.cfu;

    Studente.findOne({ 'matricola': matricolaStudente }, function (err, studente) {
        studente.carriera.push(newCarriera);
        studente.save();
    });
}

module.exports = CorsiController;