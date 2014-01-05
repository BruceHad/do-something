Array.prototype.remove = function(from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};

function ProjCntr($scope) {
    var today = new Date(),
        days = 14,
        tasks = [],
        tasksDone = {};
    $scope.formHidden = true;
    $scope.points = 0;
    $scope.saveStr = '';
    $scope.loadStr = '';
    $scope.dates = [];
    // Initial Defaults - will be replaced with real tasks
    tasks.push({
        name: "Add a Task",
        start_date: new Date(today.getTime()),
        end_date: null
    });
    tasks.push({
        name: "Another Task",
        start_date: new Date(today.getTime()),
        end_date: null
    });
    
    var update = function() {
        $scope.dates = []; // Clear dates array
        for(var i = 0; i < days; i++) {
            var day = {};
            var thisDay = new Date(today.getTime())
            // var thisDay = moment.unix(today.unix()).add('days', i);
            day.date = thisDay.setDate(thisDay.getDate() + i);
            day.dailyTasks = [];
            for (var j=0; j < tasks.length; j++){
                var task = {};
                task.name = tasks[j].name;
                if(typeof tasksDone[j] != 'undefined' && tasksDone[j].indexOf(thisDay.unix()) ){
                    task.status = 1;
                } else {
                    task.status = 0;
                }
                // console.log("Update: " + tasks[j].end_date);
                task.start_date = tasks[j].start_date;
                if(task.end_date != null){tasks[j].end_date;}
                day.dailyTasks.push(task);
            }
            // Push to dates array
            $scope.dates.push(day);
        }
    };
    var calcScore = function() {
        var day = 5; // 5 points per task
        var td = tasksDone;
        var points = 0;
        for(var i in td) {
            points += td[i].length * day;
        }
        $scope.points = points;
    };
    $scope.addTask = function(key) {
        console.log("Add " + tasks); 
        if(typeof key != 'undefined' && key !== '') {
            tasks[key].name = $scope.newName;
            tasks[key].description = $scope.newDescription;
            tasks[key].start_date = $scope.newStartDate;
            tasks[key].end_date = $scope.newEndDate;
            
        } else {
            tasks.push({
                name: $scope.newName,
                start_date: today,
                end_date: null
            });
        }
        $scope.formHidden = true;
        $scope.newName = "";
        $scope.newDescription = "";
        $scope.newStartDate = "";
        $scope.newEndDate = "";
        $scope.taskKey = "";
        update();
    };
    $scope.delete = function(key) {
        tasks.remove(key);
    };
    $scope.edit = function(key) {
        // console.log(key);
        $scope.newName = tasks[key].name;
        $scope.newDescription = tasks[key].description;
        $scope.newStartDate = tasks[key].start_date.format('MMMM Do');
        if(tasks[key].end_date == null){
            $scope.newEndDate } else {
            $scope.newEndDate = tasks[key].end_date.format('MMMM Do');}
        $scope.taskKey = key;
        $scope.formHidden = false;
    };
    $scope.taskIsHidden = function() {
        return $scope.formHidden;
    };
    $scope.done = function(key, ts, done) {
        if(done) {
            if(typeof tasksDone[key] == 'undefined') {
                tasksDone[key] = [];
                tasksDone[key].push(ts);
            } else {
                tasksDone[key].push(ts);
            }
            //             console.log(tasksDone);
        } else {
            var i = tasksDone[key].indexOf(ts);
            tasksDone[key].splice(i, 1);
            //             console.log(i);
        }
        calcScore();
    };
    $scope.isDone = function(key, day) {
        if(typeof tasksDone[key] == 'undefined') {
            return false;
        } else if(tasksDone[key].indexOf(day) >= 0) {
            return true;
        } else {
            return false;
        }
    };
    $scope.save = function() {
        // console.log(this.tasksDone);
        saveObj = {
            tasks: tasks,
            tasksDone: tasksDone
        };
        saveJson = JSON.stringify(saveObj);
        $scope.saveStr = Base64.encode(saveJson);
    };
    $scope.load = function() {
        this.tasks = [];
        this.tasksDone = {};
        this.loadStr = Base64.decode(this.loadStr);
        this.loadStr = JSON.parse(this.loadStr);
        tasksDone = this.loadStr.tasksDone;
        tasks = this.loadStr.tasks;
        this.loadStr = '';
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
    update();
}