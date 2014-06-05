'use strict';

// Array.prototype.remove = function(from, to) {
//     var rest = this.slice((to || from) + 1 || this.length);
//     this.length = from < 0 ? this.length + from : from;
//     return this.push.apply(this, rest);
// };

Date.prototype.addDays = function(days)
{
    var dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + days);
    return dat;
}

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


angular.module('myApp.controllers', [])
.controller('MyCtrl', ['$scope', '$http',  '$cookieStore', function($scope, $http, $cookieStore) {
    $scope.main = {};
    $scope.main.loggedin = false;
    $scope.main.form_data = {};

    // Check cookies to see if user is logged in.
    if($cookieStore.get('loggedin')){
        $scope.main.loggedin = true;
        $scope.main.user_id = $cookieStore.get('user_id');
        $scope.main.user_name = $cookieStore.get('user_name');
    }
    
    $scope.login = function() {
        $scope.main.user_message = "";
        // Check username against database then logs user in and
        // assign user id.
        var par = {name: $scope.main.form_data.user_name};
        $http.get("ajax/getUsers.php", {params: par}).success(function(response){
            if(response.length == 1){
                $scope.main.user_id =  response[0].id;
                $scope.main.user_name = $scope.main.form_data.user_name;
                $scope.main.loggedin = true;
                $cookieStore.put('loggedin', true);
                $cookieStore.put('user_id',  response[0].id);
                $cookieStore.put('user_name', $scope.main.user_name);
            } else {
                $scope.main.user_message = "Invalid user name: " + $scope.main.form_data.user_name;
            }
            $scope.main.form_data = {};
        });
    };
    $scope.logout = function(){
        // remove all login details and clear
        // data.
        $cookieStore.remove('loggedin');
        $cookieStore.remove('user_id');
        $cookieStore.remove('user_name');
        $scope.main = {};
        $scope.main.form_data = {};
        $scope.main.loggedin = false;
        $scope.data = {};
    };
}])
.controller('TasksCtrl', ['$scope', '$http', function($scope, $http)  {
    $scope.data = {};
    $scope.data.form_data = {};
    var days = 14;
    $scope.data.start_date = getStartDate(new Date());
    $scope.data.end_date = $scope.data.start_date.addDays(days);
    getTasks();

    // Watcher checks for changes in id to fires getTasks()
    // when user logs in.
    $scope.$watch('main.user_id', function(newvalue, oldvalue) {
        if(newvalue > 0 && newvalue != oldvalue) getTasks();
    });
    $scope.$watchCollection('data.tasks', function(newvalue, oldvalue){
        if(newvalue != oldvalue){
            console.log($scope.data.tasks);
            console.log($scope.data.tasks_done);
            console.log(! ($scope.data.tasks == undefined || $scope.data.tasks_done == undefined));
            if(! ($scope.data.tasks == undefined || $scope.data.tasks_done == undefined)){
                buildTaskList();
            }
        }
    });
    $scope.$watchCollection('data.tasks_done', function(newvalue, oldvalue){
        if(newvalue != oldvalue){
            console.log($scope.data.tasks);
            console.log($scope.data.tasks_done);
            console.log(! ($scope.data.tasks == undefined || $scope.data.tasks_done == undefined));
            if (! ($scope.data.tasks == undefined || $scope.data.tasks_done == undefined)){
                buildTaskList();
            }
        }
    });
    $scope.addTask = function(form) {
        // Also used to Edit task if task_id is set
        var valid = false;
        // validate
        $scope.data.form_data.user_id = $scope.main.user_id;
        var par = $scope.data.form_data;  
        console.log(par);
        $http.get("ajax/addTask.php", {params: par}).success(function(response){
            getTasks();          
            $scope.clearForm(form);
            console.log(response);
        });                                                    
    };
    $scope.deleteTask = function(id){
        $http.get("ajax/deleteTask.php", {params: {task_id: id}}).success(function(response){
            getTasks();
            console.log(response);
        }); 
    };
    $scope.editTask = function(task){ 
        $scope.data.form_data = {
            start_date: task.start_date,
            end_date: task.end_date,
            task_id:task.task_id,
            task_name: task.task_name
        };
    };
    $scope.toggleTask = function(task_id, date, done) {
        var date = new Date(parseInt(date));
        var date_str = padStr(date.getFullYear()) + '-' +
                  padStr(1 + date.getMonth()) + '-' +
                  padStr(date.getDate());
        console.log(date_str);
        var par = {"task_id": task_id, "task_date": date_str}
        if(done) {
            $http.get("ajax/addTaskDate.php", {params: par}).success(function(response){
               console.log(response);
            });
            $scope.data.tasks_done.push({
                date_complete: date_str,
                task_id: task_id
            });
        }
        else {
            var id = isTaskDone(task_id, date);
            $http.get("ajax/delTaskDate.php",{params: par}).success(function(response){
                console.log(response);
            });
            delete $scope.data.tasks_done[id];
        }
    };
    $scope.changeDate = function(days){
        $scope.data.start_date = $scope.data.start_date.addDays(days);
        $scope.data.end_date = $scope.data.end_date.addDays(days);
        getTasks();
    };
    $scope.isMon = function(date){
        var date = parseInt(date);
        var day = new Date(date);
        return (day.getUTCDay() == 0) ? true: false;
    };
    $scope.clearForm = function(form){
        $scope.data.form_data = {};
        form.$setPristine();
    };
    function getTasks(){
        // 1. Grab tasks done.
        var par = {id: $scope.main.user_id};
        $http.get("ajax/getTaskDates.php", {params: par}).success(function(response){
            if(response == 'null'){
                $scope.data.tasks_done = [];
            } else {
                $scope.data.tasks_done = response;
            }
        });
        // 2. Grab tasks.
        $http.get("ajax/getTasks.php", {params: par}).success(function(response){            
            if(response == 'null'){
                $scope.data.tasks = [];
            } else {
                $scope.data.tasks = response;
            }
        });
    };
    function buildTaskList(){
        // Populate days object for current time period.
        // day => date => tasksList => task done
        var tasks = $scope.data.tasks;
        var task_list = {};        
        for(var i = 0; i < days; i++) {
            var now = $scope.data.start_date.addDays(i);            
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
                        task_name: tasks[j].task_name,
                        done: isTaskDone(tasks[j].id, now) ? true : false,
                        start_date: tasks[j].start_date,
                        end_date: tasks[j].end_date,
                        task_id: tasks[j].id
                    };
                }
            }
            if(Object.keys(taskList).length > 0){
                task_list[now.getTime()] = taskList;
            }
        }
        if(Object.keys(task_list).length > 0){
            $scope.data.tasksFound = true;
            $scope.data.task_list = task_list;
        }
    };
    function isTaskDone(id, date){
        // Determines if a task is complete for a date
        // and if so, return the id of said task_date.
        var dateStr = padStr(date.getFullYear()) + '-' +
                  padStr(1 + date.getMonth()) + '-' +
                  padStr(date.getDate());
        var taskDates = $scope.data.tasks_done; //Completed tasks.
        for(var i in taskDates){
            if(taskDates[i].task_id == id && taskDates[i].date_complete == dateStr){
                return i;
            }
        }
        return false;
    };
}]);