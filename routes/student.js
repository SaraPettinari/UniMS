var express = require('express');
var router = express.Router();
var passport = require('passport');
var CorsiController = require('../controllers/corsiController');
//var DocentiController = require('../controllers/docentiController');
var AppelliController = require('../controllers/appelliController');

var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    console.log('User non autenticato');
    res.redirect('/');
}

/** GET student page. */
router.get('/', isAuthenticated, function (req, res) {
    CorsiController.listaTuoiCorsi(req.user.codFacoltà, function (err, tuoiCorsi) {
        CorsiController.corsiAnnuali(req.user.annoCorso, req.user.codFacoltà, function (err, corsiAnnuali) {
            AppelliController.listaAppelliPerCorso(req.body.idCorso, function(err, appelliCorso){
            res.render('paginaStudente', {
                title: 'PaginaStudente',
                user: req.user,
                tuoiCorsi: tuoiCorsi,
                corsiAnnuali: corsiAnnuali,
                appelliCorso: appelliCorso
            });
        });
        });
    });
});


module.exports = router;
