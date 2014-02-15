'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('MyCtrl1', ['$scope', 'AngularIssues', function($scope, AngularIssues) {
    // Instantiate an object to store your scope data in (Best Practices)
    $scope.data = {};
   
    AngularIssues.get(function(response) {
      // Assign the response INSIDE the callback
      $scope.data.issues = response;
      console.log($scope.data.issues);
    });
  }])
  .controller('MyCtrl2', [function() {
  }]);