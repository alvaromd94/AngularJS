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
        "desc": "Sacar los perros a pasear",
        "fecha": "26/05/2019",
        "check": true
    }];


    // Por defecto, la vista de edicion
    // inhabilitada
    $scope.modo;
    $scope.noEditable = true
    $scope.botonOff = false

    $scope.Add = function () {
        $scope.noEditable = false
        $scope.modo = "crear";
    }

    $scope.Delete = function (index) {
        $scope.listaTareas.splice(index, 1)
    }

    $scope.Cancelar = function () {
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
    $scope.Editar = function (index) {
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
    $scope.Save = function () {
        if ($scope.modo == "crear") {
            $scope.valueFechaGG = $filter('date')($scope.valueFecha, "dd/MM/yyyy");
            $scope.listaTareas.push({
                "autor": $scope.valueAutor,
                "desc": $scope.valueDesc,
                "fecha": $scope.valueFechaGG,
                "check": $scope.valueCheck
            })
            $("label:eq(2)").text("Fecha de la tarea")

        } else {

            // What else?
            var i = $scope.indiceEditar
            $scope.valueFechaGG = $filter('date')($scope.valueFecha, "dd/MM/yyyy");

            $scope.listaTareas[i].autor = $scope.valueAutor
            $scope.listaTareas[i].desc = $scope.valueDesc
            if ($scope.valueFecha == undefined
                || $scope.valueFechaGG == undefined
                || $scope.valueFechaGG == ""
                || $scope.valueFechaGG == null) {
                // Any What else?
            } else {
                $scope.listaTareas[i].fecha = $scope.valueFechaGG
            }
            $scope.listaTareas[i].check = $scope.valueCheck

            $scope.valueFechaGG = undefined
            $("label:eq(2)").text("Fecha de la tarea")

        }

        // Volvemos a deshabilitarlo
        $scope.noEditable = true
        $scope.valueAutor = ""
        $scope.valueDesc = ""
        $scope.valueFecha = ""
        $scope.valueCheck = ""
        $("td a").show()
        $("label:eq(2)").text("Fecha de la tarea")
        $scope.botonOff = false

        /* angular.forEach($scope.listaTareas, function (key, index) {
            console.log(key.autor)
            console.log(key.check)
            console.log(index)
            if (key.check == true) {
                $("tbody tr:eq(" + index + ")").css("background", "green")
                console.log(index)
            } else {
                $("tbody tr:eq(" + index + ")").css("background", "yellow")
            }
        }) */
    }




});