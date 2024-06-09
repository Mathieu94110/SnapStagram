<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

$server = getenv('DB_HOST');
$dbname = getenv('DB_NAME');
$user = getenv('DB_USER');
$pass = getenv('DB_PASS');

$connection = new mysqli($server, $user, $pass, $dbname);

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    $encodeddData = file_get_contents("php://input");
    $decodedData = json_decode($encodeddData, true);
    $email = $decodedData['email'];
    $password = $decodedData['password'];
    $sql = "SELECT * FROM user WHERE email='$email' AND password='$password';";
    $res = mysqli_query($connection, $sql);
    if (mysqli_num_rows($res) !== 0) {
        $userInfos = $res->fetch_assoc();
        $response = ['status' => 1, 'data' => $userInfos];
    } else {
        $response = ['status' => 0, 'message' => "Adresse mail ou mot de passe incorrect !"];
    }
    echo json_encode($response);
}
