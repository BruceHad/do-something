<?php

require_once 'db.php'; // The mysql database connection script

if(isset($_GET['task_id'])){
    $task_id = $_GET['task_id'];
    $date = $_GET['task_date'];
    $query=mysql_query("
    DELETE FROM `ds_tasks_done` 
    WHERE `task_id`='$task_id'
     AND `date_complete` = str_to_date('$date','%Y-%m-%d');
    ") or die(mysql_error());
    echo "Complete, $task_id, $date has been deleted";
}



?>