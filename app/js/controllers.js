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
    scope.data.formData = {};
    scope.data.tasksFound = false;
    scope.data.addingTask = true;
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
            // console.log(taskDates);
            if(taskDates == 'null'){
                scope.data.taskDates = [];
            } else {
                scope.data.taskDates = taskDates;
            }
        });
        // 2. Get task and add to $scope.
        http.get("ajax/getTasks.php", {params: {id: scope.id}})
        .success(function(tasks){
            if(tasks == 'null'){
                scope.data.tasks = [];
            } else {
                scope.data.tasks = tasks;
                //3. Once complete build the tasklist
                getDailyTasks();
            }
        });
    };

    function addTask(){
        var name = scope.data.add.taskName;
        var start_date = scope.data.add.startDate;
        var end_date = scope.data.add.endDate;
        console.log(name, start_date, end_date, scope.id);
        // http.get("ajax/addTask.php?task="+name+
        //     "&start_date="+start_date+
        //     "&end_date="+end_date+
        //     "&user_id="+scope.id).success(function(data){
        //    console.log(data);
        // });
        scope.data.add = {};
        scope.data.addingTask = false;
    }

    function addTaskDate(task_id, date) {
        http.get("ajax/addTaskDate.php?task_id="+task_id+"&date="+date).success(function(data){
           console.log(data);
       });
    };

    function delTaskDate(task_id, date) {
        http.get("ajax/delTaskDate.php?task_id="+task_id+"&date="+date).success(function(data){
           console.log(data);
       });
    };

    // function getTaskDone(id, dateStr){
    //     var taskDates = scope.data.taskDates; //Completed tasks.
    //     for(var i in taskDates){
    //         if(taskDates[i].task_id == id && taskDates[i].date_complete == dateStr){
    //             return i;
    //         }
    //     }
    // }

    

    function isTaskDone(id, date){
        var dateStr = padStr(date.getFullYear()) + '-' +
                  padStr(1 + date.getMonth()) + '-' +
                  padStr(date.getDate());
        var taskDates = scope.data.taskDates; //Completed tasks.
        for(var i in taskDates){
            if(taskDates[i].task_id == id && taskDates[i].date_complete == dateStr){
                return i;
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
                        done: isTaskDone(tasks[j].id, now),
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
            scope.data.dateList = dateList;
        }
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
    scope.taskDone = function(task_id, date, isDone) {
        var date = new Date(parseInt(date));
        var dateStr = padStr(date.getFullYear()) + '-' +
                  padStr(1 + date.getMonth()) + '-' +
                  padStr(date.getDate());
        var tasksDone = scope.data.taskDates;
        
        if(isDone) {
            // console.log(tasksDone);
            tasksDone.push({
                date_complete: dateStr,
                task_id: task_id
            });
            addTaskDate(task_id, dateStr);
        } else {
            var id = isTaskDone(task_id, date);
            // console.log(id);
            // console.log(tasksDone[id]);
            delTaskDate(task_id, dateStr);
            delete tasksDone[id];
            
        }
        getDailyTasks();
    };
    scope.newTask = function() {
        var success = false;
        var valid = false;
        // validate
        console.log(scope.data.formData);
        // if(typeof scope.data.taskKey == 'undefined') {
        //     var task = {
        //         end_date: scope.data.endDate,
        //         start_date: scope.data.startDate,
        //         name: scope.data.taskName,
        //     };
        //     addTask(task);
        // } else {
            // tasks.push({
            //     name: scope.taskName,
            //     start_date: today,
            //     end_date: null
            // });
        // }
        if(success){
            scope.data.formData = {};
            form.$setPristine();
        }
    };

    scope.clearForm = function(form){
        scope.data.formData = {};
        form.$setPristine();
    };
}])
;