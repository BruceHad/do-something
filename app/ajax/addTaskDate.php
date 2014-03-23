<?php

require_once 'db.php'; // The mysql database connection script

if(isset($_GET['task_id'])){
    $task_id = $_GET['task_id'];
    $date = $_GET['date'];
}

$query=mysql_query("
INSERT INTO `test`.`tasks_done` (`task_id`, `date_complete`) 
VALUES ('$task_id', '$date');
") or die(mysql_error());
 
echo "Complete, $task_id, $date has been added to tasks_complete.";

?>