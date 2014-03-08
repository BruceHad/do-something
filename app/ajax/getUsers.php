<?php

require_once 'db.php'; // The mysql database connection script

if(isset($_GET['name'])){
    $id = $_GET['name'];
}

$query=mysql_query("select id from users where username = '$id';") or die(mysql_error());
 
# Collect the results
while($obj = mysql_fetch_object($query)) {
    $arr[] = $obj;
}
 
# JSON-encode the response
echo $json_response = json_encode($arr);

?>