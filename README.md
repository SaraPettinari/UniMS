# UniMS

## PROGETTO REALIZZATO DA:
* SARA PETTINARI        095397    sara.pettinari@studenti.unicam.it
* MARA ALBANESI         095193    mara.albanesi@studenti.unicam.it
* MARGHERITA RENIERI    095100    margherita.renieri@studenti.unicam.it

## PROGETTO PROGRAMMAZIONE WEB
1.  come utente voglio poter accedere ad un’area privata tramite username e password
2.  come admin voglio poter modificare il piano di studio
3.  come studente voglio potermi iscrivere ad un esame
4.  come professore voglio poter caricare ed inviare i risultati degli esami agli studenti
5.  come studente voglio visualizzare la mia carriera universitaria anche con l’ausilio di grafici
6.  come amministratore posso aggiungere nuovi docenti
7.  come professore gestisco un appello
8.  come studente posso decidere se accettare e verbalizzare un voto o meno
9.  come professore posso vedere graficamente l’andamento di un esame e posso scaricare il pdf dei voti
10. come admin posso aggiungere crediti liberi alla carriera dello studente
 
## Prerequisiti
* Avere installato node.js
* Avere installato mongoDB
* Avere un account su heroku

## Installazione
* Scaricare le dependencies tramite il comando `npm install`

## Utilizzo
### In locale
* Da terminale avviare il database tramite il comando `mongod`
* Nel file server.js impostare come parametro alla riga 14  ```urlDb.databaseLocale```
* Importare i dati tramite il comando `node populateDbUnims.js`
* Avviare il server tramite il comando `node server.js`

## Heroku 
* Da terminale spostarsi nella cartella locale del progetto
* Da terminale eseguire ```heroku login```
* Da terminale eseguire ```heroku create```
* Da terminale deployare l'app con il comando ```git push heroku master```
* Da terminale aprire l'app tramite il comando ```heroku open```

L'app viene deployata automaticamente al link: https://unims.herokuapp.com/

## Link
* Link alla bacheca di trello: https://trello.com/b/TlMNEIiB
* Link al testo del progetto: https://drive.google.com/drive/folders/0B7GoKL689kj7MjBBaGR0Z1NKUms 
* Link al video di presentazione: https://youtu.be/poN0I4Vbm1M

## Struttura File
```
--+ controllers                         //controller
  |--- appelliController.js             //gestore delle funzioni relative agli appelli
  |--- corsiController.js               //gestore delle funzioni relative ai corsi
  |--- docentiController.js             //gestore delle funzioni relative ai docenti
--+ models                              //schemi modelli Mongoose
  |--- appelliVerbalizzati.js           //carriera
  |--- corsi.js                         //corsi
  |--- corsiLaurea.js                   //facoltà
  |--- esame.js                         //esami/appelli
  |--- personale.js                     //docenti e amministratori
  |--- user.js                          //studenti
--+ passport                            //funzione passport per permettere l'autenticazione di un utente
  |--- init.js                          //serializza e deserializza un utente
  |--- login.js                         //controlla le credenziali di accesso
  |--- registrazione.js                 //registra un nuovo studente 
--+ public
  |--+ css
     |--- style.css                      //stile personalizzato
  |--+ img                               //immagini usate 
     |--- ...
  |--+ js
     |--- angular.js                     //implementa le funzionalità di angular
     |--- script.js                      //implementa le funzionalità di javascript 
--+ routes
  |--- admin.js                          //funzioni dell'admin in riferimento al piano studi
  |--- index.js                          //file principale
  |--- prof.js                           //funzioni dei docenti
  |--- student.js                        //funzioni dei studenti
--+ views                                //contiene i file ejs
  |---error.ejs                          //errori
  |---home.ejs                           //homepage
  |---paginaAmministratore.ejs           //pagina personale amministratore
  |---paginaDocente.ejs                  //pagina personale docente
  |---paginaDocenteAppello.ejs           //pagina dati appello
  |---paginaDocenteEsitiAppello.ejs      //pagina esiti studenti
  |---paginaStudente.ejs                 //pagina personale studente
  |---paginaStudenteAppello.ejs          //lista appelli disponibili
  |---paginaStudentePrenotazioni.ejs     //lista appelli prenotati
  |---registrazione.ejs                  //pagina registrazione nuovo studente
--- config.js                            //configurazione
--- LICENSE.md                           //licenza MIT   
--- package.json                         
--- populateDbUnims.js                   //se lanciato prima di 'server.js' popola il db con vari campi
--- server.js                            //file principale da eseguire
--- README.md
```
   
## API

**/**

GET / 

GET /registrazione

GET /logout

POST /loginStudente

POST /loginAmministratore

POST /loginDocente

POST /registrazione


**/paginaAmministratore**

GET /paginaAmministratore

POST /paginaAmministratore

POST /paginaAmministratore/update

POST /paginaAmministratore/remove

POST /paginaAmministratore/registrazioneDocente

POST /paginaAmministratore/aggiuntaCFULiberi


**/paginaDocente**

GET /paginaDocente

GET /paginaDocente/appello

GET /paginaDocente/andamentoEsiti

POST /paginaDocente/nuovoAppello

POST /paginaDocente/aggiornaAppello

POST /paginaDocente/eliminaAppello

POST /paginaDocente/appello

POST /paginaDocente/appello/aggiungiEsito

POST /paginaDocente/andamentoEsiti

POST /paginaDocente/chiudiAppello


**/paginaStudente**

GET /paginaStudente

GET /paginaStudente/appelli

GET /paginaStudente/vediPrenotazioni

POST /paginaStudente/vediAppelli

POST /paginaStudente/appelli/prenotati

POST /paginaStudente/vediPrenotazioni/controllaEsiti

POST /paginaStudente/vediPrenotazioni/confermaVoto

POST /paginaStudente/vediPrenotazioni/cancellaPrenotazione

## Credenziali di Accesso per la facoltà di Informatica
*per testare le altre facoltà (Matematica e Chimica) consultare il file populateDbUnims.js*

### Amministratore

Username: sara.pettinari/admin

Password: sara

### Docente

Username: mario.rossi/prof

Password: mario

### Studente

Username: serena.ferrari   

Password: serena


