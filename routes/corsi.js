var express = require('express');
var router = express.Router();
var CorsiController = require('../controllers/corsiController');

var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    console.log('User non autenticato');
    res.redirect('/');
}

var Corsi = require('../models/corsi');

router.get('/', isAuthenticated, function (req, res) {
    CorsiController.listaCorsi(function (err, corsi) {
        CorsiController.listaTuoiCorsi(req.user.codFacoltà, function (err2, tuoiCorsi) {
            if (!err && !err2) {
                res.render('paginaAmministratore', {
                    title: 'Corsi',
                    corsi: corsi,
                    tuoiCorsi: tuoiCorsi,
                    user: req.user,
                });
            }
        });
    });
});

/**
 * POST crea nuovo corso.
 */
router.post('/', isAuthenticated, function (req, res) {
    var data = {
        codFacoltà: req.user.codFacoltà,
        nome: req.body.nome,
        codice: req.body.codice,
        matricolaP: req.body.matricolaP,
        cfu: req.body.cfu,
        anno: req.body.anno
    };
    CorsiController.addCorso(data, function (err) {
        if (err) throw err;
    });
    res.redirect('/paginaAmministratore');
});

/**
 * POST aggiorna il numero di cfu e/o il professore e/o l'anno di un determinato corso.
 */
router.post('/update', isAuthenticated, function (req, res) {
    var data = {
        matricolaP: req.body.matricolaP,
        cfu: req.body.cfu,
        anno: req.body.anno
    };
    CorsiController.updateCorso(req.body.codice, data, function (err) {
        if (err) throw err;
    });
    res.redirect('/paginaAmministratore');
});

/**
 * POST rimuove un determinato corso.
 */
router.post('/remove', isAuthenticated, function (req, res) {
    CorsiController.removeCorso(req.body.codice, function (err) {
        if (err) throw err;
    });
    res.redirect('/paginaAmministratore');
});


module.exports = router;
