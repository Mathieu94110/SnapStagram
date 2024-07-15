<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

$connection = new mysqli('localhost', 'root', 'root', 'socialapp');
$sql = "SELECT * FROM post";
$res = mysqli_query($connection, $sql);
if ($res) {
    if (mysqli_num_rows($res) !== 0) {
        $usersPosts = mysqli_fetch_all($res, MYSQLI_ASSOC);

        $response = ['status' => 1, 'data' => $usersPosts];
    } else {
        $response = ['status' => 0, 'message' => "Aucun post trouvé !"];
    }
} else {
    $response = ['status' => 0, 'message' => "Problème serveur !"];
}
echo json_encode($response);
