'use strict';

Array.prototype.remove = function(from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};

function getStartDate(d){
    // Return first monday of the current week
    var day = d.getDay();
    d.setDate(d.getDate() - day+1);
    return d;
}

/* Controllers */

angular.module('myApp.controllers', [])
    .controller('MyCtrl', ['$scope', function($scope) {
        $scope.data = {};
        $scope.data.name = "Do Something";
    }])
    .controller('MyCtrl1', ['$scope', '$http', function($scope, $http)  {
        // Instantiate an object to store your scope data in (Best Practices)
        $scope.data = {};
        $scope.methods = {};
        $scope.data.name = "Do Something Every Day";
        var days = 7;
        var today = getStartDate(new Date());

        getTasks();
        function getTasks(){
            $http.get("ajax/getTasks.php").success(function(tasks){
                // console.log(tasks);
                update(tasks);
            });
        };

         function update(tasks){
            // var tasks = $scope.data.tasks;
            console.log(tasks);
        };
    }])
    .controller('MyCtrl2', ['$scope', function($scope) {
        $scope.data = {};
        $scope.data.view = "view 2";
    }])
;