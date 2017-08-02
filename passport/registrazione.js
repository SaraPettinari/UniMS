var LocalStrategy = require('passport-local').Strategy;
var Student = require('../models/user');
var bCrypt = require('bcrypt-nodejs');

module.exports = function (passport) {
    passport.use('registrazione', new LocalStrategy({
        // Allows us to pass back the entire request to the callback.
        passReqToCallback: true
    },
        function (req, username, password, done) {
            findOrCreateUser = function () {
                // controllo che non esista già un utente con la stessa mail
                Student.findOne({ 'email': req.param('email') }, function (err, user) {
                    if (err) {
                        console.log('Error in sign up: ' + err);
                        return done(err);
                    }
                    if (user) {
                        console.log('User already exists with email: ' + req.param('email'));
                        return done(null, false, req.flash('message', 'User already exists with this email.'));
                    }
                    // in caso di omonimia allo username verrà aggiunto progressivamente un numero
                    Student.findOne({ 'username': username }, function (err, user) {
                        // In case of any error, return using the done method.
                        if (err) {
                            console.log('Error in sign up: ' + err);
                            return done(err);
                        }
                        else {
                            var num = 0;
                            // If the user already exists, log the error.
                            //funziona solo per i primi due utenti con stesso username
                            if (user) {
                                num++;
                                username = username.concat(num);
                            }
                            // If there is no existing user with the chosen username, create the new user.
                            var newStudent = new Student();

                            // Set the new user's local credentials.
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
        
                            // Save the new user.
                            newStudent.save(function (err) {
                                if (err) {
                                    console.log('Error in saving user: ' + err);
                                    throw err;
                                }
                                console.log('User registration was successful.');
                                return done(null, newStudent);
                            });
                        }
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