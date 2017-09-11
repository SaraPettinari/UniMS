var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var admin = require('./routes/admin');
var prof = require('./routes/prof');
var student = require('./routes/student');
var urlDb = require('./config');
var mongoose = require('mongoose');

//cambiare manualmente
mongoose.connect(urlDb.databaseRemoto);
var con = mongoose.connection;
con.on('error', console.error.bind(console, 'connection error: '));
con.once('open', function () {
    console.log('Connessione riuscita!');
});

var app = express();

// importato passport per l'autenticazione dell'utente ed express-session per la sessione dell'utente.
var passport = require('passport');
var expressSession = require('express-session');
app.use(expressSession({secret: 'secretKey',
                        resave: true,
                        saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

/**
 * Usato connect-flash per inviare messaggi dopo una richiesta.
 */
var flash = require('connect-flash');
app.use(flash());

// inizializzato passport.
var initPassport = require('./passport/init');

// velocizzato il percorso views/public (css/js/img)
app.use(express.static(__dirname + '/public'));

// impostate le views.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//settate le routes
app.use('/', routes);
app.use('/paginaAmministratore', admin);
app.use('/paginaDocente', prof);
app.use('/paginaStudente', student);

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
