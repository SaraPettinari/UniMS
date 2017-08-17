var CorsiLaurea = require('./models/corsiLaurea');
var Prof = require('./models/personale').model('Prof');
var Corsi = require('./models/corsi');

module.exports = function (req, res) {
    Corsi.find({'codFacoltà' : req.codice}, function(err, array){
        if(err) throw err;
        array.forEach(function (element) {
            req.corsi.push(element.codice);
            req.save();
        });

    })
}