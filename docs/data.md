There are two tables storing permanent data: tasks and tasks_done.

$scope.data.tasks is an array that stores a list of tasks (taken from the tasks table) for the logged in user. It stores the id, user_id, task, start and end dates.

$scope.data.tasks = [
    0: {
        end_date: "2014-12-01", //can be null
        id: "1",
        start_date: "2014-01-01",
        task: "task name",
        user_id: "2"
    },
    1: {...}
];


$scope.data.tasks_done is an array that stores a list of task ids and the dates the task was completed.

$scope.data.tasks_done = [
    0: {
        date_complete: "2014-01-01",
        task_id: "1"
    },
    1: {..}
];

These two arrays are used to build the task_list object for display.

$scope.data.task_list is an internal object that stores the tasks to be displayed. 

It is built by the buildTaskList function. 

It contains a list of dates (timestamps) for each day in the current date period. Each day contains an array of: task_id, task_name, start_date, end_date and the task_done flag. 

scope.data.task_list = {
    1395619200000: [
        task_done: false,
        end_date: null,
        task_id: "1",
        task_name: "task name",
        start_date: "2014-01-01"
    ],
    1395619200000: [
    ...
    ],
};