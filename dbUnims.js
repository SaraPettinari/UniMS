var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";
var MongoClient = require('mongodb').MongoClient;

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");

  if (err) throw err;
  db.createCollection("customers", function(err, res) {
    if (err) throw err;
    console.log("Table created!");

});
});
