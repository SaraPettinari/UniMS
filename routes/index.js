var express = require('express');
var router = express.Router();
var passport = require('passport');
var CorsiLaurea = require('../models/corsiLaurea');

/**
 * Se l'utente  autenticato nella sessione, può accedere alla pagina.
 * Altrimenti, viene reindirizzato alla home.
 */
var isAuthenticated = function (req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	console.log('User non autenticato');
	res.redirect('/');
}

/** GET home page */
router.get('/', function (req, res) {
	res.render('home', { message: req.flash('message') });
});

/** GET pagina registrazione */
router.get('/registrazione', function (req, res) {
	CorsiLaurea.find({}, function (err, facoltà) {
		res.render('registrazione', {
			message: req.flash('message'),
			facoltà: facoltà //mostra il menù a scelta tra le facoltà disponibili
		});
	});
});

/* GET log out utente */
router.get('/logout', function (req, res) {
	req.logout();
	res.redirect('/');
});

/** POST gestione dei login */
router.post('/loginStudente', passport.authenticate('loginStudente', {
	successRedirect: '/paginaStudente', //reindirizzerà alla pagina dello studente se si logga uno studente
	failureRedirect: '/#area_personale',
	failureFlash: true
}));

router.post('/loginAmministratore', passport.authenticate('loginAmministratore', {
	successRedirect: '/paginaAmministratore', //reindirizzerà alla pagina dell'admin
	failureRedirect: '/#area_personale',
	failureFlash: true
}));

router.post('/loginDocente', passport.authenticate('loginDocente', {
	successRedirect: '/paginaDocente', //reindirizzerà alla pagina del docente
	failureRedirect: '/#area_personale',
	failureFlash: true
}));

/** POST gestione della registrazione */
router.post('/registrazione', passport.authenticate('registrazione', {
	successRedirect: '/registrazione', //con invio del messaggio flash contenente le credenziali istituzionali
	failureRedirect: '/registrazione', //con invio del messaggio flash contenente l'errore
	failureFlash: true
}));

module.exports = router;
