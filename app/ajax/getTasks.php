<?php

require_once 'db.php'; // The mysql database connection script
$id = '2';

if(isset($_GET['id'])){
    $id = $_GET['id'];
}

$query=mysql_query("select id, task, user_id from tasks where user_id = $id;") or die(mysql_error());
 
# Collect the results
while($obj = mysql_fetch_object($query)) {
    $arr[] = $obj;
}
 
# JSON-encode the response
echo $json_response = json_encode($arr);

?>