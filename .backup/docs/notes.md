# Do Something Every Day

It's not a todo app! I use todo lists for reminders and, when it gets busy, to get everything down and visible to make it easier to plan things out. But there are recurring tasks, things that I want to get into the habit of doing regularly. These tend to clutter up any todo list, and I really can't be bothered adding them every day. Do Something is for those things. It's the carrot and stick method. The stick of the reminder, telling you that you really wanted to do this thing. And the carrot of ticking that thing off the list.

I'm using AngularJS (mainly because I want to learn it) so it's going to be a front-end Javascript application. I may add user account and some back end stuff later.

## Design

Single page app.

Page is arranged in days of the week. Each day has a recurring task attached. User can add and delete tasks as well as set start and end dates.

### Scoring

Users can tick a box to set the task to 'Done'. User get points for each task.

1. One points per task.
2. Multiplier for each consecutive task e.g. if you complete the task 5 days in a row, points = 1 + (No of Days-1)/2 = 3.5 points
3. Five extra points if all daily tasks are completed.
4. Twenty five extra points if all daily tasks are completed in 5 out of 7 days.

### Saving

The user's data is stored in the model. This saved to a cookie so that it is stored on the computed. It can also be exported and imported on a different computer. At a later date I might add user accounts which would allow this to be stored on the server and retrieved when the user logs in.


## Model

Kinda global (but not part of $scope):

tasks = [
    {
        name:       string
        start_date: moment
        end_date:   moment (optional)},
    {
        ...
    }
]

tasksDone = {
    key: [
        date1,
        date2,
        ...
    ]
}

In the 'update' loop (part of $scope):

dates = [
    0: {
        date: date
        dailyTasks = [
            0: {
                name: string
                status: 0/1
                start_date: date
                end_date: date (optional)},
            1: {...}
        ]
    }
    1: {}
    ...
]


## Notes

### The Update Loop

The update() function controls what is displayed. It is called whenever anything needs to be updated, rebuilding the data each time. 

It creates a dates[] array and populates it with data from tasks[] and tasksDone{}.

Each element in the array contains an object containing a date and a list of tasks for that date.

## User Accounts

Needs a simple way to save user data. Simplest way I can think of is to save the data to a text file. Read the file via PHP and turn it into a JSON object. Read the JSON into the app.

So this needs the $resource service:

0. Add angular-resource.js script to your page if it isn't there already.
1. IN services inject ngResource and add a factory that returns the location of the resource. e.g. api.php.
2. In the controller add your query (or post or whatever), based on whatever you named the service in step 1.
3. Then you can add the results to the $scope if need be, and update the view.  





### To Do

1. Add Tasks

2. Edit Tasks
3. Save Data
4. Load Data





