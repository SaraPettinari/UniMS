var passport = require('passport');
var login = require('./login');
var registrazione = require('./registrazione');
var User = require('../models/user');
var Admin = require('../models/personale').model('Admin');
var Prof = require('../models/personale').model('Prof');

/**
 * Passport serializes and deserializes users to support persistent log-in sessions.
 */
passport.serializeUser(function (user, done) {
    // console.log('Serializing user: ');
    // console.log(user);
    done(null, user._id);
});

passport.deserializeUser(function (id, done) {
    //3 done nella stessa funzione lanciano un errore (non bloccano il programma)
    User.findById(id, function (err, user) {
        //     console.log('Deserializing user: ', user);
        done(err, user);
    });
    Admin.findById(id, function (err, user) {
        //     console.log('Deserializing user: ', user);
        done(err, user);
    });
    Prof.findById(id, function (err, user) {
        //      console.log('Deserializing user: ', user);
        done(err, user);
    });
});

/**
 * These two functions trigger /passport/login.js and /passport/signup.js.
 */
login(passport);
registrazione(passport);

module.exports = passport;