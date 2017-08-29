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
    $scope.IsVisible1 = false;
    $scope.activityC = 'Gestisci';
    $scope.ShowHide1 = function () {
        //If DIV is visible it will be hidden and vice versa.
        $scope.IsVisible1 = $scope.IsVisible1 ? false : true;
        if ($scope.IsVisible1 == false)
            $scope.activityC = 'Gestisci';
        else
            $scope.activityC = 'Nascondi';
    }
    $scope.IsVisible2 = false;
    $scope.activityD = 'Gestisci';
    $scope.ShowHide2 = function () {
        //If DIV is visible it will be hidden and vice versa.
        $scope.IsVisible2 = $scope.IsVisible2 ? false : true;
        if ($scope.IsVisible2 == false)
            $scope.activityD = 'Gestisci';
        else
            $scope.activityD = 'Nascondi';
    }
});
var appD1 = angular.module("appDocente", []);
appD1.controller('controllerDocente', function ($scope) {
    $scope.IsVisible1 = false;
    $scope.activityA = 'Gestisci';
    $scope.ShowHide3 = function () {
        //If DIV is visible it will be hidden and vice versa.
        $scope.IsVisible1 = $scope.IsVisible1 ? false : true;
        if ($scope.IsVisible1 == false)
            $scope.activityA = 'Gestisci';
        else
            $scope.activityA = 'Nascondi';
    }
    $scope.IsVisible2 = false;
    $scope.activityB = 'Gestisci';
    $scope.ShowHide4 = function () {
        //If DIV is visible it will be hidden and vice versa.
        $scope.IsVisible2 = $scope.IsVisible2 ? false : true;
        if ($scope.IsVisible2 == false)
            $scope.activityB = 'Gestisci';
        else
            $scope.activityB = 'Nascondi';
    }
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
        arrayVoti.push(i);
    }
    $scope.voti = arrayVoti;
});

var appS = angular.module("appStudente", []);
appS.controller('controllerStudente', function ($scope) {
    $scope.codCorso = '';
    $scope.Cliccami = function (id) {
        $scope.codCorso = id;
    }
});