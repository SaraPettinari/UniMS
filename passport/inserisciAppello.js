var passport = require('passport');
var login = require('./login');
var Prof = require('../models/personale').model('Prof');
var appelliDb = require('mongodb').DbUnims;

var nuovoAppello = function (res, req){
  
    
    DbUnims.connect(url, function(err, db) {
      if (err) throw err;
      var appello = { name: "I appello", data: "10/10/2017" };
      db.collection("appello").insertOne(appello, function(err, res) {
        if (err) throw err;
        console.log("appello inserito");
        db.close();
      });
    });
    Run example »
    Save the code above in

   
}
