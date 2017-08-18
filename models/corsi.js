var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Prof = require('./personale').model('Prof');

var corsiSchema = new Schema({
    nome: { type: String, required: true },
    codice: { type: String, required: true, unique: true },
    codFacoltà: { type: String, required: true, ref: 'Prof' },
    matricolaP: { type: String, required: true, ref: 'Prof' },
    cfu: { type: Number, required: true },
    anno:  { type: Number, required: true }
},
    {
        versionKey: false
    });

//-----CORSI-----
var Course = mongoose.model('Course', corsiSchema);
module.exports = Course;