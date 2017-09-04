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
    $scope.IsVisible3 = false;
    $scope.activityA = 'Gestisci';
    $scope.ShowHide3 = function () {
        //If DIV is visible it will be hidden and vice versa.
        $scope.IsVisible3 = $scope.IsVisible3 ? false : true;
        if ($scope.IsVisible3 == false)
            $scope.activityA = 'Gestisci';
        else
            $scope.activityA = 'Nascondi';
    }
    $scope.IsVisible4 = false;
    $scope.activityA = 'Vedi';
    $scope.ShowHide4 = function () {
        //If DIV is visible it will be hidden and vice versa.
        $scope.IsVisible4 = $scope.IsVisible4 ? false : true;
        if ($scope.IsVisible4 == false)
            $scope.activityA = 'Vedi';
        else
            $scope.activityA = 'Nascondi';
       
       
    }

});

var appS = angular.module("appStudente", []);
appS.controller('controllerStudente', function ($scope) {
    $scope.codCorso = '';
    $scope.Cliccami = function (id) {
        $scope.codCorso = id;
    }
    $scope.IsVisible1 = false;
    $scope.activityA = 'Gestisci';
    $scope.ShowHide1 = function () {
        //If DIV is visible it will be hidden and vice versa.
        $scope.IsVisible1= $scope.IsVisible1 ? false : true;
        if ($scope.IsVisible1 == false)
            $scope.activityA = 'Gestisci';
        else
            $scope.activityA = 'Nascondi';
       
       
    }
});