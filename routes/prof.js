var express = require('express');
var router = express.Router();
var passport = require('passport');
var CorsiController = require('../controllers/corsiController');
var DocentiController = require('../controllers/docentiController');
var AppelliController = require('../controllers/appelliController');

var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    console.log('User non autenticato');
    res.redirect('/');
}

/** GET prof page. funzione impl nel controller*/
router.get('/', isAuthenticated, function (req, res) {
    CorsiController.cercaCorsiDocente(req.user.matricola, function(err, corsi){
        AppelliController.listaAppelli(req.user.matricola, function(err, listaAppelli){
            if (err) throw err;
            res.render('paginaDocente', {
                title: 'PaginaDocente',
                user: req.user,
                corsi: corsi,
                listaAppelli: listaAppelli
            });
        })
    })
});

router.post('/nuovoAppello', isAuthenticated, function(req,res){
    var infoAppello = {
        matricolaP : req.user.matricola,
        idCorso : req.body.idCorso, 
        data : req.body.data,
        aula : req.body.aula
    };
    AppelliController.addAppello(infoAppello, function(err){
        if (err) throw err;
    });
    res.redirect('/paginaDocente');
})


router.post('/aggiornaAppello', isAuthenticated, function(req,res){
    var modificaAppello = {
        data : req.body.data,
        aula : req.body.aula
    };
    AppelliController.updateAppelli(req.body._id, modificaAppello, function(err){
        if (err) throw err;
    });
    res.redirect('/paginaDocente');
})


module.exports=router;