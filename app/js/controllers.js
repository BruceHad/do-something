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
        var days = 14;
        var today = getStartDate(new Date());

        getTasks();
        function getTasks(){
            $http.get("ajax/getTasks.php").success(function(tasks){
                // console.log(tasks);
                createTasklist(tasks);
            });
        };

        function createTasklist(tasks){
            // console.log(tasks);
            $scope.data.dates = []; // Clear dates array
            for(var i = 0; i < days; i++) {
                var day = {};
                var thisDay = new Date(today.getTime())
                day.date = thisDay.setDate(thisDay.getDate() + i);
                day.dailyTasks = [];
                for (var j=0; j < tasks.length; j++){
                    if(tasks[j].start_date <= day.date
                    && (tasks[j].end_date >= day.date
                        || tasks[j].end_date == null)){
                        var task = {};
                        task.name = tasks[j].name;
                        task.status = 0;
                        task.start_date = tasks[j].start_date;
                        if(tasks[j].end_date != null){
                            task.end_date = tasks[j].end_date;
                        }
                        day.dailyTasks.push(task);
                    }
                }
                $scope.data.dates.push(day);
            }
            console.log($scope.data.dates);
        };

        $scope.methods.isMon = function(date){
            var date = new Date(date);
            if(date.getUTCDay() == 1){
                return true;
            } else {
                return false;
            }
        };
    }])
    .controller('MyCtrl2', ['$scope', function($scope) {
        $scope.data = {};
        $scope.data.view = "view 2";
    }])
;