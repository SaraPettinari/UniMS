// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect("mongodb://localhost:27017/dbUnims");

var userSchema = new Schema({
    nome: { type: String, required: true },
    cognome: { type: String, required: true },
    stato:{String,required: true },
    cap:{Number,required: true },
    dataDiNascita: {Date, required: true },
    matricola: { type: Number, unique: true, required: true },
    email: String, 
    emailUniversitaria: String, 
    telefono:  Number, 
    username: { type: String, unique: true },
    password: String,
    admin: { type: Boolean, default: false }
});

// set up a mongoose model and pass it using module.exports
var User = mongoose.model('Users', userSchema);
module.exports = User;


// custom method to add string to end of name
// you can create more important methods like name validations or formatting
// you can also do queries and find similar users 
userSchema.methods.emailify = function () {
    // add some stuff to the users name
    //TODO controllo se è uno studente (@studenti...) o admin/professore
    this.email = this.username + '@unims.it';
    return this.email;
};

