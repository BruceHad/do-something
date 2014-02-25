<?php
require_once 'db.php'; // The mysql database connection script
if(isset($_GET['taskID'])){
    $status = $_GET['status'];
    $taskID = $_GET['taskID'];
    $query=mysql_query("update tasks set status='$status' where id='$taskID'") or die(mysql_error());
    while($obj = mysql_fetch_object($query)) {
       $arr[] = $obj;
   }
   $json_response = json_encode($arr);
}
?>