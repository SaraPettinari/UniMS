var app = angular.module("appRegistrazione", []);
app.controller('controllerRegistrazione', function ($scope) {
    $scope.username;
    $scope.generaUsername = function(){
        //Aggiungere controllo se lo username è già presente
        $scope.username = $scope.nome.toLowerCase() + '.' + $scope.cognome.toLowerCase();
    }
});