<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

//// These lines will be refactored in a short time
$server = getenv('DB_HOST');
$dbname = getenv('DB_NAME');
$user = getenv('DB_USER');
$pass = getenv('DB_PASS');
$connection = new mysqli($server, $user, $pass, $dbname);
////
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    $encodeddData = file_get_contents("php://input");
    $decodedData = json_decode($encodeddData, true);
    $email = $decodedData['email'];
    $password = $decodedData['password'];
    $sql = "SELECT * FROM user WHERE email='$email'";
    $res = mysqli_query($connection, $sql);

    if ($res) {
        if (mysqli_num_rows($res) !== 0) {
            $userInfos = mysqli_fetch_assoc($res);
            $hashedPassword = $userInfos['password'];
            if (password_verify($password, $hashedPassword)) {
                $response = ['status' => 1, 'data' => $userInfos];
            } else {
                $response = ['status' => 0, 'message' => "Mot de passe incorrect !"];
            }
        } else {
            $response = ['status' => 0, 'message' => "L'adresse mail n'éxiste pas !"];
        }
    } else {
        $response = ['status' => 0, 'message' => "Problème serveur !"];
    }
    echo json_encode($response);
}
