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

var appD = angular.module("appDocente", []);
appD.controller('controllerDocente', function ($scope) {

});