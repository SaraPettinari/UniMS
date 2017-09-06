var express = require('express');
var router = express.Router();
var passport = require('passport');
var CorsiController = require('../controllers/corsiController');
var DocentiController = require('../controllers/docentiController');
var AppelliController = require('../controllers/appelliController');

var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    console.log('User non autenticato');
    res.redirect('/');
}

var studentiIscritti = new Array(); //memorizza la lista degli studenti iscritti ad un appello
var thisAppello = new String(); //memorizza l'id dell'appello selezionato

/** GET pagina iniziale del docente */
router.get('/', isAuthenticated, function (req, res) {
    CorsiController.cercaCorsiDocente(req.user.matricola, function (err, corsi) {
        AppelliController.listaAppelli(req.user.matricola, function (err, listaAppelli) {
            if (err) throw err;
            res.render('paginaDocente', {
                title: 'PaginaDocente',
                user: req.user,
                corsi: corsi,
                listaAppelli: listaAppelli
            });
        })
    })
    //evita che si duplichi la lista degli iscritti ad ogni GET /appello
    studentiIscritti.splice(0, studentiIscritti.length);
});

/** GET pagina con gli iscritti ad un determinato appello  */
router.get('/appello', isAuthenticated, function (req, res) {
    res.render('paginaDocenteAppello', {
        title: 'Gestione Appelli',
        studentiIscritti: studentiIscritti
    });
})

/** GET tabella esiti dell'appello */
router.get('/andamentoEsiti', isAuthenticated, function (req, res) {
    AppelliController.seeEsiti(thisAppello, function (err, matrice) {
        console.log(matrice);
        res.render('paginaDocenteEsitiAppello', {
            title: 'Esiti Appello',
            matrice: matrice
        });
    });
})

/** POST creazione di un nuovo appello */
router.post('/nuovoAppello', isAuthenticated, function (req, res) {
    var infoAppello = {
        matricolaP: req.user.matricola,
        idCorso: req.body.idCorso,
        data: req.body.data,
        ora: req.body.ora,
        aula: req.body.aula
    };
    AppelliController.addAppello(infoAppello, function (err) {
        if (err) throw err;
    });
    res.redirect('/paginaDocente');
})

/** POST modifica di un appello */
router.post('/aggiornaAppello', isAuthenticated, function (req, res) {
    var modificaAppello = {
        data: req.body.data,
        ora: req.body.ora,
        aula: req.body.aula
    };
    AppelliController.updateAppelli(req.body._id, modificaAppello, function (err) {
        if (err) throw err;
    });
    res.redirect('/paginaDocente');
})

/** POST eliminazione di un appello */
router.post('/eliminaAppello', isAuthenticated, function (req, res) {
    AppelliController.removeAppelli(req.body._id, function (err) {
        if (err) throw err;
    });
    res.redirect('/paginaDocente');
})

/** POST in base all'appello selezionato, setta la lista degli studenti */
router.post('/appello', isAuthenticated, function (req, res) {
    thisAppello = req.body.scegliAppello;
    AppelliController.findAppello(req.body.scegliAppello, function (err, appello) {
        appello.matricolaS.forEach(function (studente) {
            studentiIscritti.push(studente);
        });
        appello.save();
    })
    res.redirect('/paginaDocente/appello');
})

/** POST aggiunti nel db gli esiti di un appello */
router.post('/appello/aggiungiEsito', isAuthenticated, function (req, res) {
    var varInput = req.body.voti;
    var arrayVoti = varInput.split(",");
    var lEsiti = new Array();
    arrayVoti.forEach(function (element) {
        lEsiti.push(element);
    });
    AppelliController.addEsito(lEsiti, thisAppello);
    res.redirect('/paginaDocente');
});

/** POST imposta l'id dell'appello di cui voglio visualizzare gli esiti  */
router.post('/andamentoEsiti', isAuthenticated, function (req, res) {
    thisAppello = req.body.scegliAppello;
    res.redirect('/paginaDocente/andamentoEsiti');
})

module.exports = router;