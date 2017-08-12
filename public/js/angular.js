var app = angular.module("appRegistrazione", []);
app.controller('controllerRegistrazione', function ($scope) {
    $scope.username;
    $scope.generaUsername = function(){
        $scope.username = $scope.nome.toLowerCase() + '.' + $scope.cognome.toLowerCase();
    }
});

var appH = angular.module("appHome", []);
appH.controller('controllerHome', function($scope){
    $scope.roles = ['Studente', 'Amministratore', 'Docente'];
});