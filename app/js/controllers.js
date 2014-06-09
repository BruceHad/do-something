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

function getStartDate(){
    // Return first monday of the current week
    // initially date is set to 'new Date()'
    var date = new Date(new Date().toJSON().slice(0,10));
    date.setHours(7);
    var day = date.getDay();
    date.setHours(0,0,0,0);
    date.setDate(date.getDate() - day+1);
    return date;
}

function padStr(i) {
    return (i < 10) ? "0" + i : "" + i;
}

function convertDate(date){
	//converts date object to str format yyyy-mm-dd
	return date.getFullYear()
		+'-'
		+padStr(date.getMonth()+1)
		+'-'
		+padStr(date.getDate()+1);
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
// 	$scope.data.building = true;
    var days = 14;
    $scope.data.start_date = getStartDate();
	$scope.data.form_data.start_date = convertDate($scope.data.start_date);
    $scope.data.end_date = $scope.data.start_date.addDays(days);
    getTasks();

    // Watcher checks for changes in id to fires getTasks()
    // when user logs in.
    $scope.$watch('main.user_id', function(newvalue, oldvalue) {
        if(newvalue > 0 && newvalue != oldvalue){
            getTasks();
            $scope.data.building = true;
        }
    });
    $scope.$watchCollection('data.tasks', function(newvalue, oldvalue){
        if(newvalue != oldvalue){
            if(! ($scope.data.tasks == undefined || $scope.data.tasks_done == undefined)){
                buildTaskList();
            }
        }
    });
    $scope.$watchCollection('data.tasks_done', function(newvalue, oldvalue){
        if(newvalue != oldvalue){
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
        $http.get("ajax/addTask.php", {params: par}).success(function(response){
            getTasks();          
            $scope.clearForm(form);
            $scope.data.form_data.start_date = convertDate($scope.data.start_date);
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
        var par = {"task_id": task_id, "task_date": date}
        if(! done) {
            $http.get("ajax/addTaskDate.php", {params: par}).success(function(response){
               console.log(response);
            });
            $scope.data.tasks_done.push({
                date_complete: date,
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
		$scope.data.building = true;
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
        $scope.data.building = true;
        var tasks = $scope.data.tasks;
        var task_list = {};
        for(var i = 0; i < days; i++) {
            var now = $scope.data.start_date.addDays(i);
            var now_str = convertDate(now);
            now.setHours(0,0,0,0);
            // Create tasks list
            var daily_tasks = [];
            for (var j=0; j < tasks.length; j++){
                var start = tasks[j].start_date;
                var end = (tasks[j].end_date != '0000-00-00') ? tasks[j].end_date : '9999-01-01';
                if(start <= now_str && end > now_str){
                    var task = {
                        task_name: tasks[j].task_name,
                        done: isTaskDone(tasks[j].id, now_str) ? true : false,
                        start_date: tasks[j].start_date,
                        end_date: tasks[j].end_date,
                        task_id: tasks[j].id
                    };
                    daily_tasks.push(task);
                }
            }
            task_list[now_str] = daily_tasks;
        }
        if(Object.keys(task_list).length > 0){
            $scope.data.task_list = task_list;
        }
		$scope.data.building = false;
    };
    function isTaskDone(id, date){
        // Determines if a task is complete for a date
        // and if so, return the id of said task_date.
        var taskDates = $scope.data.tasks_done; //Completed tasks.
        for(var i in taskDates){
            if(taskDates[i].task_id == id && taskDates[i].date_complete == date){
                return i;
            }
        }
        return false;
    };
}]);