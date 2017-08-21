var Docenti = require('../models/personale').model('Prof');

var DocentiController = function () { };

DocentiController.listaDocenti = function (callback) {
    Docenti.find({}, function (err, docenti) {
        if (err) {
            console.log('Errore nella ricerca dei docenti ');
            return callback(err, null);   
        }
        else
            return callback(null, docenti);
    }).sort('matricola');
}

DocentiController.listaDocentiFacoltà = function (profCodFacoltà, callback) {
    Docenti.find({'codFacoltà' : profCodFacoltà}, function (err, docentiF) {
        if (err) {
            console.log('Errore nella ricerca dei docenti ');
            return callback(err, null);   
        }
        else
            return callback(null, docentiF);
    }).sort('matricola');
}

module.exports = DocentiController;