var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/dbUnims";
var MongoClient = require('mongodb').MongoClient;
//var User = require('server');


MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    console.log("Database created!");

    db.createCollection("Studenti", function (err, res) {
        if (err) throw err;
        console.log("Table created!");
        db.close();
    });


    db.createCollection("Professori", function (err, res) {
        if (err) throw err;
        console.log("Table created!");
        User.s
        db.close();
    });

    db.createCollection("Amministratori", function (err, res) {
        if (err) throw err;
        console.log("Table created!");
        db.close();
    });

    db.createCollection("Corsi", function (err, res) {
        if (err) throw err;
        console.log("Table created!");

        var campi = {idCorso:"", codMatricolaS:"", codFacolta:"", codScuola:""};
        db.collection("Corsi").insertOne(campi, function (err, res) {
            console.log("1 record inserted");
            db.close();
        });
         });

        db.createCollection("Esami", function (err, res) {
            if (err) throw err;
            console.log("Table created!");
            db.close();
        });

        db.createCollection("Corsi di laurea", function (err, res) {
            if (err) throw err;
            console.log("Table created!");
            db.close();
        });

        db.createCollection("Scuole", function (err, res) {
            if (err) throw err;
            console.log("Table created!");
            db.close();
        });

    });
