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
                    user: req.user
                });
            }
        });
    });
});

/**
 * POST handles creating a new blog post.
 */
router.post('/', isAuthenticated, function (req, res) {
    var data = {
        codFacoltà: req.user.codFacoltà,
        nome: req.body.nome,
        codice: req.body.codice,
        matricolaP: req.body.matricolaP,
        cfu: req.body.cfu
    };
    // After adding a new post, redirect to /blogpost and see the update.
    CorsiController.addCorso(data, function (err) {
        if (err) throw err;
    });
    res.redirect('/paginaAmministratore');
});

module.exports = router;
