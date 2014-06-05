<?php
require_once 'db.php'; // The mysql database connection script
if(isset($_GET['task_id'])){
    $task_id = $_GET['task_id'];
    $query=mysql_query("delete from ds_tasks where id='$task_id'") or die(mysql_error());
    while($obj = mysql_fetch_object($query)) {
        $arr[] = $obj;
    }
    echo "deleted";
}
else {
    echo "Not Found";
}
?>