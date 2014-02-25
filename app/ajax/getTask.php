<?php

require_once 'db.php'; // The mysql database connection script
$status = '%';

if(isset($_GET['status'])){
    $status = $_GET['status'];
}

$query=mysql_query("select ID, TASK, STATUS from tasks where status like '$status' order by status,id desc") or die(mysql_error());
 
# Collect the results
while($obj = mysql_fetch_object($query)) {
    $arr[] = $obj;
}
 
# JSON-encode the response
echo $json_response = json_encode($arr);

?>