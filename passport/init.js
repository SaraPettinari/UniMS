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
    done(null, user._id);
});

passport.deserializeUser(function (id, done) {
    //cerca a quale collection appartiene
    User.findById(id).count(function (err, count) {
        if (count > 0)
            User.findById(id, function (err, user) {
                done(err, user);
            });
    });
    Admin.findById(id).count(function (err, count) {
        if (count > 0)
            Admin.findById(id, function (err, user) {
                done(err, user);
            });
    });
    Prof.findById(id).count(function (err, count) {
        if (count > 0)
            Prof.findById(id, function (err, user) {
                done(err, user);
            });
    });
});

/**
 * These two functions trigger /passport/login.js and /passport/signup.js.
 */
login(passport);
registrazione(passport);

module.exports = passport;