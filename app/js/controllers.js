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

    if(cookieStore.get('loggedin')){
        scope.id = cookieStore.get('id');
        scope.loggedin = true;
        scope.username = cookieStore.get('username');
    } else {
        scope.id = '';
        scope.loggedIn = false;
    }

    scope.getUsers = function() {
        http.get("ajax/getUsers.php", {params: {name: scope.username}})
        .success(function(query){
            var id = query[0].id;
            if(id > 0){
                scope.id = id;
                scope.loggedin = true;
                cookieStore.put('id', id);
                cookieStore.put('loggedin', true);
                cookieStore.put('username', scope.username);
            } else {
                scope.userMessage = "Invalid username: "+scope.username;
                // console.log(scope.user_name+": Invalid username");
                scope.username = "";
            }
        });
    };
    scope.logOut = function(){
           cookieStore.remove('id');
           cookieStore.remove('loggedin');
           cookieStore.remove('username');
           scope.id = "";
           scope.loggedin = false;
           scope.username = "";
           scope.data = {};
    };
}])
.controller('TasksCtrl', ['$scope', '$http', function(scope, http)  {
    scope.data = {};
    var days = 14;
    var today = getStartDate(new Date());

    // Watcher checks for changes in id to fires getTasks()
    // when user logs in.
    scope.$watch('id', function(newValue, oldValue) {
        if(newValue > 0) {
            getTasks();    
        }
    });

    function getTasks(){
        http.get("ajax/getTasks.php", {params: {id: scope.id}})
        .success(function(tasks){
            scope.data.tasks = tasks;
            createTasklist();
        });
    };

    function checkDates(tasks){
        // check tasks and return only list of those that fit in time 
        // period, else return nothing.
        var active = [];
        scope.tasksFound = false;
        var start = new Date().setDate(today.getDate());
        var end = new Date().setDate(today.getDate()+days);
        for (var j=0; j < tasks.length; j++){
            if(tasks[j].start_date*1000 <= end && (tasks[j].end_date*1000 >= start || tasks[j].end_date == null)){
                active.push(tasks[j]);
                scope.tasksFound = true;
            }
        }
        if(scope.tasksFound == false){
            return("Nothing found");
        }
        
        for(var i = 0; i < days; i++){
            console.log("hello");
        }
        return(active);
    }

    function createTasklist(){
        var tasks = scope.data.tasks;
        var actTasks = checkDates(tasks);


        scope.data.dates = []; // Clear dates array
        // populate with dates
        for(var i = 0; i < days; i++) {
            var day = {};
            day.date = new Date().setDate(today.getDate() + i);
            day.listOfTasks = [];
            for(var j = 0; j < actTasks.length; j++){
                // console.log(j);
                var task = actTasks[j];
                var start = task['start_date']*1000;
                var end = task['end_date']*1000;
                var taskInfo = {};
                taskInfo.name = task.task;
                // console.log(task.task);
                // if(start <= day.date &&(end == null || end >= day.date)){
                //     var taskInfo = {};
                //     taskInfo.name = task.task;
                //     taskInfo.status = 0;
                // }
                day.listOfTasks.push(taskInfo);
                // console.log(day.dailyTasks);
            }
            scope.data.dates.push(day);
        }
        // console.log(scope.data.dates);
    };

    scope.isMon = function(date){
        var date = new Date(date);
        if(date.getUTCDay() == 1){
            return true;
        } else {
            return false;
        }
    };
}])
;