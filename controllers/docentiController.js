var Docenti = require('../models/personale').model('Prof');

var DocentiController = function () { };

//Lista complessiva dei docenti, ordinati per matricola
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

//Lista dei docenti di un determinato corso di laurea, ordinati per matricola
DocentiController.listaDocentiFacoltà = function (profCodFacoltà, callback) {
    Docenti.find({ 'codFacoltà': profCodFacoltà }, function (err, docentiF) {
        if (err) {
            console.log('Errore nella ricerca dei docenti ');
            return callback(err, null);
        }
        else
            return callback(null, docentiF);
    }).sort('matricola');
}

//Registrazione docente
DocentiController.addDocente = function (data) {
    var username = data.username;
    // in caso di omonimia allo username verrà aggiunto progressivamente un numero
    var reg = new RegExp('^' + username); //cerco gli elementi che hanno lo stesso prefisso
    Docenti.find({ 'username': reg }).count(function (err, count) {
        if (count > 0)
            username = username.concat(count);
        //creo un nuovo docente
        var newProf = new Docenti();
        // le credenziali verranno settate in base a ciò che verrà inserito nel form di registrazione
        newProf.username = username.concat('/prof');
        newProf.password = createHash(data.password);
        newProf.email = data.email;
        newProf.nome = data.nome;
        newProf.cognome = data.cognome;
        newProf.dataDiNascita = data.dataDiNascita;
        newProf.telefono = data.telefono;
        newProf.email = username.concat('@unims.it');
        newProf.codFacoltà = data.codFacoltà;
        Docenti.count({}, function (err, count) {
            if (err) throw err;
            var n_prof = count + 1;
            newProf.matricola = new String('P00' + n_prof);

            // salvo l'utente
            newProf.save(function (err) {
                if (err) {
                    console.log('Errore nel salvataggio: ' + err);
                    throw err;
                }
                console.log('Registrazione avvenuta con successo.');
            });
        });
    });
    
    /**Metodo per criptare la password nel db */
    var bCrypt = require('bcrypt-nodejs');
    var createHash = function (password) {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }
}

module.exports = DocentiController;