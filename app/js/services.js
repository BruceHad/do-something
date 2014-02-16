'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', ['ngResource'])
.factory('MyApi', function($resource){
    return $resource('./api/api.php', {})
})
.value('version', '0.1');
