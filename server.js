var express = require('express');
var app = express();
var path = require ('path');
var baucis = require ('baucis');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var config = require('./config');        // get our config file
var User = require('./server/models/user'); //(mongoose, baucis);
var routes = require('./server/routes/index');

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;
app.set('port', process.env.PORT || 8080)
/*app.use('/api', baucis());
/* app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());*/
//app.use(app.router);

// connect to database
mongoose.createConnection("mongodb://localhost:27017/dbUnims");
var con = mongoose.connection;
con.on('error', console.error.bind(console, 'connection error: '));
con.once('open', function () {
    console.log('Connessione riuscita!');
});

// set the view engine to ejs
app.set('view engine', 'ejs');

// make express look in the views/public directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));

app.listen(port, function () {
    console.log('Our app is running on http://localhost:' + port);
});

app.use('/', routes);

// Import of passport for user authentication and express-session for user sessions.
var passport = require('passport');
var expressSession = require('express-session');
app.use(expressSession({secret: 'secretKey',
                        resave: true,
                        saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());


// Initialize passport through init.js inside passport folder.
var initPassport = require('./server/passport/init');

/**
 * We use connect-flash middleware for sending messages
 *    for error debugging between requests.
 */
