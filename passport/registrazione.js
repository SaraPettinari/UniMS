var LocalStrategy = require('passport-local').Strategy;
var Student = require('../models/user');
var bCrypt = require('bcrypt-nodejs');
var Admin = require('../models/personale').model('Admin');
var Prof = require('../models/personale').model('Prof');

module.exports = function (passport) {
    //registrazione studente
    passport.use('registrazione', new LocalStrategy({
        passReqToCallback: true
    },
        function (req, username, password, done) {
            findOrCreateUser = function () {
                // controllo che non esista già un utente con la stessa mail
                Student.findOne({ 'email': req.body.email }, function (err, user) {
                    if (err) {
                        console.log('Errore nella registrazione: ' + err);
                        return done(err);
                    }
                    if (user) {
                        console.log('Esiste già un utente registrato con la mail: ' + req.body.email);
                        return done(null, false, req.flash('message', 'Esiste già un utente registrato con la mail: ' + req.body.email));
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
                        if (password.length < 4)
                            return done(null, false, req.flash('message', 'La password deve contenere almeno 4 caratteri'));
                        newStudent.password = createHash(password);
                        newStudent.email = req.body.email;
                        newStudent.nome = req.body.nome;
                        newStudent.cognome = req.body.cognome;
                        newStudent.dataDiNascita = req.body.dataDiNascita;
                        newStudent.telefono = req.body.telefono;
                        newStudent.città = req.body.città;
                        newStudent.indirizzo = req.body.indirizzo;
                        newStudent.cap = req.body.cap;
                        newStudent.emailUniversitaria = username.concat('@studenti.unims.it');
                        newStudent.codFacoltà = req.body.facoltà;
                        Student.count({}, function (err, count) {
                            if (err) throw err;
                            var n_studenti = count + 1;
                            newStudent.matricola = new String('S00' + n_studenti);

                            // salvo l'utente
                            newStudent.save(function (err) {
                                if (err) {
                                    console.log('Errore nel salvataggio: ' + err);
                                    throw err;
                                }
                                console.log('Registrazione avvenuta con successo.');
                                return done(null, newStudent, req.flash('message', 'Registrazione avvenuta con successo! ' + ' username: ' + username + ' -  email istituzionale: ' + newStudent.emailUniversitaria + '  (per effettuare il login tornare alla home)'));
                            });
                        });
                    });
                });
            };

            /**
             * Generates hash using bCrypt.
             */
            var createHash = function (password) {
                return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
            }
            /**
             * Delay the execution of findOrCreateUser and execute the method
             *      in the next tick of the event loop.
             */
            process.nextTick(findOrCreateUser);
        })
    ),
        //ricerca tra gli utenti già presenti nel database
        passport.use(new LocalStrategy({
            passReqToCallback: true
        },
            function (req, username, password, done) {
                Admin.find({}, function (err, admins) {
                    if (err) throw err;
                    admins.forEach(function (addAdmin) {
                        return done(null, addAdmin);
                    })
                })
                Prof.find({}, function (err, prof) {
                    if (err) throw err;
                    prof.forEach(function (addProf) {
                        return done(null, addProf);
                    })
                })
                Student.find({}, function (err, student) {
                    if (err) throw err;
                    student.forEach(function (addStudente) {
                        return done(null, addStudente);
                    })
                })
            })
        )
}

