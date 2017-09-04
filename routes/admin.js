var express = require('express');
var router = express.Router();
var passport = require('passport');
var CorsiController = require('../controllers/corsiController');
var DocentiController = require('../controllers/docentiController');

var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    console.log('User non autenticato');
    res.redirect('/');
}

/** GET pagina amministratore */
router.get('/', isAuthenticated, function (req, res) {
    CorsiController.populateFacoltà(req.user.codFacoltà);
    CorsiController.listaCorsi(function (err, corsi) {
        CorsiController.listaTuoiCorsi(req.user.codFacoltà, function (err2, tuoiCorsi) {
            DocentiController.listaDocentiFacoltà(req.user.codFacoltà, function (err3, docentiFacoltà) {
                if (!err && !err2 && !err3) {
                    res.render('paginaAmministratore', {
                        title: 'Pagina Amministratore',
                        corsi: corsi,
                        tuoiCorsi: tuoiCorsi,
                        user: req.user,
                        docentiFacoltà: docentiFacoltà,
                        message: req.flash('message')
                    });
                }
            });
        });
    })
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

/**
 * POST aggiunta di un nuovo docente.
 */
router.post('/registrazioneDocente', passport.authenticate('registrazioneDocente', {
    successRedirect: '/paginaAmministratore',
    failureRedirect: '/paginaAmministratore',
    failureFlash: true
}));

/**
 * POST aggiunta di cfu liberi per uno studente.
 */
router.post('/aggiuntaCFULiberi', isAuthenticated, function (req, res) {
    var dati = {
        codCorso: req.body.attività,
        data: req.body.data,
        cfu: req.body.cfu
    }
    CorsiController.addCreditiLiberi(req.body.matricolaStudente, dati);
    res.redirect('/paginaAmministratore');
});

module.exports = router;
