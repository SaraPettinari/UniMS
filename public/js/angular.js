var app = angular.module("appRegistrazione", []);
app.controller('controllerRegistrazione', function ($scope) {
    $scope.username;
    $scope.generaUsername = function () {
        $scope.username = $scope.nome.toLowerCase() + '.' + $scope.cognome.toLowerCase();
    }
});

var appH = angular.module("appHome", []);
appH.controller('controllerHome', function ($scope) {
    $scope.roles = ['Studente', 'Amministratore', 'Docente'];
});

var appA = angular.module("appAdmin", []);
appA.controller('controllerAdmin', function ($scope) {
});


var appD = angular.module("appDocente", []);
appD.controller('controllerDocente', function ($scope) {
    $scope.idAppello = '';
    $scope.cliccami = function (id) {
        $scope.idAppello = id;
    }
    $scope.idAppelloE = '';
    $scope.cliccamiE = function (id) {
        $scope.idAppelloE = id;
    }
    var arrayVoti = [];
    for (var i = 0; i < 32; i++) {
        arrayVoti.push({nome: i, value: i});
    }
    arrayVoti[31].nome = '30 L';
    $scope.voti = arrayVoti;
});

var appS = angular.module("appStudente", []);
appS.controller('controllerStudente', function ($scope) {
    $scope.codCorso = '';
    $scope.Cliccami = function (id) {
        $scope.codCorso = id;
    }
});