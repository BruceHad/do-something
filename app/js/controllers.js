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
    scope.data.tasksFound = false;
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
        // Grab data from database: all tasks and taskDates for 
        // user.
        http.get("ajax/getTaskDates.php", {params: {id: scope.id}})
        .success(function(taskDates){
            scope.data.taskDates = taskDates;
        });
        // 2. Get task and add to $scope.
        http.get("ajax/getTasks.php", {params: {id: scope.id}})
        .success(function(tasks){
            scope.data.tasks = tasks;
            //3. Once complete build the tasklist
            getDailyTasks();
        });
    };

    function getTasksDone(id, date){
        var taskDates = scope.data.taskDates; //Completed tasks.
        for(var taskDate in taskDates){
        //     if(taskDate = date){
        //         return 1;
        //     }
        }
        return 0;
    };

    function getDailyTasks(){
        // Populate days object for current time period.
        // day => date => tasksList => task done
        var tasks = scope.data.tasks;
        var dateList = {};        
        for(var i = 0; i < days; i++) {
            var now = new Date().setDate(today.getDate() + i);
            // Create tasks list
            var taskList = [];
            for (var j=0; j < tasks.length; j++){
                var start = tasks[j].start_date;
                var end = tasks[j].end_date;
                if(start <= now && (end == null || end > now)){
                    taskList[j] = {
                        name: tasks[j].task,
                        status: getTasksDone(tasks[j].id, now),
                        start_date: tasks[j].start_date,
                        end_date: tasks[j].end_date
                    };
                }
            }
            if(Object.keys(taskList).length > 0){
                dateList[now] = taskList;
            }
        }
        if(Object.keys(dateList).length > 0){
            scope.data.tasksFound = true;
            scope.data.days = dateList;
        }
        console.log(dateList);
    };

    scope.isMon = function(date){
        var date = parseInt(date);
        var day = new Date(date);
        if(day.getUTCDay() == 1){
            return true;
        } else {
            return false;
        }
    };
}])
;