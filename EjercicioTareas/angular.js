var app = angular.module('myApp', ['ngStorage']);
app.controller('myCtrl', function ($scope, $filter, $localStorage) {

    //Si no existe el localStorage, lo creamos
    //y lo vinculamos al scope.listaTareas
    $scope.listaTareas = [];
    if (!$localStorage.listaTareas) {
        $localStorage.listaTareas = [];
    }
    $scope.listaTareas = $localStorage.listaTareas;

    // Por defecto, la vista de edicion
    // inhabilitada
    $scope.modo;
    $scope.noEditable = true
    $scope.botonOff = false

    $scope.add = function () {
        $scope.noEditable = false
        $scope.modo = "crear";
    }
    $scope.delete = function (index) {
        //Llamamos al localStorage y con el splice eliminamos la tarea correspondiente
        $localStorage.listaTareas.splice(index, 1)

        // $scope.listaTareas.splice(index, 1)
    }
    $scope.cancelar = function () {
        // Volvemos a deshabilitarlo
        $scope.noEditable = true
        // Borramos los campos
        $scope.valueAutor = ""
        $scope.valueDesc = ""
        $scope.valueFecha = ""
        $scope.valueCheck = ""
        $("label:eq(2)").text("Fecha de la tarea")
        $("td a").show()
        $scope.botonOff = false
    }
    $scope.editar = function (index) {
        $scope.noEditable = false
        $scope.modo = "editar";
        $scope.botonOff = true

        // Guardamos la fila a la que hacemos referencia
        // al editar
        $scope.indiceEditar = index
        var i = $scope.indiceEditar
        // Pasamos lo valores actuales a la vista de 
        // edicion
        $scope.valueAutor = $scope.listaTareas[i].autor
        $scope.valueDesc = $scope.listaTareas[i].desc
        //$scope.valueFecha = $scope.listaTareas[i].fecha
        $("label:eq(2)").text("Fecha original: " + $scope.listaTareas[i].fecha)
        $scope.valueCheck = $scope.listaTareas[i].check

        $("td a").hide()
    }
    $scope.save = function () {
        var error = false
        if ($scope.modo == "crear") {

            if ($scope.valueAutor == "" || $scope.valueAutor == undefined
                || $scope.valueDesc == "" || $scope.valueDesc == undefined
                || $scope.valueFecha == "" || $scope.valueFecha == undefined) {
                error = true
                alert("Faltan datos por rellenar")

            } else {

                $scope.valueFechaGG = $filter('date')($scope.valueFecha, "dd/MM/yyyy");
                !$scope.valueCheck ? $scope.valueCheck = false : $scope.valueCheck = true

                //Primero guardamos los valores en localStorage
                $localStorage.listaTareas.push({
                    "autor": $scope.valueAutor,
                    "desc": $scope.valueDesc,
                    "fecha": $scope.valueFechaGG,
                    "check": $scope.valueCheck
                })

                //Creamos una variable que va a guardar los valores del último registro
                // insertado del localStorage a la lista
                //var varUltRegistro = ($localStorage.listaTareas.length - 1)

                /* $scope.listaTareas.push({
                    "autor": $localStorage.listaTareas[varUltRegistro].autor,
                    "desc": $localStorage.listaTareas[varUltRegistro].desc,
                    "fecha": $localStorage.listaTareas[varUltRegistro].fecha,
                    "check": $localStorage.listaTareas[varUltRegistro].check
                }) */
                $("label:eq(2)").text("Fecha de la tarea")
            }
        } else {

            if ($scope.valueAutor == "" || $scope.valueAutor == undefined
                || $scope.valueDesc == "" || $scope.valueDesc == undefined
                || $scope.valueFecha == "" || $scope.valueFecha == undefined) {
                error = true
                alert("Faltan datos por rellenar")

            } else {

                var i = $scope.indiceEditar
                $scope.valueFechaGG = $filter('date')($scope.valueFecha, "dd/MM/yyyy");

                $localStorage.listaTareas[i].autor = $scope.valueAutor
                $localStorage.listaTareas[i].desc = $scope.valueDesc
                if ($scope.valueFecha == undefined
                    || $scope.valueFechaGG == undefined
                    || $scope.valueFechaGG == ""
                    || $scope.valueFechaGG == null) {

                } else {
                    $localStorage.listaTareas[i].fecha = $scope.valueFechaGG
                }
                $localStorage.listaTareas[i].check = $scope.valueCheck

                $scope.valueFechaGG = undefined

                /* $scope.listaTareas[i].autor = $localStorage.listaTareas[i].autor
                $scope.listaTareas[i].desc = $localStorage.listaTareas[i].desc
                $scope.listaTareas[i].fecha = $localStorage.listaTareas[i].fecha
                $scope.listaTareas[i].check = $localStorage.listaTareas[i].check */

                $("label:eq(2)").text("Fecha de la tarea")
            }
        }
        if (error == false) {

            // Volvemos a deshabilitarlo
            $scope.noEditable = true
            $scope.valueAutor = ""
            $scope.valueDesc = ""
            $scope.valueFecha = ""
            $scope.valueCheck = ""
            $("td a").show()
            $("label:eq(2)").text("Fecha de la tarea")
            $scope.botonOff = false
        }

    }
});