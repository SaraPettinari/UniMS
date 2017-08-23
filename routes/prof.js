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

/** GET prof page. funzione impl nel controller*/
router.get('/', isAuthenticated, function (req, res) {
	res.render('paginaDocente', {
		title: 'PaginaDocente',
		user: req.user
	});
});