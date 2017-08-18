var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Corsi = require('./corsi');

var corsiLaureaSchema = new Schema({
    nome: { type: String, required: true },
    codice: { type: String, required: true, unique: true },
    corsi: [{ type: String, ref: 'Corsi' }]
},
    {
        versionKey: false
    });

//-----FACOLTA'-----
var DegreeCourse = mongoose.model('DegreeCourse', corsiLaureaSchema);
module.exports = DegreeCourse;