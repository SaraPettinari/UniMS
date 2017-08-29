function confermaPrenotazione() {
    confirm('Vuoi confermare la prenotazione?');
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
    array.forEach(function (element) {
        var i = 0;
        dataP.push({ "date": element, "column-1": arrayEsito[i] });
    });

    // <!-- amCharts javascript code -->

    AmCharts.makeChart("chartdiv",
        {
            "type": "serial",
            "categoryField": "date",
            "dataDateFormat": "YYYY-MM-DD",
            "theme": "light",
            "categoryAxis": {
                "parseDates": true
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
                },
                {
                    "bullet": "square",
                    "id": "AmGraph-2",
                    "title": "graph 2",
                    "valueField": "column-2"
                }
            ],
            "guides": [],
            "valueAxes": [
                {
                    "id": "ValueAxis-1",
                    "title": "Axis title"
                }
            ],
            "allLabels": [],
            "balloon": {},
            "legend": {
                "enabled": true,
                "useGraphSettings": true
            },
            "titles": [
                {
                    "id": "Title-1",
                    "size": 15,
                    "text": "Chart Title"
                }
            ],
            "dataProvider": dataP
        }
    );

}