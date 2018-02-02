<?php

$con = Connection();

$sql = "SELECT Value FROM timer WHERE Id = 1 AND Expired = 0";
$res = mysqli_query($con, $sql);

if (!$res) {
	die('Error: ' . mysqli_error($con));
	echo mysqli_error($con);
}else{
	
	$val = mysqli_fetch_array($res,MYSQLI_NUM);

	$sql = "UPDATE timer SET Expired = 1 WHERE Id = 1";

	if (!mysqli_query($con, $sql)) {
		die('Error: ' . mysqli_error($con));
		echo mysqli_error($con);
	}else echo $val[0]; //all good. value read and updated. return value for timer

	mysqli_free_result($res);
	mysqli_close($con);
}

function Connection(){

	$DBServer = '127.0.0.1';
	$DBUser   = 'root';
	$DBPass   = "";
	$DBName   = 'schermoatena';
	
	$con = mysqli_connect($DBServer, $DBUser, $DBPass); 
	
	if (!$con) die('Could not connect: ' . mysqli_connect_error());
	else{
		$db= mysqli_select_db($con, $DBName);
		if (!$db) die ("Can't use database : ".mysqli_error());
	}
	mysqli_set_charset($con, "utf8");
	return $con;
}

?>