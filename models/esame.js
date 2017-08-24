var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var DateOnly = require('mongoose-dateonly')(mongoose);

var esameSchema = new Schema({
    matricolaP: { type: String, required: true },
    matricolaS: { type: String },
    idCorso: { type: String, required: true },
    data: { type: DateOnly, required: true },
    ora: { type: String, required: true },
    aula: { type: String, required: true },
    esito: { type: Number }
}, {
        versionKey: false
    });

//-----ESAMI-----
var Exam = mongoose.model('Exam', esameSchema);
module.exports = Exam;