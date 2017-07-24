var express = require('express');
var app = express();
//var mongoose = require('mongoose');
var mongo = require('mongodb');


// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

// set the view engine to ejs
app.set('view engine', 'ejs');

// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'));

// set the home page route
app.get('/', function (req, res) {

	// ejs render automatically looks in the views folder
	res.render('home');
});

app.listen(port, function () {
	console.log('Our app is running on http://localhost:' + port);
});

//DATABASE

//mongoose.connect()

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://unims.herokuapp.com/dbUnims";

MongoClient.connect(url, function (err, db) {
	if (err) throw err;
	console.log("Database created!");

	db.createCollection("studenti", function (err, res) {
		if (err) throw err;
		console.log("Table created");
		db.close();
	});
});