// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect("mongodb://localhost:27017/dbUnims");

var userSchema = new Schema({
    nome: { type: String, required: true },
    cognome: { type: String, required: true },
    stato: String,
    città: String,
    cap: Number,
    dataDiNascita: { type: Date, required: true },
    matricola: Number, /* required: true */
   // codCorso: {type: String, ref:Corso}
    // codFacolta: {type:String, ref:Facolta } 
    email: String,
    emailUniversitaria: String,
    telefono: Number,
    username: String,
    password: String,
    indirizzo: String
   // admin: { type: Boolean, default: false }
});

// set up a mongoose model and pass it using module.exports
//var User = mongoose.model('User', userSchema);
//module.exports = User;

//-----STUDENTI-----
var Student = mongoose.model('Student', userSchema);
module.exports = Student;


userSchema.methods.emailify = function () {
    //TODO controllo se è uno studente (@studenti...) o admin/professore
    this.email = this.username + '@unims.it';
    return this.email;
};


