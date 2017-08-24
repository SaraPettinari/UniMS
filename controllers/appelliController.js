var Docenti = require('../models/personale').model('Prof');
var Appelli = require('../models/esame');

var AppelliController = function () { };

AppelliController.addAppello = function (data, callback) {
    var newAppello = new Appelli();

    newAppello.idCorso = data.idCorso;
    newAppello.data = data.data;
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
            'aula': data.aula
        }, function (err) {
            if (err) throw err;
            console.log('Dati aggiornati con successo!');
        });
}

AppelliController.removeAppelli = function (cod, callback) {
    Appelli.findOneAndRemove({ 'idCorso': cod }, function (err) {
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

AppelliController.listaAppelli=function(docente, callback){
    Appelli.find({'matricolaP': docente},function(err,listaAppelli){
        if (err) return callback(err, null);
        else
            return callback (null, listaAppelli);
    }).sort('data');
}
module.exports = AppelliController;