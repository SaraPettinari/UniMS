var Docenti = require('../models/personale').model('Prof');
var Appelli = require('../models/esame');

var AppelliController = function () { };

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

AppelliController.removeAppelli = function (id, callback) {
    Appelli.findOneAndRemove({ '_id': id }, function (err) {
        if (err) throw err;
        console.log('Appello rimosso con successo!');
    });
}
/*
AppelliController.verbalizzaAppello = function (data, callback) {
    var newAppello = new Appello();

    newAppello.codCorso = data.codCorso;
    newAppello.data = data.data;
    newAppello.esito = data.esito;
   
    newAppello.save(function (err) {
        if (err) throw err;
        console.log('Verbalizzazione avvenuta con successo!');
    });
}*/

AppelliController.listaAppelli = function (docente, callback) {
    Appelli.find({ 'matricolaP': docente }, function (err, listaAppelli) {
        if (err) return callback(err, null);
        else
            return callback(null, listaAppelli);
    }).sort('idCorso').sort('data');
}

AppelliController.listaAppelliPerCorso = function (idCorso, callback) {
    Appelli.find({ 'idCorso': idCorso }, function (err, listaAppelliPerCorso) {
        if (err) return callback(err, null);
        else
            return callback(null, listaAppelliPerCorso);
    }).sort('data');
}

AppelliController.prenotazione = function (matricolaStudente, id) {
    Appelli.findOne({ '_id': id }, function (err, appello) {
        if (err) throw err;
        appello.matricolaS.push(matricolaStudente);
        appello.save();
    });
    console.log('Prenotazione avvenuta con successo');
}

AppelliController.addESito = function (id, esito) {
    Appelli.findOne({ '_id': id }, function (err, appello) {
        if (err) throw err;
        appello.esito.push(esito);
        appello.save();
    });
   
}

AppelliController.checkStudente = function (matricolaStudente, id, callback) {
    Appelli.findOne({ '_id': id }, function (err, appello) {
        if (err) return callback(err, null);
        var bool = appello.matricolaS.find(o => o === matricolaStudente);
        if (typeof bool === 'undefined')
            return callback(null, false);
        else callback(null, true);
    });
}

module.exports = AppelliController;