'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('MyCtrl1', ['$scope', 'MyApi', function($scope, MyApi) {
    // Instantiate an object to store your scope data in (Best Practices)
    $scope.data = {};
    $scope.data.name = "Hello World";
    MyApi.query(function(response) {
      // Assign the response INSIDE the callback
      $scope.data.issues = response;
      console.log($scope.data.issues);
    });
  }])
;