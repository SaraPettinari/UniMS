// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect("mongodb://localhost:27017/dbUnims");

//-----STUDENTI-----

var userStudenti = new Schema({
    nome: { type: String, required: true },
    cognome: { type: String, required: true },
    stato: { type: String, /* required: true */},
    cap: { type: Number, /* required: true */ },
    dataDiNascita: { type: Date, /* required: true */ },
    matricolaS: { type: Number, unique: true,/* required: true */},
   // codCorso: {type: String, ref:Corso}
    // codFacolta: {type:String, ref:Facolta } 
    email: String,
    emailUniversitaria: String,
    telefono: Number,
    username: { type: String, unique: true },
    password: String,
    admin: { type: Boolean, default: false }
});

var inserimentoStudente = function() {      

var stud = new Studenti ({ 
    nome: 'bho',
    cognome: 'bho',
    stato: 'bho',
    cap: 90000,
    dataDiNascita: 02/02/1234,
    email: 'bho@gmail.com',
    telefono: 1234567890,
 });
stud.save();
};

return {
    inserimentoStudente: inserimentoStudente
};

// set up a mongoose model and pass it using module.exports
var User = mongoose.model('Studenti', userStudenti);
module.exports = Studenti;



// custom method to add string to end of name
// you can create more important methods like name validations or formatting
// you can also do queries and find similar users 
userSchema.methods.emailify = function () {
    // add some stuff to the users name
    //TODO controllo se è uno studente (@studenti...) o admin/professore
    this.email = this.username + '@unims.it';
    return this.email;
};


