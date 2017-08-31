function confermaPrenotazione() {
    confirm('Vuoi confermare la prenotazione?');
}
function cancellaPrenotazione() {
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

function generaPdf() {
    var doc = new jsPDF();
    doc.fromHTML($('#tableId').html(), 20, 20);
    doc.save('esitiAppello.pdf');
}

function conferma() {
    if (document.getElementById("esito").value < 18) {
        document.getElementById("conf").disabled = true;
    }
}

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
    for(var i = 0; i < arr.length; i ++){
        voti.push(arr[i]);
        i++;
        occorrenze.push(arr[i]);

    }
    for(var i = 0; i < voti.length; i++){
        dataP.push({"category": voti[i], "column-1": occorrenze[i]})
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

function controllaData(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    
    if(dd<10) {
        dd = '0'+dd
    } 
    
    if(mm<10) {
        mm = '0'+mm
    } 
    
    today = "" + yyyy + "-" + mm + "-" + dd;
    document.getElementById("myDate").min = today;
}