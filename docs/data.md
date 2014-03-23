taskDates is an array that stores a list of ids and dates for any completed tasks, for the given user.

scope.data.taskDates = [
    0: {
        date_complete: "2014-01-01",
        task_id: "1"
    },
    1: {..}
];

tasks is an array that stores a list of tasks for the given user. I stores the id, user_id, task, start and end dates.

scope.data.tasks = [
    0: {
        end_date: "2014-12-01", //can be null
        id: "1",
        start_date: "2014-01-01",
        task: "task name",
        user_id: "2"
    },
    1: {...}
];

days is an object that stores the tasks to display for the current date period. It is built by the getDailyTasks function. It contains a list of dates (timestamp) each containing a list of task objects, which contain id, name, start and end dates and the 'done' flag. 

scope.data.dateList = {
    1395619200000: [
        done: false,
        end_date: null,
        id: "1",
        name: "task name",
        start_date: "2014-01-01"
    ],
};