var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var config = require('./config');        // get our config file

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

// connect to database
mongoose.connect("mongodb://localhost:27017/dbUnims");
var con = mongoose.connection;
con.on('error', function (err) {
    console.log('Errore connessione');
});
con.once('open', function () {
    console.log('Connessione riuscita!');
});

// set the view engine to ejs
app.set('view engine', 'ejs');

// make express look in the views/public directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));


//IMPOSTO LE ROUTE
app.get('/', function (req, res) {
    // ejs render automatically looks in the views folder
    res.render('home');
});

app.get('/registrazione', function (req, res) {
    // ejs render automatically looks in the views folder
    res.render('registrazione');
});

//app.get('/passwordDimenticata', function (req, res) {
    // ejs render automatically looks in the views folder
    //res.render('passwordDimenticata');
//});

app.listen(port, function () {
    console.log('Our app is running on http://localhost:' + port);
});

var User = require('./server/models/user.js');

app.use(bodyParser.urlencoded({ extended: false }));
var path = require('path');
var mongodb = require('mongodb');
var dbConn = mongodb.MongoClient.connect('mongodb://localhost:27017/dbUnims');
app.use(express.static(path.resolve(__dirname, 'views')));
app.post('/registrazione/user', function(req,res){
    dbConn.then(function(db){
        delete req.body._id;
        db.collection('Users').insertOne(req.body);
    });
    res.send('Dati' + JSON.stringify(req.body));
});