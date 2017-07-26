var express = require('express');
var app = express();
var mongoose = require('mongoose');

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

app.get('/passwordDimenticata', function (req, res) {
    // ejs render automatically looks in the views folder
    res.render('passwordDimenticata');
});

app.listen(port, function () {
	console.log('Our app is running on http://localhost:' + port);
});

var User = require('./server/models/user.js');

var studenti = new User({
	nome:  $('#addUser fieldset input#inputUserName').val(),
    cognome: $('#addUser fieldset input#inputUserName').val(),
    matricola: $('#addUser fieldset input#inputUserName').val(),
    email:  $('#addUser fieldset input#inputUserName').val(), 
    emailUniversitaria:  $('#addUser fieldset input#inputUserName').val(),
    telefono:   $('#addUser fieldset input#inputUserName').val(),
    username:  $('#addUser fieldset input#inputUserName').val(),
    password:  $('#addUser fieldset input#inputUserName').val(),
    admin:  $('#addUser fieldset input#inputUserName').val(),
});




// Add User
function aggiungiStudente(event) {
    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#addUser input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {

        // If it is, compile all user info into one object
        var newUser = {
            'username': $('#addUser fieldset input#inputUserName').val(),
            'email': $('#addUser fieldset input#inputUserEmail').val(),
            'fullname': $('#addUser fieldset input#inputUserFullname').val(),
            'age': $('#addUser fieldset input#inputUserAge').val(),
            'location': $('#addUser fieldset input#inputUserLocation').val(),
            'gender': $('#addUser fieldset input#inputUserGender').val()
        }

        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: newUser,
            url: '/users/adduser',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {

                // Clear the form inputs
                $('#addUser fieldset input').val('');

                // Update the table
                populateTable();

            }
            else {

                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);

            }
        });
    }
    else {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }
};

