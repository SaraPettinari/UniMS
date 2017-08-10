var express = require('express');
var router = express.Router();
var passport = require('passport');

/**
 * If user is authenticated in the session, allow access to the page.
 *		If not, redirect the user to the log-in page.	
 */
var isAuthenticated = function (req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/');
}

/** GET home page. */
router.get('/', function (req, res) {
	res.render('home', { message: req.flash('message') });
});

/** POST handles login. */
router.post('/login', passport.authenticate('login', {
	successRedirect: '/paginaStudente', //reindirizzerà alla pagina dello studente se si logga uno studente
	failureRedirect: '/#area_personale',
	failureFlash: true
}));

var DegreeCourse = require('../models/corsiLaurea');
/** GET pagina registrazione. */
router.get('/registrazione', function (req, res) {
	DegreeCourse.find({}, function (err, facoltà) {
		res.render('registrazione', {
			message: req.flash('message'),
			facoltà: facoltà //mostra il menù a scelta tra le facoltà disponibili
		});
	});
});

/** POST handles registration. */
router.post('/registrazione', passport.authenticate('registrazione', {
	successRedirect: '/',
	failureRedirect: '/registrazione',
	failureFlash: true
}));

/** GET student page. */
router.get('/paginaStudente', isAuthenticated, function (req, res) {
	res.render('paginaStudente', {
		title: 'PaginaStudente',
		user: req.user
	});
});

/** GET admin page. */
router.get('/paginaAmministratore', isAuthenticated, function (req, res) {
	res.render('paginaAmministratore', {
		title: 'PaginaAmministratore',
		user: req.user
	});
});

/** GET student page. */
router.get('/paginaDocente', isAuthenticated, function (req, res) {
	res.render('paginaDocente', {
		title: 'PaginaDocente',
		user: req.user
	});
});

/* GET handles log out. */
router.get('/logout', function (req, res) {
	req.logout();
	res.redirect('/');
});

module.exports = router;
