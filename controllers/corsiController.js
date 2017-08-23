var Corsi = require('../models/corsi');

var CorsiController = function () { };

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

CorsiController.removeCorso = function (cod, callback) {
    Corsi.findOneAndRemove({ 'codice': cod }, function (err) {
        if (err) throw err;
        console.log('Corso rimosso con successo!');
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
    }).sort('anno');
}

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

var Facoltà = require('../models/corsiLaurea');

/**
 * Inseriti i corsi nella tabella della rispettiva facoltà
 */
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

module.exports = CorsiController;