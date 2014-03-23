<?php

require_once 'db.php'; // The mysql database connection script

if(isset($_GET['id'])){
    $id = $_GET['id'];
} else {
    $id = 0;
}

$query=mysql_query("
SELECT
    tasks_done.id,
    task_id,
    date_complete
from tasks_done
    inner join tasks
    on (tasks.id = tasks_done.task_id)
where user_id = $id;
    ") 
    or die(mysql_error());
 
# Collect the results
while($obj = mysql_fetch_object($query)) {
    $arr[] = $obj;
}
 
# JSON-encode the response
echo $json_response = json_encode($arr);

?>