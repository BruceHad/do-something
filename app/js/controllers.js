'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('MyCtrl1', ['$scope', function($scope) {
    // Instantiate an object to store your scope data in (Best Practices)
    $scope.data = {};
    $scope.data.name = "Hello World";
  }])
  // .controller('MyCtrl2', [function() {

  // }])
;