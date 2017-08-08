var LocalStrategy = require('passport-local').Strategy;
var Student = require('../models/user');
var bCrypt = require('bcrypt-nodejs');

module.exports = function (passport) {
    passport.use('registrazione', new LocalStrategy({
        passReqToCallback: true
    },
        function (req, username, password, done) {
            findOrCreateUser = function () {
                // controllo che non esista già un utente con la stessa mail
                Student.findOne({ 'email': req.param('email') }, function (err, user) {
                    if (err) {
                        console.log('Errore nella registrazione: ' + err);
                        return done(err);
                    }
                    if (user) {
                        console.log('Esiste già un utente registrato con la mail: ' + req.param('email'));
                        return done(null, false, req.flash('message', 'Esiste già un utente registrato con la mail: ' + req.param('email')));
                    }
                    // in caso di omonimia allo username verrà aggiunto progressivamente un numero
                    var reg = new RegExp('^' + username); //cerco gli elementi che hanno lo stesso prefisso
                    Student.find({ 'username': reg }).count(function (err, count) {
                        if (count > 0)
                            username = username.concat(count);

                        //creo un nuovo studente
                        var newStudent = new Student();

                        // le credenziali verranno settate in base a ciò che verrà inserito nel form di registrazione
                        newStudent.username = username;
                        newStudent.password = createHash(password);
                        newStudent.email = req.param('email');
                        newStudent.nome = req.param('nome');
                        newStudent.cognome = req.param('cognome');
                        newStudent.dataDiNascita = req.param('dataDiNascita');
                        newStudent.telefono = req.param('telefono');
                        newStudent.città = req.param('città');
                        newStudent.indirizzo = req.param('indirizzo');
                        newStudent.cap = req.param('cap');
                        newStudent.emailUniversitaria = username.concat('@studenti.unims.it');
                        newStudent.matricola = new String('S' + newStudent._id);

                        // salvo l'utente
                        newStudent.save(function (err) {
                            if (err) {
                                console.log('Errore nel salvataggio: ' + err);
                                throw err;
                            }
                            console.log('Registrazione avvenuta con successo.');
                            return done(null, newStudent);
                        });
                    });
                });
            };

            /**
             * Delay the execution of findOrCreateUser and execute the method
             *      in the next tick of the event loop.
             */
            process.nextTick(findOrCreateUser);
        })
    );

    /**
     * Generates hash using bCrypt.
     */
    var createHash = function (password) {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }
}