var express = require('express');
var router = express.Router();
var passport = require('passport');

/**
 * If user is authenticated in the session, allow access to the page.
 *		If not, redirect the user to the log-in page.	
 */
var isAuthenticated = function(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/');
}

/** GET home page. */
router.get('/', function(req, res) {
	res.render('home');
});

/** POST handles login. */
router.post('/login', passport.authenticate('login', {
	successRedirect: '/paginaStudente', //reindirizzerà alla pagina dello studente
	failureRedirect: '/',
//	failureFlash : true  
}));

router.get('/paginaStudente', function(req, res){
	res.render('paginaStudente');
});

/** GET pagina registrazione. */
router.get('/registrazione', function(req, res){
	res.render('registrazione');
});

/** POST handles registration. */
router.post('/registrazione', passport.authenticate('registrazione', {
	successRedirect: '/',
	failureRedirect: '/registrazione',
//	failureFlash : true  
}));

/* GET home page. 
router.get('/home', isAuthenticated, function(req, res){
	res.render('home', {title: 'Home',
						user: req.user});
});*/

/* GET handles log out. */
router.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});

module.exports = router;
