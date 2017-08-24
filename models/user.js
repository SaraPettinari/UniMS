// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Facoltà = require('./corsiLaurea');
var AppelliVerbalizzati = require('./appelliVerbalizzati');

var studentSchema = new Schema({
    nome: { type: String, required: true },
    cognome: { type: String, required: true },
    stato: String,
    città: String,
    cap: Number,
    dataDiNascita: { type: Date, required: true },
    matricola: { type: String, required: true, unique: true },
    codFacoltà: { type: String, ref: 'Facoltà', required: true },
    email: { type: String, required: true, unique: true },
    emailUniversitaria: String,
    telefono: Number,
    username: String,
    password: String,
    indirizzo: String,
    carriera: [AppelliVerbalizzati], //'array of subdocument' contenente la carriera degli studenti
    annoCorso: {type: Number, default:1}
},
    //toglie il campo __v dal db
    {
        versionKey: false
    });

//-----STUDENTI-----
var Student = mongoose.model('Student', studentSchema);
module.exports = Student;