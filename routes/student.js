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

var esami = new Array(); //conterrà gli esami di un dato corso
var booleano = new Boolean();

/** GET student page. */
router.get('/', isAuthenticated, function (req, res) {
    CorsiController.listaTuoiCorsi(req.user.codFacoltà, function (err, tuoiCorsi) {
        CorsiController.corsiAnnuali(req.user.annoCorso, req.user.codFacoltà, function (err, corsiAnnuali) {
            res.render('paginaStudente', {
                title: 'PaginaStudente',
                user: req.user,
                tuoiCorsi: tuoiCorsi,
                corsiAnnuali: corsiAnnuali,
                appelliCorso: esami,
                bool: booleano
            });
        });
    });
});

/** POST mostra la lista degli appelli disponibili del corso scelto dall'utente */
router.post('/vediAppelli', isAuthenticated, function (req, res) {
    AppelliController.listaAppelliPerCorso(req.body.idCorso, function (err, appelliCorso) {
        appelliCorso.forEach(function (element) {
            esami.push(element);
        });
        res.redirect('/paginaStudente');
    })
});

/** POST pulisce l'array contenente gli esami di un dato corso */
router.post('/pulisci', isAuthenticated, function (req, res) {
    esami.splice(0, esami.length);
    res.redirect('/paginaStudente');
});

router.post('/prenotati', isAuthenticated, function (req, res) {
    AppelliController.prenotazione(req.user.matricola, req.body.idAppello);
    AppelliController.checkStudente(req.user.matricola, req.body.idAppello, function (err, bool) {
        booleano = bool;
        console.log(bool);
        res.redirect('/paginaStudente');
    });
});

module.exports = router;
