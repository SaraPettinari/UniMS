var express = require('express');
var router = express.Router();
var passport = require('passport');
<<<<<<< HEAD
var StudentController = require('../controllers/studentiController');
=======
var CorsiController = require('../controllers/corsiController');
//var DocentiController = require('../controllers/docentiController');
var AppelliController = require('../controllers/appelliController');
>>>>>>> e7633989b81a3ae28c8f3a7b8c2b0eb223773501

var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    console.log('User non autenticato');
    res.redirect('/');
}

<<<<<<< HEAD
router.get('/', isAuthenticated, function (req, res) {
    CorsiController.populateFacoltà(req.user.codFacoltà);
    CorsiController.listaCorsi(function (err, corsi) {
        CorsiController.listaTuoiCorsi(req.user.codFacoltà, function (err2, tuoiCorsi) {
            DocentiController.listaDocentiFacoltà(req.user.codFacoltà, function (err3, docentiFacoltà) {
                if (!err && !err2 && !err3) {
                    res.render('paginaAmministratore', {
                        title: 'Corsi',
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
 * POST crea nuovo studente.
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

=======
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

>>>>>>> e7633989b81a3ae28c8f3a7b8c2b0eb223773501

module.exports = router;
