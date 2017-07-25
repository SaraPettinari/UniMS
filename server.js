var express = require('express');
var app = express();
var mongoose = require('mongoose');
routes = require("./server/routes/api/api.js");
<<<<<<< HEAD
=======

var config = require('./config');        // get our config file
>>>>>>> 8e97acddad3fc6bf2ef9e3d8bd038b2dc4227bb6

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

// make express look in the views/server/public directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/server'));

// set the home page route
app.get('/', function (req, res) {

	// ejs render automatically looks in the views folder
	res.render('home');
});

app.listen(port, function () {
	console.log('Our app is running on http://localhost:' + port);
});
