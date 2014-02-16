<?php

$arr = array();
$first = array(
    "name" => "Add a Task",
    "start_date" => time(),
    end_date => null
    );
array_push($arr, $first);

echo json_encode($arr);