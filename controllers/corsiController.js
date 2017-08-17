var Corsi = require('../models/corsi');

var CorsiController = function () { };

CorsiController.addCorso = function (data, callback) {
    var newCorso = new Corsi();

    newCorso.nome = data.nome;
    newCorso.codice = data.codice;
    newCorso.codFacoltà = data.codFacoltà;
    newCorso.matricolaP = data.matricolaP;
    newCorso.cfu = data.cfu;

    newCorso.save(function (err) {
        if (err) throw err;
        console.log('Corso salvato con successo!');
    });
}

CorsiController.listaCorsi = function (callback) {
    Corsi.find({}, function (err, corsi) {
        if (err) {
            console.log('Errore nella ricerca dei corsi ');
            return callback(err, null);
        }
        else
            return callback(null, corsi);
    })
}

CorsiController.listaTuoiCorsi = function (userCodCorso, callback) {
    Corsi.find({ 'codFacoltà': userCodCorso }, function (err, tuoiCorsi) {
        if (err) {
            console.log('Errore nella ricerca dei corsi ');
            return callback(err, null);
        }
        else
            return callback(null, tuoiCorsi);
    });
}

module.exports = CorsiController;