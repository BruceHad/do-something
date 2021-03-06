'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'ngCookies',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
])
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/main', {
        templateUrl: 'partials/partial1.html', 
        controller: 'TasksCtrl'});
    $routeProvider.when('/about', {
        templateUrl: 'partials/partial2.html', 
        controller: 'MyCtrl2'});
    $routeProvider.otherwise({
        redirectTo: '/main'
    });
}])
;
