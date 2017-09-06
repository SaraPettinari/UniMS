function confermaPrenotazione() {
    alert('Prenotazione confermata!');
}
function cancellaPrenotazione() {
    alert('Prenotazione cancellata!');
}

function creaArrayVoti() {
    var array = [];
    var a = document.querySelectorAll("[id^='voto']");
    a.forEach(function (element) {
        array.push(element.value);
    });
    document.getElementById('arrayVoti').value = array;
}

//validazione del campo password e della conferma al trattamento dei dati personali
function check() {
    var p = document.getElementById('password');
    var pControllo = document.getElementById('verificoPassword');
    if (p.value !== pControllo.value) {
        //avvisa che non è stato generato lo username (per la registrazione studente)
        if (document.getElementById('username')) {
            if (document.getElementById('username').value.length == 0)
                document.getElementById("checkU").innerHTML = 'Non hai generato lo username!';
            else
                document.getElementById("checkU").innerHTML = '';
        }
        document.getElementById("checkP").innerHTML = 'Le password non coincidono';
        document.getElementById("inviaR").disabled = true;
    }
    else {
        document.getElementById("checkP").innerHTML = '';
        //le password coincidono, controllo che sia confermato il trattamento dei dati personali
        if (document.getElementById("trattamentoDati").checked == false) {
            document.getElementById("inviaR").disabled = true;
        }
        else
            document.getElementById("inviaR").disabled = false;
    }
}

//genera grafico carriera studente
function generaGrafico() {
    var array = []; //date in cui si sono svolti gli esami
    var a = document.querySelectorAll("[id^='data']");
    a.forEach(function (element) {
        array.push(element.value);
    });

    var arrayEsito = []; //esiti degli esami
    var e = document.querySelectorAll("[id^='esito']");
    var j = 0;
    e.forEach(function (element) {
        // non vengono considerati i cfu liberi, poiché non hanno un esito
        if (element.value.length === 0)
            array.splice(j, 1); //rimossa la data corrispondente all'attività libera
        else {
            arrayEsito.push(element.value);
            j++;
        }
    });

    var dataP = []; //dati da passare al grafico
    var i = 0;
    array.forEach(function (element) {
        dataP.push({ "date": element, "column-1": arrayEsito[i] });
        i++;
    });

    // <!-- amCharts javascript code -->

    AmCharts.makeChart("chartdiv",
        {
            "type": "serial",
            "categoryField": "date",
            "dataDateFormat": "YYYY-MM-DD",
            "theme": "light",
            "categoryAxis": {
                // "parseDates": true
            },
            "chartCursor": {
                "enabled": true
            },
            "chartScrollbar": {
                "enabled": true
            },
            "trendLines": [],
            "graphs": [
                {
                    "bullet": "round",
                    "id": "AmGraph-1",
                    "title": "graph 1",
                    "valueField": "column-1"
                }
            ],
            "guides": [],
            "valueAxes": [
                {
                    "id": "ValueAxis-1",
                    "title": "Voti",
                }
            ],
            "allLabels": [],
            "balloon": {},
            "titles": [
                {
                    "id": "Title-1",
                    "size": 15,
                    "text": "Andamento Carriera"
                }
            ],
            "dataProvider": dataP
        }
    );

}

function generaPdf() {
    var doc = new jsPDF();
    doc.fromHTML($('#tableId').html(), 20, 20);
    doc.save('esitiAppello.pdf');
}

//controllo che il bottone di verbalizzazione sia attivo solo con un esito > 17
function conferma() {
    if (document.getElementById("esito").value < 18) {
        document.getElementById("conf").disabled = true;
    }
}

//genera grafico andamento esame
function generaGraficoDoc() {
    var array = [];
    var a = document.querySelectorAll("[id^='esiti']");
    a.forEach(function (element) {
        array.push(element.value);
    });

    // map is an associative array mapping the elements to their frequency:
    var map = array.reduce(function (prev, cur) {
        prev[cur] = (prev[cur] || 0) + 1;
        return prev;
    }, {});

    var data = JSON.stringify(map);
    data = data.replace(/,/gi, ' ');
    data = data.replace(/"/gi, '');
    data = data.replace(/:/gi, ' ');
    data = data.replace(/{/gi, '');
    data = data.replace(/}/gi, '');
    var arr = data.split(" ");
    var occorrenze = [];
    var voti = [];
    var dataP = [];
    for (var i = 0; i < arr.length; i++) {
        voti.push(arr[i]);
        i++;
        occorrenze.push(arr[i]);

    }
    for (var i = 0; i < voti.length; i++) {
        dataP.push({ "category": voti[i], "column-1": occorrenze[i] })
    }

    AmCharts.makeChart("chartdiv",
        {
            "type": "serial",
            "categoryField": "category",
            "startDuration": 1,
            "theme": "light",
            "categoryAxis": {
                "gridPosition": "start"
            },
            "trendLines": [],
            "graphs": [
                {
                    "balloonText": "[[category]]:[[column-1]]",
                    "fillAlphas": 1,
                    "id": "AmGraph-1",
                    "type": "column",
                    "valueField": "column-1"
                }
            ],
            "guides": [],
            "valueAxes": [
                {
                    "id": "ValueAxis-1",
                    "title": "Frequenza Voto"
                }
            ],
            "allLabels": [],
            "balloon": {},
            "legend": {
                "enabled": false,
                "useGraphSettings": true
            },
            "titles": [
                {
                    "id": "Title-1",
                    "size": 15,
                    "text": "Andamento Esame"
                }
            ],
            "dataProvider": dataP
        }
    );
}

//impostato il valore minimo/massimo per l'inserimento di una data
function controllaData() {
    var today = new Date();
    var maggioreEtà = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //Gennaio  = 0
    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }

    today = "" + yyyy + "-" + mm + "-" + dd;
    if (document.getElementById("myDate"))
        document.getElementById("myDate").min = today; //data appello
    if (document.getElementById("myDateM"))
        document.getElementById("myDateM").min = today; //data appello da modificare
    if (document.getElementById("myDateAdmin"))
        document.getElementById("myDateAdmin").max = today; //data cfu liberi

    maggioreEtà = "" + (yyyy - 18) + "-" + mm + "-" + dd;
    if (document.getElementById("dataDiNascita"))
        document.getElementById("dataDiNascita").max = maggioreEtà; //si possono iscrivere solo i maggiorenni
}