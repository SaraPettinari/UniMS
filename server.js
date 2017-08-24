var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var admin = require('./routes/admin');
var prof = require('./routes/prof');
var urlDb = require('./config');
var mongoose = require('mongoose');

mongoose.connect(urlDb.databaseLocale);
var con = mongoose.connection;
con.on('error', console.error.bind(console, 'connection error: '));
con.once('open', function () {
    console.log('Connessione riuscita!');
});

var app = express();

// Import of passport for user authentication and express-session for user sessions.
var passport = require('passport');
var expressSession = require('express-session');
app.use(expressSession({secret: 'secretKey',
                        resave: true,
                        saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

/**
 * We use connect-flash middleware for sending messages
 *    for error debugging between requests.
 */
var flash = require('connect-flash');
app.use(flash());

// Initialize passport through init.js inside passport folder.
var initPassport = require('./passport/init');

// make express look in the views/public directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//ROUTES
app.use('/', routes);
app.use('/paginaAmministratore', admin);
app.use('/paginaDocente', prof);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

var port = process.env.PORT || 8080;
app.set('port', process.env.PORT || 8080);
app.listen(port, function () {
    console.log('Our app is running on http://localhost:' + port);
});


module.exports = app;
