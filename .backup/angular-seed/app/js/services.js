'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', ['ngResource'])
  .factory('AngularIssues', function($resource){
    return $resource('http://localhost/do-something/angular-seed/app/api.php', {})
  })
  .value('version', '0.1');
