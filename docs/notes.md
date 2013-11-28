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



