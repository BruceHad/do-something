'use strict';

Array.prototype.remove = function(from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};

function getStartDate(date){
    // Return first monday of the current week
    // initially date is set to 'new Date()'
    var day = date.getDay();
    date.setHours(0,0,0,0);
    date.setDate(date.getDate() - day+1);
    return date;
}

function padStr(i) {
    return (i < 10) ? "0" + i : "" + i;
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
        var dateStr = padStr(date.getFullYear()) + '-' +
                  padStr(1 + date.getMonth()) + '-' +
                  padStr(date.getDate());
        var taskDates = scope.data.taskDates; //Completed tasks.
        for(var i=0; i < taskDates.length; i++){
            if(taskDates[i].task_id == id && taskDates[i].date_complete == dateStr){
                return true;
            }
        }
        return false;
    };

    function getDailyTasks(){
        // Populate days object for current time period.
        // day => date => tasksList => task done
        var tasks = scope.data.tasks;
        var dateList = {};        
        for(var i = 0; i < days; i++) {
            var now = new Date();
            now.setDate(today.getDate()+i);
            now.setHours(0,0,0,0);
            // Create tasks list
            var taskList = [];
            for (var j=0; j < tasks.length; j++){
                var start = new Date(tasks[j].start_date);
                if(tasks[j].end_date != null){
                    var end = new Date(tasks[j].end_date);
                } else {
                    var end = new Date('9999-01-01');
                }
                if(start <= now && end > now){
                    taskList[j] = {
                        name: tasks[j].task,
                        done: getTasksDone(tasks[j].id, now),
                        start_date: tasks[j].start_date,
                        end_date: tasks[j].end_date,
                        id: tasks[j].id
                    };
                }
            }
            if(Object.keys(taskList).length > 0){
                dateList[now.getTime()] = taskList;
            }
        }
        if(Object.keys(dateList).length > 0){
            scope.data.tasksFound = true;
            scope.data.days = dateList;
        }
    };

    function getId(obj, search){

    }

    scope.isMon = function(date){
        var date = parseInt(date);
        var day = new Date(date);
        if(day.getUTCDay() == 1){
            return true;
        } else {
            return false;
        }
    };
    scope.taskDone = function(id, date, isDone) {
        var date = new Date(parseInt(date));
        var dateStr = padStr(date.getFullYear()) + '-' +
                  padStr(1 + date.getMonth()) + '-' +
                  padStr(date.getDate());
        var tasksDone = scope.data.taskDates;
        
        if(isDone) {
            tasksDone.push({
                date_complete: dateStr,
                task_id: id
            });
        } else {
        //     var i = tasksDone[id].indexOf(date);
        //     tasksDone[id].splice(i, 1);
        }
        // update("doneTask");
        console.log(tasksDone);
    };
}])
;