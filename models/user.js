// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Facoltà = require('./corsiLaurea');

var studentSchema = new Schema({
    nome: { type: String, required: true },
    cognome: { type: String, required: true },
    stato: String,
    città: String,
    cap: Number,
    dataDiNascita: { type: Date, required: true },
    matricola: { type: String, required: true, unique: true },
    codFacoltà: { type: String, ref: 'Facoltà', required: true },
    email: { type: String, required: true, unique: true },
    emailUniversitaria: String,
    telefono: Number,
    username: String,
    password: String,
<<<<<<< HEAD
    indirizzo: String
   // admin: { type: Boolean, default: false }
}, 
{
    collection: 'studenti'
});
var Studenti = mongoose.model(Studenti, userSchema);

baucis.rest({
    singular: 'Studenti',
    plural: 'Studente'
});
};

// set up a mongoose model and pass it using module.exports
//var User = mongoose.model('User', userSchema);
//module.exports = User;
=======
    indirizzo: String,
    /*  amministratore: { type: Number, ref: 'Facoltà' }*/
},
    //toglie il campo __v dal db
    {
        versionKey: false
    });
>>>>>>> 0f91b9874e943118a8bd3f5ca4f872d58a4a1c25

//-----STUDENTI-----
var Student = mongoose.model('Student', studentSchema);
module.exports = Student;