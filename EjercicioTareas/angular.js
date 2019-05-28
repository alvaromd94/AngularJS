var app = angular.module('myApp', []);
app.controller('myCtrl', function ($scope, $filter) {

    $scope.listaTareas = [{
        "autor": "John",
        "desc": "Limpieza del cuarto de baño",
        "fecha": "28/05/2019",
        "check": false
    },
    {
        "autor": "Lucía",
        "desc": "Sacar a los perros a pasear",
        "fecha": "26/05/2019",
        "check": true
    }];

    // Por defecto, la vista de edicion
    // inhabilitada
    $scope.noEditable = true
    $scope.modo;

    $scope.addTarea = function () {
        $scope.noEditable=false
        $scope.modo="crear"
    }
    $scope.deleteTarea = function (index) {
        $scope.listaTareas.splice(index, 1)
    }

    $scope.editTarea = function (index) {
        $scope.noEditable=false
        $scope.modo="editar"
    }
    
    $scope.Cancelar = function (index) {
        $scope.noEditable=true   
        $scope.modelAutor = ""
        $scope.modelDescripcion = ""
        $scope.modelFecha = ""
        $scope.modelCheck = ""
    }

    $scope.save = function (index) {
        if($scope.modo=="crear"){
            $scope.fechaValor = $filter('date')($scope.modelFecha, "dd/MM/yyyy");
            $scope.listaTareas.push({
                "autor": $scope.modelAutor,
                "desc": $scope.modelDescripcion,
                "fecha": $scope.fechaValor,
                "check": $scope.modelCheck
            })
        }
        else{
           
        }
        $scope.noEditable=true   
        $scope.modelAutor = ""
        $scope.modelDescripcion = ""
        $scope.modelFecha = ""
        $scope.modelCheck = ""
    }
});