var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Facoltà = require('./corsiLaurea');

var peopleSchema = new Schema({
    nome: { type: String, required: true },
    cognome: { type: String, required: true },
    matricola: { type: String, required: true, unique: true },
    codFacoltà: { type: String, ref: 'Facoltà', required: true },
    email: { type: String, required: true, unique: true },
    username: String,
    password: String,
},
    //toglie il campo __v dal db
    {
        versionKey: false
    });

//-----AMMINISTRATORI-----
var Admin = mongoose.model('Admin', peopleSchema);
module.exports = Admin;

//-----PROFESSORI-----
var Prof = mongoose.model('Prof', peopleSchema);
module.exports = Prof;