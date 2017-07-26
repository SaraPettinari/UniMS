var User = require('./server/models/user_model');

var note1 = new User({
    title: 'Gita a Venaria',
    text: 'Ci siamo tanto divertiti bla bla bla....',
    place: 'Venaria',
    position: { latitude: 45.137058, longitude: 7.621327 },
    created: new Date('2016-04-15'),
    updated: new Date('2016-04-15')
});

var note2 = new User({
    title: 'Giornata a Ivrea',
    text: 'Siamo venuti per lavoro.....',
    place: 'Nostri uffici a Ivrea',
    position: { latitude: 45.459330, longitude: 7.872489 },
    created: new Date('2016-03-09'),
    updated: new Date('2016-03-21')
});

var note3 = new User({
    title: 'Festa di Luca',
    text: 'Riuscita molto bene! ... ',
    place: 'Casa di Luca',
    position: { latitude: 45.068557, longitude: 7.641706 },
    created: new Date('2016-02-27'),
    updated: new Date('2016-02-28')
});

note1.save(function (err) {
    if (err) throw err;

    console.log('Salvataggio completato');
});

note2.save(function (err) {
    if (err) throw err;

    console.log('Salvataggio completato');
});

note3.save(function (err) {
    if (err) throw err;

    console.log('Salvataggio completato');
});