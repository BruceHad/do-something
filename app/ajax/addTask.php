<?php
require_once 'db.php'; // The mysql database connection script

if(isset($_GET['task'])){
    $task=$_GET['task'];
    $start_date = $_GET['start_date'];
    $end_date = $_GET['end_date'];
    $user_id = $_GET['user_id'];
}

$query=mysql_query("
INSERT INTO `test`.`tasks` (`end_date`, `start_date`, `task`, `user_id`) 
VALUES ('$end_date', '$start_date', '$task', '$user_id');
") or die(mysql_error());

echo "Complete, $task, $start_date, $end_date, $user_id has been added to tasks_complete.";
?>