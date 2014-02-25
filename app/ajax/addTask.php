<?php
require_once 'db.php'; // The mysql database connection script
if(isset($_GET['task'])){
    $task = $_GET['task'];
    $status = "0";
    $created = time();
    $query=mysql_query("INSERT INTO tasks(task,status,created_at) VALUES ('$task', '$status', '$created')") or die(mysql_error());
}
?>