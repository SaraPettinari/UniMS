// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect("mongodb://localhost:27017/dbUnims");

//-----STUDENTI-----

var userSchema = new Schema({
    nome: { type: String, required: true },
    cognome: { type: String, required: true },
    stato: { type: String, /* required: true */},
    cap: { type: Number, /* required: true */ },
    dataDiNascita: { type: Date, /* required: true */ },
 //   matricolaS: { type: Number, /* required: true */},
   // codCorso: {type: String, ref:Corso}
    // codFacolta: {type:String, ref:Facolta } 
    email: String,
    emailUniversitaria: String,
    telefono: Number,
    username: String,
    password: String,
    admin: { type: Boolean, default: false }
});

// set up a mongoose model and pass it using module.exports
var User = mongoose.model('User', userSchema);
module.exports = User;


userSchema.methods.emailify = function () {
    //TODO controllo se è uno studente (@studenti...) o admin/professore
    this.email = this.username + '@unims.it';
    return this.email;
};


