var Studenti = require('../models/user').model('Student');
var StudentiController = function () { };

StudentiController.addStudente = function (data, callback) {
    var newStudente = new Studente();

    newStudente.nome = data.nome;
    newStudente.cognome = data.cognome;
    newStudente.stato = data.stato;
    newStudente.città = data.città;
    newStudente.cap = data.cap;
    newStudente.dataDiNascita = data.dataDiNascita;
    newStudente.matricola = data.matricola;
    newStudente.codFacoltà = data.codFacoltà;
    newStudente.email = data.email;
    newStudente.emailUniversitaria = data.emailUniversitaria;
    newStudente.telefono = data.telefono;
    newStudente.username = data.username;
    newStudente.password = data.password;
    newStudente.save(function (err) {
        if (err) throw err;
        console.log('Studente salvato con successo!');
    });
}

StudentiController.updateStudente = function (matricola, data, callback) {
    Studenti.findOneAndUpdate({ 'matricola': matricola },
        {
            'stato': data.stato,
            'città': data.città,
            'cap': data.cap,
            'dataDiNascita': data.dataDiNascita,
            'codFacoltà': data.codFacoltà,
            'email': data.email,
            'emailUniversitaria': data.emailUniversitaria,
            'telefono': data.telefono,
            'username': dara.username,
            'password': data.password

        }, function (err) {
            if (err) throw err;
            console.log('Dati aggiornati con successo!');
        });
}
    StudentiController.removeStundente = function (matricola, callback) {
    Studenti.findOneAndRemove({ 'matricola': matricola}, function (err) {
        if (err) throw err;
        console.log('Studente rimosso con successo!');
    });
}

StudentiController.listaStudenti = function (callback) {
    Studenti.find({}, function (err, studenti) {
        if (err) {
            console.log('Errore nella ricerca degli studenti');
            return callback(err, null);
        }
        else
            return callback(null, studenti);
    }).sort('matricola');
}

StudentiController.esitoConseguito = function (esiti, id) {
    Studenti.findOne({ '_id': id }, function (err, appello) {
        if (err) throw err;
        listEsiti.forEach(function (thisEsito) {
            appello.esito.push(thisEsito);
        });
        appello.save(); 
    });
}

module.exports = StudentiController;