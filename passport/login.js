var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var bCrypt = require('bcrypt-nodejs');
var Admin = require('../models/personale').model('Admin');
var Prof = require('../models/personale').model('Prof');

module.exports = function (passport) {
    // login di uno studente
    passport.use('loginStudente', new LocalStrategy({
        passReqToCallback: true
    },
        function (req, username, password, done) {
            User.findOne({ 'username': username },
                function (err, user) {
                    if (err) {
                        return done(err);
                    }
                    // Se lo username non esiste.
                    if (!user) {
                        console.log('Utente non trovato con lo username: ' + username);
                        // Rimanda alla schermata area personale stampando il seguente messaggio.
                        return done(null, false, req.flash('message', 'Utente non trovato.'));
                    }
                    // Se lo user esiste ma ha inserito la password errata. 
                    if (!isValidPassword(user, password)) {
                        console.log('Password non valida');
                        // Rimanda alla schermata area personale con il seguente messaggio.
                        return done(null, false, req.flash('message', 'Password non valida.'));
                    }
                    /**
                     * Entrambi i dati sono stati inseriti correttamente
                     */
                    return done(null, user);
                }
            );
        })
    );
    // login di un amministratore
    passport.use('loginAmministratore', new LocalStrategy({
        passReqToCallback: true
    },
        function (req, username, password, done) {
            Admin.findOne({ 'username': username },
                function (err, user) {
                    if (err) {
                        return done(err);
                    }
                    // Se lo username non esiste.
                    if (!user) {
                        console.log('Utente non trovato con lo username: ' + username);
                        // Rimanda alla schermata area personale stampando il seguente messaggio.
                        return done(null, false, req.flash('message', 'Utente non trovato.'));
                    }
                    // Se lo user esiste ma ha inserito la password errata. 
                    if (!isValidPassword(user, password)) {
                        console.log('Password non valida');
                        // Rimanda alla schermata area personale con il seguente messaggio.
                        return done(null, false, req.flash('message', 'Password non valida.'));
                    }
                    return done(null, user);
                }
            );
        })
    );
    // login di un docente
    passport.use('loginDocente', new LocalStrategy({
        passReqToCallback: true
    },
        function (req, username, password, done) {
            Prof.findOne({ 'username': username },
                function (err, user) {
                    if (err) {
                        return done(err);
                    }
                    // Se lo username non esiste.
                    if (!user) {
                        console.log('Utente non trovato con lo username: ' + username);
                        // Rimanda alla schermata area personale stampando il seguente messaggio.
                        return done(null, false, req.flash('message', 'Utente non trovato.'));
                    }
                    // Se lo user esiste ma ha inserito la password errata. 
                    if (!isValidPassword(user, password)) {
                        console.log('Password non valida');
                        // Rimanda alla schermata area personale con il seguente messaggio.
                        return done(null, false, req.flash('message', 'Password non valida.'));
                    }
                    return done(null, user);
                }
            );
        })
    );

    /**
     * isValidPassword uses bCrypt to check if the password matches.
     */
    var isValidPassword = function (user, password) {
        return bCrypt.compareSync(password, user.password);
    }

}

