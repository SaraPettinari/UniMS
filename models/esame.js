var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var esameSchema = new Schema({
    matricolaP: { type: String, required: true },
    matricolaS: { type: String, required: true },
    idCorso: { type: String, required: true },
    data: { type: Date, required: true },
    esito: { type: Number, required: true, min: 18 }
});

//-----ESAMI-----
var Exam = mongoose.model('Exam', esameSchema);
module.exports = Exam;