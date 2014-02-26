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

angular.module('myApp.controllers', []).
controller('MyCtrl1', ['$scope', '$http', function($scope, $http) {
    // Instantiate an object to store your scope data in (Best Practices)
    $scope.data = {};
    $scope.methods = {};
    $scope.data.name = "Do Something";
    var days = 7;
    var today = getStartDate(new Date());

    getTasks();
    update();
    function getTasks(){
        $http.get("ajax/getTask.php").success(function(data){
            // $scope.data.tasks = data;
            // console.log($scope.data.tasks);
            update(data);
        });
    };

    function update(){
        // var tasks = $scope.data.tasks;
        console.log(data);
        // $scope.dates = []; // Clear dates array
        // var thisDay = new Date(today.getTime());
        // for(var i = 0; i < days; i++) {
        //     var day = {};
        //     day.date = thisDay.setDate(thisDay.getDate() + i);
        //     day.dailyTasks = [];
        // }
    };

}])
;