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
    .controller('MyCtrl', ['$scope', '$http',  '$cookieStore', function(scope, http, cookieStore) {
        scope.name = "Do Something";
        scope.username = "";
        if(cookieStore.get('id') > 0){scope.id = cookieStore.get('id');}
        else {scope.id = '';}

        scope.getUsers = function() {
            http.get("ajax/getUsers.php", {params: {name: scope.username}})
            .success(function(query){
                var id = query[0].id;
                if(id > 0){
                    scope.id = id;
                    cookieStore.put('id', id);
                } else {
                    scope.userMessage = "Invalid username: "+scope.username;
                    console.log(scope.user_name+": Invalid username");
                    scope.username = "";
                }
            });
        };
        scope.logOut = function(){
               cookieStore.put('id', '');
               scope.username = "";
               scope.id = '';
        };
    }])
    // .controller('MyCtrl1', ['$scope', '$http', function($scope, $http)  {
    //     // Instantiate an object to store your scope data in (Best Practices)
    //     $scope.data2 = {};
    //     $scope.methods2 = {};
    //     $scope.data2.name = "Do Something Every Day";
    //     var days = 14;
    //     var today = getStartDate(new Date());

    //     getTasks();
    //     function getTasks(){
    //         $http.get("ajax/getTasks.php").success(function(tasks){
    //             createTasklist(tasks);
    //         });
    //     };

    //     function createTasklist(tasks){
    //         $scope.data2.dates = []; // Clear dates array
    //         for(var i = 0; i < days; i++) {
    //             var day = {};
    //             var thisDay = new Date(today.getTime())
    //             day.date = thisDay.setDate(thisDay.getDate() + i);
    //             day.dailyTasks = [];
    //             for (var j=0; j < tasks.length; j++){
    //                 // console.log(tasks[j]);
    //                 var task = {};
    //                 task.name = tasks[j].task;
    //                 task.status = 0;
    //                 task.start_date = tasks[j].start_date;
    //                 task.end_date = tasks[j].end_date;
    //                 day.dailyTasks.push(task);
    //             }
    //             $scope.data2.dates.push(day);
    //         }
    //         // console.log($scope.data.dates);
    //     };

    //     $scope.methods2.isMon = function(date){
    //         var date = new Date(date);
    //         if(date.getUTCDay() == 1){
    //             return true;
    //         } else {
    //             return false;
    //         }
    //     };
    // }])
;