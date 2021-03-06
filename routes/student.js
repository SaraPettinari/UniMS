var express = require('express');
var router = express.Router();
var passport = require('passport');
var CorsiController = require('../controllers/corsiController');
var AppelliController = require('../controllers/appelliController');

var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    console.log('User non autenticato');
    res.redirect('/');
}

var esami = new Array(); //conterrà gli esami di un dato corso
var thisAppello = new String(); //memorizza l'id dell'appello selezionato

/** GET pagina iniziale dello studente */
router.get('/', isAuthenticated, function (req, res) {
    CorsiController.listaTuoiCorsi(req.user.codFacoltà, function (err, tuoiCorsi) {
        CorsiController.corsiAnnuali(req.user.annoCorso, req.user.codFacoltà, function (err, corsiAnnuali) {
            CorsiController.appelliPrenotabili(req.user, req.user.codFacoltà, function (err, appelliPrenotabili) {
                AppelliController.calcolaProgressione(req.user.matricola, function (err, progressioneCfu, mediaAritmetica, mediaPonderata) {
                    res.render('paginaStudente', {
                        title: 'PaginaStudente',
                        user: req.user,
                        tuoiCorsi: tuoiCorsi,
                        corsiAnnuali: corsiAnnuali,
                        progressioneCfu: progressioneCfu,
                        appelliPrenotabili: appelliPrenotabili,
                        mediaAritmetica: mediaAritmetica,
                        mediaPonderata: mediaPonderata
                    });
                });
            });
        });
    });
    //evita che si duplichi la lista degli appelli ad ogni GET
    esami.splice(0, esami.length);
});

/** GET la pagina contenente la lista degli appelli disponibili */
router.get('/appelli', isAuthenticated, function (req, res) {
    res.render('paginaStudenteAppello', {
        title: 'Appelli',
        user: req.user,
        appelliCorso: esami,
    });
});

/** GET pagina registrazioni agli appelli */
router.get('/vediPrenotazioni', isAuthenticated, function (req, res) {
    AppelliController.listaPerStudente(req.user.matricola, function (err, prenotazioni) {
        AppelliController.sendEsitoStudente(req.user.matricola, thisAppello, function (err, myEsito, dataAppello, idCorsoAppello) {
            res.render('paginaStudentePrenotazioni', {
                title: 'Prenotazioni',
                user: req.user,
                prenotazioni: prenotazioni,
                myEsito: myEsito,
                dataAppello: dataAppello,
                idCorsoAppello: idCorsoAppello
            });
        });
    });
});

/** 
 * POST mostra la lista degli appelli disponibili del corso scelto dall'utente 
 * e controlla che lo studente non sia già iscritto all'appello
*/
router.post('/vediAppelli', isAuthenticated, function (req, res) {
    AppelliController.listaAppelliPerCorso(req.body.idCorso, function (err, appelliCorso) {
        appelliCorso.forEach(function (element) {
            AppelliController.checkStudente(req.user.matricola, element._id, function (err, bool) {
                var chiusuraAppello = element.chiuso;
                console.log(element.chiuso);
                if (!bool && !chiusuraAppello)
                    esami.push(element);
            });
        });
        res.redirect('/paginaStudente/appelli');
    })
});

/** POST aggiunge la matricola dello studente nella lista degli iscritti all'appello */
router.post('/appelli/prenotati', isAuthenticated, function (req, res) {
    AppelliController.prenotazione(req.user.matricola, req.body.idAppello);
    res.redirect('/paginaStudente');
});

/** POST setta l'id dell'appello selezionato */
router.post('/vediPrenotazioni/controllaEsiti', isAuthenticated, function (req, res) {
    thisAppello = req.body.idAppello;
    res.redirect('/paginaStudente/vediPrenotazioni')
})

/** POST aggiunta dei dati dell'appello nella carriera dello studente */
router.post('/vediPrenotazioni/confermaVoto', isAuthenticated, function (req, res) {
    var data = {
        codCorso: req.body.idCorsoAppello,
        data: req.body.dataAppello,
        esito: req.body.myEsito,
    }
    AppelliController.verbalizzaAppello(data, req.user.matricola);
    thisAppello = ''; //appello verbalizzato, azzero la variabile
    res.redirect('/paginaStudente');
})

/** POST cancella la prenotazione da un appello */
router.post('/vediPrenotazioni/cancellaPrenotazione', isAuthenticated, function (req, res) {
    AppelliController.cancellaPrenotazione(req.user.matricola, req.body.idAppello);
    res.redirect('/paginaStudente');
});


module.exports = router;
