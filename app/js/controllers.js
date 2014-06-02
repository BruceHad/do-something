'use strict';

// Array.prototype.remove = function(from, to) {
//     var rest = this.slice((to || from) + 1 || this.length);
//     this.length = from < 0 ? this.length + from : from;
//     return this.push.apply(this, rest);
// };

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
                $scope.user_message = "Invalid user name: "+$scope.main.user_name;
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
    // $scope.data.form_data = {};
    // $scope.data.tasks_found = false;
    // $scope.data.adding_task = true;
    var days = 14;
    var today = getStartDate(new Date());

    // Watcher checks for changes in id to fires getTasks()
    // when user logs in.
    $scope.$watch('main.user_id', function(newvalue, oldvalue) {
        if(newvalue > 0 && newvalue != oldvalue) {getTasks();}
    });
    $scope.$watch('data.tasks', function(newvalue, oldvalue){
        console.log(newvalue);
        console.log($scope.data.tasks);
        // if(newvalue != oldvalue){
        //     // buildTaskList;
        // }
    }, false);

    function getTasks(){
        // 1. Grab tasks done.
        var par = {id: $scope.main.user_id};
        // console.log(par);
        $http.get("ajax/getTaskDates.php", {params: par}).success(function(response){
            // console.log(response);
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
                console.log($scope.data.tasks);
            }
        });
    };

    function buildTaskList(){
        // Populate days object for current time period.
        // day => date => tasksList => task done
        var tasks = $scope.data.tasks;
        var task_list = {};        
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
                        done: isTaskDone(tasks[j].id, now),
                        start_date: tasks[j].start_date,
                        end_date: tasks[j].end_date,
                        id: tasks[j].id
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

    // function addTask(){
    //     var name = $scope.data.add.taskName;
    //     var start_date = $scope.data.add.startDate;
    //     var end_date = $scope.data.add.endDate;
    //     console.log(name, start_date, end_date, $scope.main.id);
    //     // $http.get("ajax/addTask.php?task="+name+
    //     //     "&start_date="+start_date+
    //     //     "&end_date="+end_date+
    //     //     "&user_id="+$scope.main.id).success(function(data){
    //     //    console.log(data);
    //     // });
    //     $scope.data.add = {};
    //     $scope.data.addingTask = false;
    // }

    // function addTaskDate(task_id, date) {
    //     $http.get("ajax/addTaskDate.php?task_id="+task_id+"&date="+date).success(function(data){
    //        console.log(data);
    //    });
    // };

    // function delTaskDate(task_id, date) {
    //     $http.get("ajax/delTaskDate.php?task_id="+task_id+"&date="+date).success(function(data){
    //        console.log(data);
    //    });
    // };

    // // function getTaskDone(id, dateStr){
    // //     var taskDates = $scope.data.tasks_done; //Completed tasks.
    // //     for(var i in taskDates){
    // //         if(taskDates[i].task_id == id && taskDates[i].date_complete == dateStr){
    // //             return i;
    // //         }
    // //     }
    // // }

    

    // function isTaskDone(id, date){
    //     var dateStr = padStr(date.getFullYear()) + '-' +
    //               padStr(1 + date.getMonth()) + '-' +
    //               padStr(date.getDate());
    //     var taskDates = $scope.data.tasks_done; //Completed tasks.
    //     for(var i in taskDates){
    //         if(taskDates[i].task_id == id && taskDates[i].date_complete == dateStr){
    //             return i;
    //         }
    //     }
    //     return false;
    // };

    

    // $scope.isMon = function(date){
    //     var date = parseInt(date);
    //     var day = new Date(date);
    //     if(day.getUTCDay() == 1){
    //         return true;
    //     } else {
    //         return false;
    //     }
    // };
    // $scope.taskDone = function(task_id, date, isDone) {
    //     var date = new Date(parseInt(date));
    //     var dateStr = padStr(date.getFullYear()) + '-' +
    //               padStr(1 + date.getMonth()) + '-' +
    //               padStr(date.getDate());
    //     var tasksDone = $scope.data.tasks_done;
        
    //     if(isDone) {
    //         // console.log(tasksDone);
    //         tasksDone.push({
    //             date_complete: dateStr,
    //             task_id: task_id
    //         });
    //         addTaskDate(task_id, dateStr);
    //     } else {
    //         var id = isTaskDone(task_id, date);
    //         // console.log(id);
    //         // console.log(tasksDone[id]);
    //         delTaskDate(task_id, dateStr);
    //         delete tasksDone[id];
            
    //     }
    //     buildTaskList();
    // };
    // $scope.addTask = function(form) {
    //     var success = false;
    //     var valid = false;
    //     // validate
    //     console.log($scope.data.formData);
    //     $http.get("ajax/addTask.php", {$scope.data.formData)
    //     .success(function(tasks){
    //             $scope.clearForm(form);
    //         }
    //     };

    // $scope.clearForm = function(form){
    //     $scope.data.formData = {};
    //     form.$setPristine();
    // };
}]);