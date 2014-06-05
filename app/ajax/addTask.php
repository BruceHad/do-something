<?php

// Adds new tasks to the db, or edits existing tasks if
// task_id is set.

require_once 'db.php'; // The mysql database connection script

if(isset($_GET['task_id'])){
    $task_id = $_GET['task_id'];
    $task=$_GET['task_name'];
    $start_date = $_GET['start_date'];
    $end_date = $_GET['end_date'];
    $query=mysql_query("update ds_tasks set 
        task='$task',
        start_date = '$start_date',
        end_date = '$end_date'
        where id='$task_id'") 
    or die(mysql_error());
    echo "Task $task_id has been updated";
}
 else {
    $task=$_GET['task_name'];
    $start_date = $_GET['start_date'];
    $end_date = $_GET['end_date'];
    $user_id = $_GET['user_id'];
    $query=mysql_query("
    INSERT INTO `ds_tasks` (`end_date`, `start_date`, `task`, `user_id`) 
    VALUES ('$end_date', '$start_date', '$task', '$user_id');
    ") or die(mysql_error());
    echo "$task, $start_date, $end_date, $user_id has been added to tasks_complete.";    
}
?>