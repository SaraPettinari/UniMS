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
	console.log('User non autenticato');
	res.redirect('/');
}

/** GET home page. */
router.get('/', function (req, res) {
	res.render('home', { message: req.flash('message') });
});

/** POST handles login. */
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

/** GET prof page. */
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
