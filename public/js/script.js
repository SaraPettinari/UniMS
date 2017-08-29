function confermaPrenotazione(){
    confirm('Vuoi confermare la prenotazione?');
}

function creaArrayVoti(){
    var array = [];
    var a = document.querySelectorAll("[id^='voto']");
    a.forEach(function(element){
        array.push(element.value);
    });
    document.getElementById('arrayVoti').value = array;  
}