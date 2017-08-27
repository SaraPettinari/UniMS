//script per popolare il database

var corsiLaurea = require('./models/corsiLaurea');
var admin = require('./models/personale').model('Admin');
var prof = require('./models/personale').model('Prof');
var corsi = require('./models/corsi');

var urlDb = require('./config');

var mongoose = require('mongoose');
mongoose.connect(urlDb.databaseLocale);
var db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'errore nella connessione al db'));

//AGGIUNTE FACOLTA'
var informatica = new corsiLaurea({
    nome: 'Informatica',
    codice: 'L31',
});
informatica.save(function (err) {
    if (err) throw err;
});

var matematica = new corsiLaurea({
    nome: 'Matematica',
    codice: 'L35'
});
matematica.save(function (err) {
    if (err) throw err;
});

var chimica = new corsiLaurea({
    nome: 'Chimica',
    codice: 'L27'
});
chimica.save(function (err) {
    if (err) throw err;
});

/**Metodo per criptare la password nel db */
var bCrypt = require('bcrypt-nodejs');
var createHash = function (password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

//AGGIUNTI AMMINISTRATORI
var admin1 = new admin({
    nome: 'Sara',
    cognome: 'Pettinari',
    matricola: 'A001',
    codFacoltà: informatica.codice,
    email: 'sara.pettinari@admin.it',
    username: 'sara.pettinari/admin',
    password: createHash('sara')
});
admin1.save(function (err) {
    if (err) throw err;
});

var admin2 = new admin({
    nome: 'Mara',
    cognome: 'Albanesi',
    matricola: 'A002',
    codFacoltà: chimica.codice,
    email: 'mara.albanesi@admin.it',
    username: 'mara.albanesi/admin',
    password: createHash('mara')
});
admin2.save(function (err) {
    if (err) throw err;
});

var admin3 = new admin({
    nome: 'Margherita',
    cognome: 'Renieri',
    matricola: 'A003',
    codFacoltà: matematica.codice,
    email: 'margherita.renieri@admin.it',
    username: 'margherita.renieri/admin',
    password: createHash('margherita')
});
admin3.save(function (err) {
    if (err) throw err;
});


//AGGIUNTI PROF
var prof1 = new prof({
    nome: 'Nome',
    cognome: 'Cognome',
    matricola: 'P001',
    codFacoltà: informatica.codice,
    email: 'nome.cognome@unims.it',
    username: 'nome.cognome/prof',
    password: createHash('prof1')
});
prof1.save(function (err) {
    if (err) throw err;
});

var prof2 = new prof({
    nome: 'Nome2',
    cognome: 'Cognome2',
    matricola: 'P002',
    codFacoltà: matematica.codice,
    email: 'nome2.cognome@unims.it',
    username: 'nome2.cognome2/prof',
    password: createHash('prof2')
});
prof2.save(function (err) {
    if (err) throw err;
});

var prof3 = new prof({
    nome: 'Nome3',
    cognome: 'Cognome3',
    matricola: 'P003',
    codFacoltà: chimica.codice,
    email: 'nome3.cognome@unims.it',
    username: 'nome3.cognome3/prof',
    password: createHash('prof3')
});
prof3.save(function (err) {
    if (err) throw err;
});

var prof4 = new prof({
    nome: 'Nome4',
    cognome: 'Cognome4',
    matricola: 'P004',
    codFacoltà: informatica.codice,
    email: 'nome4.cognome@unims.it',
    username: 'nome4.cognome4/prof',
    password: createHash('prof4')
});
prof4.save(function (err) {
    if (err) throw err;
});

//AGGIUNTI CORSI
var programmazione = new corsi({
    nome: 'Programmazione',
    codice: 'P-10',
    codFacoltà: prof1.codFacoltà,
    matricolaP: prof1.matricola,
    cfu: 12,
    anno: 1
});
programmazione.save(function (err) {
    if (err) throw err;
});

var analisi = new corsi({
    nome: 'Analisi I',
    codice: 'A-47',
    codFacoltà: prof1.codFacoltà,
    matricolaP: prof1.matricola,
    cfu: 6,
    anno: 1
});
analisi.save(function (err) {
    if (err) throw err;
});

var chimicaOrganica = new corsi({
    nome: 'Chimica Organica',
    codice: 'C-47',
    codFacoltà: prof3.codFacoltà,
    matricolaP: prof3.matricola,
    cfu: 6,
    anno: 1
});
chimicaOrganica.save(function (err) {
    if (err) throw err;
});

var chimicaInorganica = new corsi({
    nome: 'Chimica Inorganica',
    codice: 'C-37',
    codFacoltà: prof3.codFacoltà,
    matricolaP: prof3.matricola,
    cfu: 6,
    anno: 1
});
chimicaInorganica.save(function (err) {
    if (err) throw err;
});

var geometria = new corsi({
    nome: 'Geometria I',
    codice: 'G-11',
    codFacoltà: prof2.codFacoltà,
    matricolaP: prof2.matricola,
    cfu: 12,
    anno: 1
});
geometria.save(function (err) {
    if (err) throw err;
});

//Mi disconnetto dal database
mongoose.connection.close();
