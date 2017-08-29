//script per popolare il database

var corsiLaurea = require('./models/corsiLaurea');
var admin = require('./models/personale').model('Admin');
var prof = require('./models/personale').model('Prof');
var corsi = require('./models/corsi');
var studenti = require ('./models/user');
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
    nome: 'Mario',
    cognome: 'Rossi',
    matricola: 'P001',
    codFacoltà: informatica.codice,
    email: 'mario.rossi@unims.it',
    username: 'mario.rossi/prof',
    password: createHash('mario')
});
prof1.save(function (err) {
    if (err) throw err;
});

var prof2 = new prof({
    nome: 'Luca',
    cognome: 'Verdi',
    matricola: 'P002',
    codFacoltà: matematica.codice,
    email: 'luca.verdi@unims.it',
    username: 'luca.verdi/prof',
    password: createHash('luca')
});
prof2.save(function (err) {
    if (err) throw err;
});

var prof3 = new prof({
    nome: 'Lucia',
    cognome: 'Bianchi',
    matricola: 'P003',
    codFacoltà: chimica.codice,
    email: 'lucia.bianchi@unims.it',
    username: 'lucia.bianchi/prof',
    password: createHash('lucia')
});
prof3.save(function (err) {
    if (err) throw err;
});

var prof4 = new prof({
    nome: 'Maria',
    cognome: 'Neri',
    matricola: 'P004',
    codFacoltà: informatica.codice,
    email: 'maria.neri@unims.it',
    username: 'maria.neri/prof',
    password: createHash('maria')
});
prof4.save(function (err) {
    if (err) throw err;
});

var prof5 = new prof({
    nome: 'Carlo',
    cognome: 'Gialli',
    matricola: 'P004',
    codFacoltà: matematica.codice,
    email: 'carlo.gialli@unims.it',
    username: 'carlo.gialli/prof',
    password: createHash('carlo')
});
prof5.save(function (err) {
    if (err) throw err;
});

var prof6 = new prof({
    nome: 'Daniela',
    cognome: 'Russo',
    matricola: 'P004',
    codFacoltà: chimica.codice,
    email: 'daniela.russo@unims.it',
    username: 'daniela.russo/prof',
    password: createHash('daniela')
});
prof6.save(function (err) {
    if (err) throw err;
});



//AGGIUNTI CORSI
//informatica
var programmazione = new corsi({
    nome: 'Programmazione',
    codice: 'I-10',
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
    codice: 'I-47',
    codFacoltà: prof4.codFacoltà,
    matricolaP: prof4.matricola,
    cfu: 6,
    anno: 1
});
analisi.save(function (err) {
    if (err) throw err;
});

var fondamenti = new corsi({
    nome: 'Fondamenti di Informatica',
    codice: 'I-40',
    codFacoltà: prof1.codFacoltà,
    matricolaP: prof1.matricola,
    cfu: 12,
    anno: 1
});
fondamenti.save(function (err) {
    if (err) throw err;
});

var algebra = new corsi({
    nome: 'Algebra Lineare',
    codice: 'I-06',
    codFacoltà: prof4.codFacoltà,
    matricolaP: prof4.matricola,
    cfu: 6,
    anno: 1
});
algebra.save(function (err) {
    if (err) throw err;
});

var basi = new corsi({
    nome: 'Basi di Dati',
    codice: 'I-04',
    codFacoltà: prof1.codFacoltà,
    matricolaP: prof1.matricola,
    cfu: 9,
    anno: 2
});
basi.save(function (err) {
    if (err) throw err;
});

var asd = new corsi({
    nome: 'Algoritmi e Strutture Dati',
    codice: 'I-22',
    codFacoltà: prof4.codFacoltà,
    matricolaP: prof4.matricola,
    cfu: 12,
    anno: 2
});
asd.save(function (err) {
    if (err) throw err;
});

var ing = new corsi({
    nome: 'Ingegneria del Software',
    codice: 'I-09',
    codFacoltà: prof1.codFacoltà,
    matricolaP: prof1.matricola,
    cfu: 12,
    anno: 3
});
ing.save(function (err) {
    if (err) throw err;
});

var project = new corsi({
    nome: 'Project',
    codice: 'I-33',
    codFacoltà: prof4.codFacoltà,
    matricolaP: prof4.matricola,
    cfu: 12,
    anno: 3
});
project.save(function (err) {
    if (err) throw err;
});

//chimica

var chimicaInorganica = new corsi({
    nome: 'Chimica Inorganica',
    codice: 'C-37',
    codFacoltà: prof3.codFacoltà,
    matricolaP: prof3.matricola,
    cfu: 12,
    anno: 1
});
chimicaInorganica.save(function (err) {
    if (err) throw err;
});

var fisica = new corsi({
    nome: 'Fisica I',
    codice: 'C-14',
    codFacoltà: prof6.codFacoltà,
    matricolaP: prof6.matricola,
    cfu: 6,
    anno: 1
});
fisica.save(function (err) {
    if (err) throw err;
});

var chimicaOrganica = new corsi({
    nome: 'Chimica Organica',
    codice: 'C-47',
    codFacoltà: prof3.codFacoltà,
    matricolaP: prof3.matricola,
    cfu: 10,
    anno: 2
});
chimicaOrganica.save(function (err) {
    if (err) throw err;
});

var bio = new corsi({
    nome: 'Biochimica ',
    codice: 'C-25',
    codFacoltà: prof6.codFacoltà,
    matricolaP: prof6.matricola,
    cfu: 12,
    anno: 2
});
bio.save(function (err) {
    if (err) throw err;
});

var alimenti = new corsi({
    nome: 'Chimica degli Alimenti ',
    codice: 'C-28',
    codFacoltà: prof3.codFacoltà,
    matricolaP: prof3.matricola,
    cfu: 9,
    anno: 3
});
alimenti.save(function (err) {
    if (err) throw err;
});

var chimica = new corsi({
    nome: 'Chimica Organica II ',
    codice: 'C-34',
    codFacoltà: prof6.codFacoltà,
    matricolaP: prof6.matricola,
    cfu: 12,
    anno: 3
});
chimica.save(function (err) {
    if (err) throw err;
});

//matematica
var geometria = new corsi({
    nome: 'Geometria I',
    codice: 'M-11',
    codFacoltà: prof2.codFacoltà,
    matricolaP: prof2.matricola,
    cfu: 12,
    anno: 1
});
geometria.save(function (err) {
    if (err) throw err;
});

var analisimath = new corsi({
    nome: 'Analisi Matematica',
    codice: 'M-59',
    codFacoltà: prof5.codFacoltà,
    matricolaP: prof5.matricola,
    cfu: 12,
    anno: 1
});
analisimath.save(function (err) {
    if (err) throw err;
});

var geo = new corsi({
    nome: 'Geometria II',
    codice: 'M-12',
    codFacoltà: prof2.codFacoltà,
    matricolaP: prof2.matricola,
    cfu: 12,
    anno: 2
});
geo.save(function (err) {
    if (err) throw err;
});

var analisimath2 = new corsi({
    nome: 'Analisi Matematica II',
    codice: 'M-88',
    codFacoltà: prof5.codFacoltà,
    matricolaP: prof5.matricola,
    cfu: 12,
    anno: 2
});
analisimath2.save(function (err) {
    if (err) throw err;
});

var fisicatermo = new corsi({
    nome: 'Laboatorio di Fisica Termodinamica',
    codice: 'M-44',
    codFacoltà: prof2.codFacoltà,
    matricolaP: prof2.matricola,
    cfu: 9,
    anno: 3
});
fisicatermo.save(function (err) {
    if (err) throw err;
});

var analisilab = new corsi({
    nome: 'Laboatorio di Analisi Matematica III',
    codice: 'M-37',
    codFacoltà: prof2.codFacoltà,
    matricolaP: prof2.matricola,
    cfu: 12,
    anno: 3
});
analisilab.save(function (err) {
    if (err) throw err;
});

//AGGIUNTA STUDENTI ANNI > 1
var stud1 = new studenti({
    nome: 'Serena',
    cognome: 'Ferrari',
    stato: 'Italia',
    città: 'Frosinone',
    cap: 03033,
    dataDiNascita: 12/12/1992,
    matricola: 'S001',
    codFacoltà: informatica.codice,
    email: 'serena.ferrari@hotmail.it',
    emailUniversitaria: 'serena.ferrari@studenti.unims.it',
    username: 'serena.ferrari',
    password: createHash('serena'),
    //carriera: [AppelliVerbalizzati], //'array of subdocument' contenente la carriera degli studenti
    annoCorso: 2
});
stud1.save(function(err){
    if(err) throw err;
});

var stud2 = new studenti({
    nome: 'Fabio',
    cognome: 'Costa',
    stato: 'Italia',
    città: 'Ancona',
    cap: 60121,
    dataDiNascita: 10/04/1994,
    matricola: 'S002',
    codFacoltà: chimica.codice,
    email: 'fabio.costa@hotmail.it',
    emailUniversitaria: 'fabio.costa@studenti.unims.it',
    username: 'fabio.costa',
    password: createHash('fabio'),
    //carriera: [AppelliVerbalizzati], //'array of subdocument' contenente la carriera degli studenti
    annoCorso: 2
});
stud2.save(function(err){
    if(err) throw err;
});

var stud3 = new studenti({
    nome: 'Matilde',
    cognome: 'Ricci',
    stato: 'Italia',
    città: 'Bologna',
    cap: 40121,
    dataDiNascita: 11/07/1995,
    matricola: 'S003',
    codFacoltà: matematica.codice,
    email: 'matilde.ricci@hotmail.it',
    emailUniversitaria: 'matilde.ricci@studenti.unims.it',
    username: 'matilde.costa',
    password: createHash('matilde'),
    //carriera: [AppelliVerbalizzati], //'array of subdocument' contenente la carriera degli studenti
    annoCorso: 2
});
stud3.save(function(err){
    if(err) throw err;
});

var stud4 = new studenti({
    nome: 'Marco',
    cognome: 'Greco',
    stato: 'Italia',
    città: 'Napoli',
    cap: 80121,
    dataDiNascita: 23/01/1991,
    matricola: 'S004',
    codFacoltà: matematica.codice,
    email: 'marco.greco@hotmail.it',
    emailUniversitaria: 'marco.greco@studenti.unims.it',
    username: 'marco.greco',
    password: createHash('marco'),
    //carriera: [AppelliVerbalizzati], //'array of subdocument' contenente la carriera degli studenti
    annoCorso: 3
});
stud4.save(function(err){
    if(err) throw err;
});

var stud5 = new studenti({
    nome: 'Nicole',
    cognome: 'Colombo',
    stato: 'Italia',
    città: 'Spoleto',
    cap: 16049,
    dataDiNascita: 12/03/1993,
    matricola: 'S005',
    codFacoltà: chimica.codice,
    email: 'nicole.colombo@hotmail.it',
    emailUniversitaria: 'nicole.colombo@studenti.unims.it',
    username: 'nicole.colombo',
    password: createHash('nicole'),
    //carriera: [AppelliVerbalizzati], //'array of subdocument' contenente la carriera degli studenti
    annoCorso: 3
});
stud5.save(function(err){
    if(err) throw err;
});

var stud6 = new studenti({
    nome: 'Silvio',
    cognome: 'Leone',
    stato: 'Italia',
    città: 'Camerino',
    cap: 62032,
    dataDiNascita: 07/09/1991,
    matricola: 'S006',
    codFacoltà: informatica.codice,
    email: 'silvio.leone@hotmail.it',
    emailUniversitaria: 'silvio.leone@studenti.unims.it',
    username: 'silvio.leone',
    password: createHash('silvio'),
    //carriera: [AppelliVerbalizzati], //'array of subdocument' contenente la carriera degli studenti
    annoCorso: 3
});
stud6.save(function(err){
    if(err) throw err;
});



//Mi disconnetto dal database
mongoose.connection.close();
