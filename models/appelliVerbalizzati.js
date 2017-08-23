var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Esame = require('./esame');

/*var appelliVerbalizzati = new Schema({
    codCorso: { type: String, required: true, ref: 'Esame' },
    data: { typ: Date, required: true, ref: 'Esame' },
    esito: { type: Number, required: true, ref: 'Esame', min: 18, max: 30 }
},
    {
        versionKey: false
    });

//-----ESAMI SUPERATI E VERBALIZZATI-----
var MyExam = mongoose.model('MyExam', appelliVerbalizzati);
module.exports = MyExam; */