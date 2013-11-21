function dateString(date) {
    date = new Date(date);
    return date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
}
Array.prototype.remove = function(from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};

function ProjCntr($scope) {
    var dates = [];
    var today = dateString(Date.now());
    var days = 8;
    $scope.tasks = [];
    $scope.tasksDone = {};
    $scope.formHidden = true;
    for(var i = 0; i < days; i++) {
        dates.push(new Date().setDate(new Date().getDate() + i));
    }
    $scope.dates = dates.map(dateString);
    // Initial Defaults - will be replaced with real tasks
    $scope.tasks.push({
        name: "Add a Task",
        description: "Edit this task or delete and create a new one.",
        start_date: today,
        end_date: null
    });
    $scope.tasks.push({
        name: "Another Task",
        description: "Here is another example of a task. The plan is that these tasks are things you want to do most every day.",
        start_date: today,
        end_date: null
    });
    $scope.addTask = function(key) {
        if(typeof key != 'undefined' && key !== '') {
            $scope.tasks[key].name = $scope.newName;
            $scope.tasks[key].description = $scope.newDescription;
            $scope.tasks[key].start_date = $scope.newStartDate;
            $scope.tasks[key].end_date = $scope.newEndDate;
            $scope.formHidden = true;
            $scope.newName = "";
            $scope.newDescription = "";
            $scope.newStartDate = "";
            $scope.newEndDate = "";
            $scope.taskKey = "";
        } else {
            $scope.tasks.push({
                name: $scope.newName,
                start_date: today,
                end_date: null
            });
            $scope.newName = "";
        }
    };
    $scope.delete = function(key) {
        $scope.tasks.remove(key);
    };
    $scope.edit = function(key) {
        $scope.newName = $scope.tasks[key].name;
        $scope.newDescription = $scope.tasks[key].description;
        $scope.newStartDate = $scope.tasks[key].start_date;
        $scope.newEndDate = $scope.tasks[key].end_date;
        $scope.taskKey = key;
        $scope.formHidden = false;
    };
    $scope.taskIsHidden = function() {
        return $scope.formHidden;
    };
    $scope.done = function(key, day, done) {
        if(done) {
            if(typeof $scope.tasksDone[key] == 'undefined') {
                $scope.tasksDone[key] = [];
                $scope.tasksDone[key].push(day);
            } else {
                console.log("update");
                $scope.tasksDone[key].push(day);
            }
            console.log($scope.tasksDone);
        } else {
            var i = $scope.tasksDone[key].indexOf(day);
            $scope.tasksDone[key].splice(i,1);
            console.log(i);
        }
    };
    $scope.isDone = function(key, day) {
        if(typeof $scope.tasksDone[key] == 'undefined') {
            return false;
        } else if($scope.tasksDone[key].indexOf(day) >= 0) {
            return true;
        } else {
            return false;
        }
    };
}