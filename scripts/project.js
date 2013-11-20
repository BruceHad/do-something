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
    var today = Date.now;
    var days = 7;
    $scope.tasks = [];
    $scope.newTask = "";
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
    $scope.addTask = function () {
        $scope.tasks.push({
            name: $scope.newTask,
            start_date: today,
            end_date: null});
        $scope.newTask = "";
    };
    $scope.delete = function(key){
        $scope.tasks.remove(key);
    };
}