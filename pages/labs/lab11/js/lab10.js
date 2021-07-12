//Create an angular controller with ngAnimate as a dependency
angular.module('lab10', ['ngAnimate'])
//Default the checkbox to false.
.controller("theController", function($scope) {
    $scope.circleClass = false;
});