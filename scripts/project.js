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


function ProjCntr($scope, dateFilter) {
    $scope.name = "Do Something";
    $scope.formHidden = true;

    var today = getStartDate(new Date())
        tasks = [],
        tasksDone = {},
        weeks = 2;
    var days = weeks * 7;

    var update = function() {
        $scope.dates = []; // Clear dates array
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
                    if(typeof tasksDone[j] != 'undefined'){
                        if(tasksDone[j].indexOf(day.date) >= 0){
                            task.status = 1;
                        }
                    }
                    task.start_date = tasks[j].start_date;
                    if(tasks[j].end_date != null){
                        task.end_date = tasks[j].end_date;
                    }
                    day.dailyTasks.push(task);
                }
            }
            // Push to dates array
            $scope.dates.push(day);
        }
    };

    $scope.addTask = function(key) {
        console.log("Add: " + key);
        // console.log($scope.endDate);
        if(typeof key != 'undefined') {
            tasks[key].name = $scope.taskName;
            tasks[key].start_date = new Date($scope.startDate);
            if($scope.endDate){tasks[key].end_date = new Date($scope.endDate);}            
        } else {
            tasks.push({
                name: $scope.taskName,
                start_date: today,
                end_date: null
            });
        }
        $scope.formHidden = true;
        delete $scope.taskKey;
        delete $scope.taskName;
        delete $scope.startDate; 
        delete $scope.endDate;
        update();
    };
    $scope.deleteTask = function(key) {
        console.log("Delete " + key);
        tasks.remove(key);
        tasksDone[key] = [];
        update();
    };
    $scope.editTask = function(key) { 
        console.log("Edit "+ key);      
        $scope.taskName = tasks[key].name;
        $scope.startDate = dateFilter(tasks[key].start_date, 'MM/dd/yyyy');
        $scope.endDate = dateFilter(tasks[key].end_date, 'MM/dd/yyyy');
        $scope.taskKey = key;
        $scope.formHidden = false;
    };

    $scope.doneTask = function(key, date, done) {
        console.log(key +" "+ date +" "+ done);
        if(done) {
            if(typeof tasksDone[key] == 'undefined') {
                tasksDone[key] = [];
            }
            tasksDone[key].push(date);
        } else {
            var i = tasksDone[key].indexOf(date);
            tasksDone[key].splice(i, 1);
        }
        update();
    };
    $scope.isDone = function(key, date) {
        if(typeof tasksDone[key] == 'undefined') {
            return false;
        } else if(tasksDone[key].indexOf(date) >= 0) {
            return true;
        } else {
            return false;
        }
    };
    $scope.isMon = function(date){
        var date = new Date(date);
        if(date.getUTCDay() == 1){
            return true;
        } else {
            return false;
        }
    };
    $scope.isWeekend = function(date){
        var date = new Date(date);
        if(date.getUTCDay() == 0 || date.getUTCDay() == 6){
            return true;
        } else {
            return false;
        }
    };
    $scope.changeDate = function(direct) {
        if(direct == 'prev') {
            today.setDate(today.getDate() - days);
            // today.add('days', -1 * days);
        } else {
            today.setDate(today.getDate() + days);
            // today.add('days', days);
        }
        update();
    };


    // Initial Defaults - will be replaced with real tasks
    tasks.push({
        name: "Add a Task",
        start_date: new Date(today.getTime()),
        end_date: null
    });
    tasks.push({
        name: "Another Task",
        start_date: new Date(today.getTime()),
        end_date: new Date(today.getTime()+172800000)
    });

    update();
}

