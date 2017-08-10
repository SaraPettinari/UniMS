// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Facoltà = require('./corsiLaurea');

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
    /*  amministratore: { type: Number, ref: 'Facoltà' }*/
},
    //toglie il campo __v dal db
    {
        versionKey: false
    });

//-----STUDENTI-----
var Student = mongoose.model('Student', studentSchema);
module.exports = Student;