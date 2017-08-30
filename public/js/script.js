function confermaPrenotazione() {
    confirm('Vuoi confermare la prenotazione?');
}
function cancellaPrenotazione(){
    confirm('Vuoi cancellare la prenotazione?');
}

function creaArrayVoti() {
    var array = [];
    var a = document.querySelectorAll("[id^='voto']");
    a.forEach(function (element) {
        array.push(element.value);
    });
    document.getElementById('arrayVoti').value = array;
}

function generaGrafico() {
    var array = [];
    var a = document.querySelectorAll("[id^='data']");
    a.forEach(function (element) {
        array.push(element.value);
    });

    var arrayEsito = [];
    var e = document.querySelectorAll("[id^='esito']");
    e.forEach(function (element) {
        arrayEsito.push(element.value);
    });

    var dataP = [];
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

function generaPdf(){
    var doc = new jsPDF();
    doc.fromHTML($('#tabellaEsiti').html(), 15, 15, {
        'width': 170,
            'elementHandlers': {}
    });
    doc.save('esitiAppello.pdf');
}