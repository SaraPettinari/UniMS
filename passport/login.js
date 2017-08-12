var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var bCrypt = require('bcrypt-nodejs');
var Admin = require('../models/personale').model('Admin');
var Prof = require('../models/personale').model('Prof');

module.exports = function (passport) {
    passport.use('loginStudente', new LocalStrategy({
        passReqToCallback: true
    },
        function (req, username, password, done) {
            User.findOne({ 'username': username },
                function (err, user) {
                    // In case of any error, return using the done method.
                    if (err) {
                        return done(err);
                    }
                    // Se lo username non esiste.
                    if (!user) {
                        console.log('Utente non trovato con lo username: ' + username);
                        // Rimanda alla schermata area personale stampando il seguente messaggio.
                        return done(null, false, req.flash('message', 'Utente non trovato.'));
                    }
                    // If user exists but has the wrong password, log the error. 
                    if (!isValidPassword(user, password)) {
                        console.log('Password non valida');
                        // Rimanda alla schermata area personale con il seguente messaggio.
                        return done(null, false, req.flash('message', 'Password non valida.'));
                    }
                    /**
                     * User and password both match, return user from done method,
                     *      which will be treated like success.
                     */
                    return done(null, user);
                }
            );
        })
    );
    passport.use('loginAmministratore', new LocalStrategy({
        passReqToCallback: true
    },
        function (req, username, password, done) {
            Admin.findOne({ 'username': username },
                function (err, user) {
                    // In case of any error, return using the done method.
                    if (err) {
                        return done(err);
                    }
                    // Se lo username non esiste.
                    if (!user) {
                        console.log('Utente non trovato con lo username: ' + username);
                        // Rimanda alla schermata area personale stampando il seguente messaggio.
                        return done(null, false, req.flash('message', 'Utente non trovato.'));
                    }
                    // If user exists but has the wrong password, log the error. 
                    if (!isValidPassword(user, password)) {
                        console.log('Password non valida');
                        // Rimanda alla schermata area personale con il seguente messaggio.
                        return done(null, false, req.flash('message', 'Password non valida.'));
                    }
                    /**
                     * User and password both match, return user from done method,
                     *      which will be treated like success.
                     */
                    return done(null, user);
                }
            );
        })
    );
    passport.use('loginDocente', new LocalStrategy({
        passReqToCallback: true
    },
        function (req, username, password, done) {
            Prof.findOne({ 'username': username },
                function (err, user) {
                    // In case of any error, return using the done method.
                    if (err) {
                        return done(err);
                    }
                    // Se lo username non esiste.
                    if (!user) {
                        console.log('Utente non trovato con lo username: ' + username);
                        // Rimanda alla schermata area personale stampando il seguente messaggio.
                        return done(null, false, req.flash('message', 'Utente non trovato.'));
                    }
                    // If user exists but has the wrong password, log the error. 
                    if (!isValidPassword(user, password)) {
                        console.log('Password non valida');
                        // Rimanda alla schermata area personale con il seguente messaggio.
                        return done(null, false, req.flash('message', 'Password non valida.'));
                    }
                    /**
                     * User and password both match, return user from done method,
                     *      which will be treated like success.
                     */
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

