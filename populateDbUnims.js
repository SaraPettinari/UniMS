//script per popolare il database

var corsiLaurea = require('./models/corsiLaurea');
var admin = require('./models/personale').model('Admin');
var prof = require('./models/personale').model('Prof');
var corsi = require('./models/corsi');
var studenti = require('./models/user');
var urlDb = require('./config');

var mongoose = require('mongoose');
mongoose.connect(urlDb.databaseRemoto);
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
//informatica
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
    nome: 'Annalisa',
    cognome: 'Tosi',
    matricola: 'P002',
    codFacoltà: informatica.codice,
    email: 'annalisa.tosi@unims.it',
    username: 'annalisa.tosi/prof',
    password: createHash('annalisa')
});
prof2.save(function (err) {
    if (err) throw err;
});

var prof3 = new prof({
    nome: 'Michele',
    cognome: 'Gallo',
    matricola: 'P003',
    codFacoltà: informatica.codice,
    email: 'michele.gallo@unims.it',
    username: 'michele.gallo/prof',
    password: createHash('michele')
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

//matematica
var prof5 = new prof({
    nome: 'Luca',
    cognome: 'Verdi',
    matricola: 'P005',
    codFacoltà: matematica.codice,
    email: 'luca.verdi@unims.it',
    username: 'luca.verdi/prof',
    password: createHash('luca')
});
prof5.save(function (err) {
    if (err) throw err;
});

var prof6 = new prof({
    nome: 'Carlo',
    cognome: 'Rinaldi',
    matricola: 'P006',
    codFacoltà: matematica.codice,
    email: 'carlo.rinaldi@unims.it',
    username: 'carlo.rinaldi/prof',
    password: createHash('carlo')
});
prof6.save(function (err) {
    if (err) throw err;
});

var prof7 = new prof({
    nome: 'Greta',
    cognome: 'Fontana',
    matricola: 'P007',
    codFacoltà: matematica.codice,
    email: 'greta.fontana@unims.it',
    username: 'greta.fontana/prof',
    password: createHash('greta')
});
prof7.save(function (err) {
    if (err) throw err;
});

var prof8 = new prof({
    nome: 'Sofia',
    cognome: 'Esposito',
    matricola: 'P008',
    codFacoltà: matematica.codice,
    email: 'sofia.esposito@unims.it',
    username: 'sofia.esposito/prof',
    password: createHash('sofia')
});
prof8.save(function (err) {
    if (err) throw err;
});

//chimica
var prof9 = new prof({
    nome: 'Daniela',
    cognome: 'Morelli',
    matricola: 'P009',
    codFacoltà: chimica.codice,
    email: 'daniela.morelli@unims.it',
    username: 'daniela.morelli/prof',
    password: createHash('daniela')
});
prof9.save(function (err) {
    if (err) throw err;
});

var prof10 = new prof({
    nome: 'Lucia',
    cognome: 'Bianchi',
    matricola: 'P010',
    codFacoltà: chimica.codice,
    email: 'lucia.bianchi@unims.it',
    username: 'lucia.bianchi/prof',
    password: createHash('lucia')
});
prof10.save(function (err) {
    if (err) throw err;
});

var prof11 = new prof({
    nome: 'Gabriele',
    cognome: 'Rizzo',
    matricola: 'P011',
    codFacoltà: chimica.codice,
    email: 'gebriele.rizzo@unims.it',
    username: 'gebriele.rizzo/prof',
    password: createHash('gebriele')
});
prof11.save(function (err) {
    if (err) throw err;
});

var prof12 = new prof({
    nome: 'Fausto',
    cognome: 'Lombardi',
    matricola: 'P012',
    codFacoltà: chimica.codice,
    email: 'fausto.lombardi@unims.it',
    username: 'fausto.lombardi/prof',
    password: createHash('fausto')
});
prof12.save(function (err) {
    if (err) throw err;


});

//AGGIUNTI CORSI
//informatica
var programmazione = new corsi({
    nome: 'Programmazione',
    codice: 'I-01',
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
    codice: 'I-02',
    codFacoltà: prof2.codFacoltà,
    matricolaP: prof2.matricola,
    cfu: 6,
    anno: 1
});
analisi.save(function (err) {
    if (err) throw err;
});

var logica = new corsi({
    nome: 'Logica Matematica',
    codice: 'I-03',
    codFacoltà: prof3.codFacoltà,
    matricolaP: prof3.matricola,
    cfu: 6,
    anno: 1
});
logica.save(function (err) {
    if (err) throw err;
});

var inglese = new corsi({
    nome: 'Lingua Inglese (B1 or B2 level)',
    codice: 'I-04',
    codFacoltà: prof4.codFacoltà,
    matricolaP: prof4.matricola,
    cfu: 6,
    anno: 1
});
inglese.save(function (err) {
    if (err) throw err;
});

var algebra = new corsi({
    nome: 'Algebra Lineare',
    codice: 'I-05',
    codFacoltà: prof1.codFacoltà,
    matricolaP: prof1.matricola,
    cfu: 6,
    anno: 1
});
algebra.save(function (err) {
    if (err) throw err;
});

var architettura = new corsi({
    nome: 'Architettura degli Elaboratori',
    codice: 'I-06',
    codFacoltà: prof2.codFacoltà,
    matricolaP: prof2.matricola,
    cfu: 12,
    anno: 1
});
architettura.save(function (err) {
    if (err) throw err;
});

var diritto = new corsi({
    nome: 'Diritto delle Nuove Tecnologie',
    codice: 'I-07',
    codFacoltà: prof3.codFacoltà,
    matricolaP: prof3.matricola,
    cfu: 6,
    anno: 1
});
diritto.save(function (err) {
    if (err) throw err;
});

var fondamenti = new corsi({
    nome: 'Fondamenti di Informatica',
    codice: 'I-08',
    codFacoltà: prof4.codFacoltà,
    matricolaP: prof4.matricola,
    cfu: 6,
    anno: 1
});
fondamenti.save(function (err) {
    if (err) throw err;
});

var asd = new corsi({
    nome: 'Algoritmi e Strutture Dati',
    codice: 'I-09',
    codFacoltà: prof1.codFacoltà,
    matricolaP: prof1.matricola,
    cfu: 12,
    anno: 2
});
asd.save(function (err) {
    if (err) throw err;
});

var prg = new corsi({
    nome: 'Programmazione II',
    codice: 'I-10',
    codFacoltà: prof2.codFacoltà,
    matricolaP: prof2.matricola,
    cfu: 9,
    anno: 2
});
prg.save(function (err) {
    if (err) throw err;
});

var basi = new corsi({
    nome: 'Basi di Dati',
    codice: 'I-11',
    codFacoltà: prof3.codFacoltà,
    matricolaP: prof3.matricola,
    cfu: 9,
    anno: 2
});
basi.save(function (err) {
    if (err) throw err;
});

var reti = new corsi({
    nome: 'Internet Reti e Sicurezza',
    codice: 'I-12',
    codFacoltà: prof4.codFacoltà,
    matricolaP: prof4.matricola,
    cfu: 9,
    anno: 2
});
reti.save(function (err) {
    if (err) throw err;
});

var sistemi = new corsi({
    nome: 'Sistemi Operativi',
    codice: 'I-13',
    codFacoltà: prof3.codFacoltà,
    matricolaP: prof3.matricola,
    cfu: 9,
    anno: 2
});
sistemi.save(function (err) {
    if (err) throw err;
});

var prob = new corsi({
    nome: 'Probabilità',
    codice: 'I-14',
    codFacoltà: prof4.codFacoltà,
    matricolaP: prof4.matricola,
    cfu: 6,
    anno: 2
});
prob.save(function (err) {
    if (err) throw err;
});

var business = new corsi({
    nome: 'Business and Management',
    codice: 'I-15',
    codFacoltà: prof1.codFacoltà,
    matricolaP: prof1.matricola,
    cfu: 6,
    anno: 2
});
business.save(function (err) {
    if (err) throw err;
});

var web = new corsi({
    nome: 'Pogrammazione Web',
    codice: 'I-16',
    codFacoltà: prof2.codFacoltà,
    matricolaP: prof2.matricola,
    cfu: 6,
    anno: 3
});
web.save(function (err) {
    if (err) throw err;
});

var ing = new corsi({
    nome: 'Ingegneria del Software',
    codice: 'I-17',
    codFacoltà: prof3.codFacoltà,
    matricolaP: prof3.matricola,
    cfu: 12,
    anno: 3
});
ing.save(function (err) {
    if (err) throw err;
});

var project = new corsi({
    nome: 'Project',
    codice: 'I-18',
    codFacoltà: prof4.codFacoltà,
    matricolaP: prof4.matricola,
    cfu: 12,
    anno: 3
});
project.save(function (err) {
    if (err) throw err;
});

var cisco = new corsi({
    nome: 'Cisco I/II/III/IV',
    codice: 'I-19',
    codFacoltà: prof1.codFacoltà,
    matricolaP: prof1.matricola,
    cfu: 12,
    anno: 3
});
cisco.save(function (err) {
    if (err) throw err;
});

var stage = new corsi({
    nome: 'Stage',
    codice: 'I-20',
    codFacoltà: prof2.codFacoltà,
    matricolaP: prof2.matricola,
    cfu: 12,
    anno: 3
});
stage.save(function (err) {
    if (err) throw err;
});

var fine = new corsi({
    nome: 'Prova Finale',
    codice: 'I-21',
    codFacoltà: prof3.codFacoltà,
    matricolaP: prof3.matricola,
    cfu: 12,
    anno: 3
});
fine.save(function (err) {
    if (err) throw err;
});

//chimica
var analisiC = new corsi({
    nome: 'Analisi I',
    codice: 'C-30',
    codFacoltà: prof9.codFacoltà,
    matricolaP: prof9.matricola,
    cfu: 12,
    anno: 1
});
analisiC.save(function (err) {
    if (err) throw err;
});

var fisica = new corsi({
    nome: 'Fisica I-II',
    codice: 'C-31',
    codFacoltà: prof10.codFacoltà,
    matricolaP: prof10.matricola,
    cfu: 12,
    anno: 1
});
fisica.save(function (err) {
    if (err) throw err;
});

var chimicaInorganica = new corsi({
    nome: 'Chimica Inorganica',
    codice: 'C-32',
    codFacoltà: prof11.codFacoltà,
    matricolaP: prof11.matricola,
    cfu: 12,
    anno: 1
});
chimicaInorganica.save(function (err) {
    if (err) throw err;
});

var chimicaAnalitica = new corsi({
    nome: 'Chimica Analitica I',
    codice: 'C-33',
    codFacoltà: prof12.codFacoltà,
    matricolaP: prof12.matricola,
    cfu: 12,
    anno: 1
});
chimicaAnalitica.save(function (err) {
    if (err) throw err;
})

var info = new corsi({
    nome: 'Informatica e Applicazioni Numeriche',
    codice: 'C-34',
    codFacoltà: prof9.codFacoltà,
    matricolaP: prof9.matricola,
    cfu: 10,
    anno: 1
});
info.save(function (err) {
    if (err) throw err;
});

var ingl = new corsi({
    nome: 'Lingua Inglese (B1 or B2 level)',
    codice: 'C-35',
    codFacoltà: prof10.codFacoltà,
    matricolaP: prof10.matricola,
    cfu: 6,
    anno: 1
});
ingl.save(function (err) {
    if (err) throw err;
});

var chimicaOrganica = new corsi({
    nome: 'Chimica Organica I',
    codice: 'C-36',
    codFacoltà: prof11.codFacoltà,
    matricolaP: prof11.matricola,
    cfu: 10,
    anno: 2
});
chimicaOrganica.save(function (err) {
    if (err) throw err;
});

var eco = new corsi({
    nome: 'Nozioni di Economia Generale',
    codice: 'C-37',
    codFacoltà: prof12.codFacoltà,
    matricolaP: prof12.matricola,
    cfu: 4,
    anno: 2
});
eco.save(function (err) {
    if (err) throw err;
});

var chimF = new corsi({
    nome: 'Chimica Fisica I',
    codice: 'C-38',
    codFacoltà: prof9.codFacoltà,
    matricolaP: prof9.matricola,
    cfu: 10,
    anno: 2
});
chimF.save(function (err) {
    if (err) throw err;
});

var chimFi = new corsi({
    nome: 'Chimica Fisica II',
    codice: 'C-39',
    codFacoltà: prof10.codFacoltà,
    matricolaP: prof10.matricola,
    cfu: 10,
    anno: 2
});
chimFi.save(function (err) {
    if (err) throw err;
});

var chimicaIn = new corsi({
    nome: 'Chimica Inorganica',
    codice: 'C-40',
    codFacoltà: prof11.codFacoltà,
    matricolaP: prof11.matricola,
    cfu: 10,
    anno: 2
});
chimicaIn.save(function (err) {
    if (err) throw err;
});

var bio = new corsi({
    nome: 'Biochimica ',
    codice: 'C-41',
    codFacoltà: prof12.codFacoltà,
    matricolaP: prof12.matricola,
    cfu: 10,
    anno: 2
});
bio.save(function (err) {
    if (err) throw err;
});

var chimicaAnaliticaII = new corsi({
    nome: 'Chimica Analitica II',
    codice: 'C-42',
    codFacoltà: prof9.codFacoltà,
    matricolaP: prof9.matricola,
    cfu: 12,
    anno: 3
});
chimicaAnaliticaII.save(function (err) {
    if (err) throw err;
})

var chimicaOrganicaII = new corsi({
    nome: 'Chimica Organica II',
    codice: 'C-43',
    codFacoltà: prof10.codFacoltà,
    matricolaP: prof10.matricola,
    cfu: 12,
    anno: 2
});
chimicaOrganicaII.save(function (err) {
    if (err) throw err;
});

var materiali = new corsi({
    nome: 'Chimica dei Materiali',
    codice: 'C-44',
    codFacoltà: prof11.codFacoltà,
    matricolaP: prof11.matricola,
    cfu: 8,
    anno: 2
});
materiali.save(function (err) {
    if (err) throw err;
});

var alimenti = new corsi({
    nome: 'Chimica degli Alimenti ',
    codice: 'C-45',
    codFacoltà: prof12.codFacoltà,
    matricolaP: prof12.matricola,
    cfu: 6,
    anno: 3
});
alimenti.save(function (err) {
    if (err) throw err;
});

var molecolare = new corsi({
    nome: 'Chimica Molecolare ',
    codice: 'C-46',
    codFacoltà: prof9.codFacoltà,
    matricolaP: prof9.matricola,
    cfu: 12,
    anno: 3
});
molecolare.save(function (err) {
    if (err) throw err;
});

var stageC = new corsi({
    nome: 'Stage',
    codice: 'C-47',
    codFacoltà: prof10.codFacoltà,
    matricolaP: prof10.matricola,
    cfu: 10,
    anno: 3
});
stageC.save(function (err) {
    if (err) throw err;
});

var fineC = new corsi({
    nome: 'Prova Finale',
    codice: 'C-48',
    codFacoltà: prof11.codFacoltà,
    matricolaP: prof11.matricola,
    cfu: 5,
    anno: 3
});
fineC.save(function (err) {
    if (err) throw err;
});

//matematica
var analisimath = new corsi({
    nome: 'Analisi Matematica I',
    codice: 'M-50',
    codFacoltà: prof5.codFacoltà,
    matricolaP: prof5.matricola,
    cfu: 12,
    anno: 1
});
analisimath.save(function (err) {
    if (err) throw err;
});

var geometria = new corsi({
    nome: 'Geometria I',
    codice: 'M-51',
    codFacoltà: prof6.codFacoltà,
    matricolaP: prof6.matricola,
    cfu: 12,
    anno: 1
});
geometria.save(function (err) {
    if (err) throw err;
});

var alg = new corsi({
    nome: 'Algebra',
    codice: 'M-52',
    codFacoltà: prof7.codFacoltà,
    matricolaP: prof7.matricola,
    cfu: 6,
    anno: 1
});
alg.save(function (err) {
    if (err) throw err;
});

var fis = new corsi({
    nome: 'Fisica I',
    codice: 'M-53',
    codFacoltà: prof8.codFacoltà,
    matricolaP: prof8.matricola,
    cfu: 6,
    anno: 1
});
fis.save(function (err) {
    if (err) throw err;
});

var inglM = new corsi({
    nome: 'Lingua Inglese (B1 or B2 level)',
    codice: 'M-54',
    codFacoltà: prof5.codFacoltà,
    matricolaP: prof5.matricola,
    cfu: 6,
    anno: 1
});
inglM.save(function (err) {
    if (err) throw err;
});

var algLog = new corsi({
    nome: 'Algebra e Logica',
    codice: 'M-55',
    codFacoltà: prof6.codFacoltà,
    matricolaP: prof6.matricola,
    cfu: 9,
    anno: 1
});
algLog.save(function (err) {
    if (err) throw err;
});

var prgM = new corsi({
    nome: 'Programmazione',
    codice: 'M-56',
    codFacoltà: prof7.codFacoltà,
    matricolaP: prof7.matricola,
    cfu: 6,
    anno: 1
});
prgM.save(function (err) {
    if (err) throw err;
});

var geo = new corsi({
    nome: 'Geometria II',
    codice: 'M-57',
    codFacoltà: prof8.codFacoltà,
    matricolaP: prof8.matricola,
    cfu: 12,
    anno: 2
});
geo.save(function (err) {
    if (err) throw err;
});

var analisimathII = new corsi({
    nome: 'Analisi Matematica II',
    codice: 'M-58',
    codFacoltà: prof5.codFacoltà,
    matricolaP: prof5.matricola,
    cfu: 12,
    anno: 2
});
analisimathII.save(function (err) {
    if (err) throw err;
});

var fisicaMath = new corsi({
    nome: 'Fisica Matematica',
    codice: 'M-59',
    codFacoltà: prof6.codFacoltà,
    matricolaP: prof6.matricola,
    cfu: 12,
    anno: 2
});
fisicaMath.save(function (err) {
    if (err) throw err;
});

var probM = new corsi({
    nome: 'Probabilità',
    codice: 'M-60',
    codFacoltà: prof7.codFacoltà,
    matricolaP: prof7.matricola,
    cfu: 6,
    anno: 2
});
probM.save(function (err) {
    if (err) throw err;
});

var fisicaGenII = new corsi({
    nome: 'Fisica Generale II',
    codice: 'M-61',
    codFacoltà: prof8.codFacoltà,
    matricolaP: prof8.matricola,
    cfu: 6,
    anno: 2
});
fisicaGenII.save(function (err) {
    if (err) throw err;
});

var eleMath = new corsi({
    nome: 'Elementi di Matematica Computazionale',
    codice: 'M-62',
    codFacoltà: prof5.codFacoltà,
    matricolaP: prof5.matricola,
    cfu: 6,
    anno: 2
});
eleMath.save(function (err) {
    if (err) throw err;
});

var ricOp = new corsi({
    nome: 'Ricerca Operativa',
    codice: 'M-63',
    codFacoltà: prof6.codFacoltà,
    matricolaP: prof6.matricola,
    cfu: 6,
    anno: 2
});
ricOp.save(function (err) {
    if (err) throw err;
});

var analisilab = new corsi({
    nome: 'Laboratorio di Analisi Matematica III e Programmazione',
    codice: 'M-64',
    codFacoltà: prof7.codFacoltà,
    matricolaP: prof7.matricola,
    cfu: 12,
    anno: 3
});
analisilab.save(function (err) {
    if (err) throw err;
});

var mathFin = new corsi({
    nome: 'Matematica Finanziaria',
    codice: 'M-65',
    codFacoltà: prof8.codFacoltà,
    matricolaP: prof8.matricola,
    cfu: 12,
    anno: 3
});
mathFin.save(function (err) {
    if (err) throw err;
});

var ottimizzazione = new corsi({
    nome: 'Tecniche di Ottimizzazione',
    codice: 'M-66',
    codFacoltà: prof5.codFacoltà,
    matricolaP: prof5.matricola,
    cfu: 6,
    anno: 3
});
ottimizzazione.save(function (err) {
    if (err) throw err;
});

var numerica = new corsi({
    nome: 'Analisi numerica',
    codice: 'M-67',
    codFacoltà: prof6.codFacoltà,
    matricolaP: prof6.matricola,
    cfu: 6,
    anno: 3
});
numerica.save(function (err) {
    if (err) throw err;
});

var fisicatermo = new corsi({
    nome: 'Laboratorio di Fisica Termodinamica',
    codice: 'M-68',
    codFacoltà: prof7.codFacoltà,
    matricolaP: prof7.matricola,
    cfu: 12,
    anno: 3
});
fisicatermo.save(function (err) {
    if (err) throw err;
});

var stageM = new corsi({
    nome: 'Stage',
    codice: 'M-69',
    codFacoltà: prof8.codFacoltà,
    matricolaP: prof8.matricola,
    cfu: 6,
    anno: 3
});
stageM.save(function (err) {
    if (err) throw err;
});

var fineM = new corsi({
    nome: 'Prova Finale',
    codice: 'M-70',
    codFacoltà: prof5.codFacoltà,
    matricolaP: prof5.matricola,
    cfu: 6,
    anno: 3
});
fineM.save(function (err) {
    if (err) throw err;
});

//AGGIUNTA STUDENTI ANNI > 1
//informatica
var stud1 = new studenti({
    nome: 'Serena',
    cognome: 'Ferrari',
    stato: 'Italia',
    città: 'Frosinone',
    cap: 03033,
    dataDiNascita: new Date(1992, 12, 12),
    matricola: 'S001',
    codFacoltà: informatica.codice,
    email: 'serena.ferrari@hotmail.it',
    emailUniversitaria: 'serena.ferrari@studenti.unims.it',
    username: 'serena.ferrari',
    password: createHash('serena'),
    carriera: [{
        codCorso: programmazione.codice,
        data: '12 / 12 / 2016',
        esito: 28,
        cfu: programmazione.cfu
    },
    {
        codCorso: fondamenti.codice,
        data: '24 / 02 / 2017',
        esito: 23,
        cfu: fondamenti.cfu
    },
    {
        codCorso: algebra.codice,
        data: '02 / 05 / 2017',
        esito: 27,
        cfu: algebra.cfu
    },
    {
        codCorso: analisi.codice,
        data: '02 / 09 / 2017',
        esito: 25,
        cfu: analisi.cfu
    }], //'array of subdocument' contenente la carriera degli studenti
    annoCorso: 2
});
stud1.save(function (err) {
    if (err) throw err;
});

var stud2 = new studenti({
    nome: 'Marco',
    cognome: 'Coppola',
    stato: 'Italia',
    città: 'Macerata',
    cap: 62100,
    dataDiNascita: new Date(1995, 06, 24),
    matricola: 'S002',
    codFacoltà: informatica.codice,
    email: 'marco.coppola@hotmail.it',
    emailUniversitaria: 'marco.coppola@studenti.unims.it',
    username: 'marco.coppola',
    password: createHash('marco'),
    carriera: [{
        codCorso: programmazione.codice,
        data: '30 / 02 / 2017',
        esito: 27,
        cfu: programmazione.cfu
    },
    {
        codCorso: fondamenti.codice,
        data: '10 / 02 / 2017',
        esito: 29,
        cfu: fondamenti.cfu
    },
    {
        codCorso: logica.codice,
        data: '02 / 09 / 2017',
        esito: 26,
        cfu: logica.cfu
    },
    {
        codCorso: architettura.codice,
        data: '04 / 07 / 2017',
        esito: 30,
        cfu: architettura.cfu
    },
    {
        codCorso: algebra.codice,
        data: '14 / 06 / 2017',
        esito: 30,
        cfu: algebra.cfu
    },
    {
        codCorso: diritto.codice,
        data: '02 / 12 / 2016',
        esito: 27,
        cfu: diritto.cfu
    }], //'array of subdocument' contenente la carriera degli studenti
    annoCorso: 2
});
stud2.save(function (err) {
    if (err) throw err;
});

var stud3 = new studenti({
    nome: 'Silvio',
    cognome: 'Leone',
    stato: 'Italia',
    città: 'Camerino',
    cap: 62032,
    dataDiNascita: new Date(1991, 09, 07),
    matricola: 'S003',
    codFacoltà: informatica.codice,
    email: 'silvio.leone@hotmail.it',
    emailUniversitaria: 'silvio.leone@studenti.unims.it',
    username: 'silvio.leone',
    password: createHash('silvio'),
    carriera: [{
        codCorso: programmazione.codice,
        data: '12 / 12 / 2015',
        esito: 22,
        cfu: programmazione.cfu
    },
    {
        codCorso: fondamenti.codice,
        data: '24 / 02 / 2017',
        esito: 26,
        cfu: fondamenti.cfu
    },
    {
        codCorso: algebra.codice,
        data: '02 / 11 / 2015',
        esito: 29,
        cfu: algebra.cfu
    },
    {
        codCorso: analisi.codice,
        data: '01 / 12 / 2015',
        esito: 21,
        cfu: analisi.cfu
    },
    {
        codCorso: basi.codice,
        data: '12 / 06 / 2017',
        esito: 30,
        cfu: basi.cfu
    },
    {
        codCorso: sistemi.codice,
        data: '13 / 01 / 2016',
        esito: 29,
        cfu: sistemi.cfu
    },
    {
        codCorso: business.codice,
        data: '16 / 04 / 2017',
        esito: 25,
        cfu: business.cfu
    },
    {
        codCorso: reti.codice,
        data: '29 / 07 / 2016',
        esito: 19,
        cfu: reti.cfu
    },], //'array of subdocument' contenente la carriera degli studenti
    annoCorso: 3
});
stud3.save(function (err) {
    if (err) throw err;
});

//chimica
var stud4 = new studenti({
    nome: 'Fabio',
    cognome: 'Costa',
    stato: 'Italia',
    città: 'Ancona',
    cap: 60121,
    dataDiNascita: new Date(1994, 04, 10),
    matricola: 'S004',
    codFacoltà: chimica.codice,
    email: 'fabio.costa@hotmail.it',
    emailUniversitaria: 'fabio.costa@studenti.unims.it',
    username: 'fabio.costa',
    password: createHash('fabio'),
    carriera: [{
        codCorso: analisiC.codice,
        data: '18 / 12 / 2016',
        esito: 21,
        cfu: analisiC.cfu
    },
    {
        codCorso: fisica.codice,
        data: '22 / 01 / 2017',
        esito: 25,
        cfu: fisica.cfu
    },
    {
        codCorso: ingl.codice,
        data: '17 / 02 / 2017',
        esito: 27,
        cfu: ingl.cfu
    },
    {
        codCorso: info.codice,
        data: '01 / 03 / 2016',
        esito: 28,
        cfu: info.cfu
    },
    {
        codCorso: chimicaInorganica.codice,
        data: '17 / 02 / 2017',
        esito: 23,
        cfu: chimicaInorganica.cfu
    },
    ], //'array of subdocument' contenente la carriera degli studenti
    annoCorso: 2
});
stud4.save(function (err) {
    if (err) throw err;
});

var stud5 = new studenti({
    nome: 'Nicole',
    cognome: 'Colombo',
    stato: 'Italia',
    città: 'Spoleto',
    cap: 16049,
    dataDiNascita: new Date(1993, 03, 12),
    matricola: 'S005',
    codFacoltà: chimica.codice,
    email: 'nicole.colombo@hotmail.it',
    emailUniversitaria: 'nicole.colombo@studenti.unims.it',
    username: 'nicole.colombo',
    password: createHash('nicole'),
    carriera: [{
        codCorso: analisiC.codice,
        data: '08 / 06 / 2015',
        esito: 26,
        cfu: analisiC.cfu
    },
    {
        codCorso: fisica.codice,
        data: '22 / 07 / 2015',
        esito: 25,
        cfu: fisica.cfu
    },
    {
        codCorso: ingl.codice,
        data: '17 / 09 / 2015',
        esito: 20,
        cfu: ingl.cfu
    },
    {
        codCorso: info.codice,
        data: '01 / 03 / 2016',
        esito: 28,
        cfu: info.cfu
    },
    {
        codCorso: chimicaOrganica.codice,
        data: '17 / 06 / 2016',
        esito: 23,
        cfu: chimicaOrganica.cfu
    },
    {
        codCorso: eco.codice,
        data: '31 / 07 / 2016',
        esito: 29,
        cfu: eco.cfu
    },
    {
        codCorso: bio.codice,
        data: '24 / 09 / 2016',
        esito: 25,
        cfu: bio.cfu
    },
    {
        codCorso: chimFi.codice,
        data: '01 / 03 / 2016',
        esito: 28,
        cfu: chimFi.cfu
    },], //'array of subdocument' contenente la carriera degli studenti
    annoCorso: 3
});
stud5.save(function (err) {
    if (err) throw err;
});

var stud6 = new studenti({
    nome: 'Giulia',
    cognome: 'Fabbri',
    stato: 'Italia',
    città: 'Torino',
    cap: 10121,
    dataDiNascita: new Date(1996, 10, 18),
    matricola: 'S006',
    codFacoltà: chimica.codice,
    email: 'giulia.fabbri@hotmail.it',
    emailUniversitaria: 'giulia.fabbri@studenti.unims.it',
    username: 'giulia.fabbri',
    password: createHash('giulia'),
    carriera: [
        {
            codCorso: fisica.codice,
            data: '27 / 02 / 2016',
            esito: 30,
            cfu: fisica.cfu
        },
        {
            codCorso: info.codice,
            data: '05 / 05 / 2016',
            esito: 28,
            cfu: info.cfu
        },
        {
            codCorso: chimicaInorganica.codice,
            data: '27 / 06 / 2016',
            esito: 27,
            cfu: chimicaInorganica.cfu
        },
        {
            codCorso: eco.codice,
            data: '06 / 02 / 2017',
            esito: 29,
            cfu: eco.cfu
        },
        {
            codCorso: bio.codice,
            data: '01 / 04 / 2017',
            esito: 30,
            cfu: bio.cfu
        }], //'array of subdocument' contenente la carriera degli studenti
    annoCorso: 3
});
stud6.save(function (err) {
    if (err) throw err;
});

//matematica
var stud7 = new studenti({
    nome: 'Matilde',
    cognome: 'Ricci',
    stato: 'Italia',
    città: 'Bologna',
    cap: 40121,
    dataDiNascita: new Date(1995, 07, 11),
    matricola: 'S007',
    codFacoltà: matematica.codice,
    email: 'matilde.ricci@hotmail.it',
    emailUniversitaria: 'matilde.ricci@studenti.unims.it',
    username: 'matilde.ricci',
    password: createHash('matilde'),
    carriera: [{
        codCorso: geometria.codice,
        data: '01 / 02 / 2017',
        esito: 24,
        cfu: geometria.cfu
    },
    {
        codCorso: alg.codice,
        data: '15 / 02 / 2017',
        esito: 25,
        cfu: alg.cfu
    },
    {
        codCorso: fis.codice,
        data: '06 / 04 / 2017',
        esito: 28,
        cfu: fis.cfu
    },
    {
        codCorso: prgM.codice,
        data: '19 / 06 / 2017',
        esito: 22,
        cfu: prgM.cfu
    },], //'array of subdocument' contenente la carriera degli studenti
    annoCorso: 2
});
stud7.save(function (err) {
    if (err) throw err;
});

var stud8 = new studenti({
    nome: 'Marco',
    cognome: 'Greco',
    stato: 'Italia',
    città: 'Napoli',
    cap: 80121,
    dataDiNascita: new Date(1991, 01, 23),
    matricola: 'S008',
    codFacoltà: matematica.codice,
    email: 'marco.greco@hotmail.it',
    emailUniversitaria: 'marco.greco@studenti.unims.it',
    username: 'marco.greco',
    password: createHash('marco'),
    carriera: [
        {
            codCorso: alg.codice,
            data: '15 / 02 / 2016',
            esito: 23,
            cfu: alg.cfu
        },
        {
            codCorso: fis.codice,
            data: '06 / 04 / 2016',
            esito: 27,
            cfu: fis.cfu
        },
        {
            codCorso: prgM.codice,
            data: '19 / 06 / 2016',
            esito: 30,
            cfu: prgM.cfu
        },
        {
            codCorso: eleMath.codice,
            data: '05 / 02 / 2017',
            esito: 23,
            cfu: eleMath.cfu
        },
        {
            codCorso: ricOp.codice,
            data: '26 / 02 / 2017',
            esito: 28,
            cfu: ricOp.cfu
        },
        {
            codCorso: probM.codice,
            data: '19 / 06 / 2017',
            esito: 27,
            cfu: probM.cfu
        },
        {
            codCorso: fisicaGenII.codice,
            data: '08 / 09 / 2017',
            esito: 25,
            cfu: fisicaGenII.cfu
        },], //'array of subdocument' contenente la carriera degli studenti
    annoCorso: 3
});
stud8.save(function (err) {
    if (err) throw err;
});

var stud9 = new studenti({
    nome: 'Carlotta',
    cognome: 'Pepe',
    stato: 'Italia',
    città: 'Lecce',
    cap: 73100,
    dataDiNascita: new Date(1994, 11, 04),
    matricola: 'S009',
    codFacoltà: matematica.codice,
    email: 'carlotta.pepe@hotmail.it',
    emailUniversitaria: 'carlotta.pepe@studenti.unims.it',
    username: 'carlotta.pepe',
    password: createHash('carlotta'),
    carriera: [
        {
            codCorso: alg.codice,
            data: '15 / 09 / 2015',
            esito: 27,
            cfu: alg.cfu
        },
        {
            codCorso: fis.codice,
            data: '06 / 04 / 2016',
            esito: 28,
            cfu: fis.cfu
        },
        {
            codCorso: geometria.codice,
            data: '08 / 07 / 2016',
            esito: 25,
            cfu: geometria.cfu
        },
        {
            codCorso: prgM.codice,
            data: '29 / 07 / 2016',
            esito: 29,
            cfu: prgM.cfu
        },
        {
            codCorso: eleMath.codice,
            data: '01 / 02 / 2017',
            esito: 24,
            cfu: eleMath.cfu
        },
        {
            codCorso: probM.codice,
            data: '14 / 06 / 2017',
            esito: 27,
            cfu: probM.cfu
        },
    ], //'array of subdocument' contenente la carriera degli studenti
    annoCorso: 3
});
stud9.save(function (err) {
    if (err) throw err;
});


//Mi disconnetto dal database
mongoose.connection.close();


