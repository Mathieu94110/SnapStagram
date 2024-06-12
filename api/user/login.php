<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

$connection = new mysqli('localhost', 'root', 'root', 'socialapp');
$method = $_SERVER['REQUEST_METHOD'];
if ($method === 'POST') {

    $encodeddData = file_get_contents("php://input");
    $decodedData = json_decode($encodeddData, true);
    $email = $decodedData['email'];
    $password = $decodedData['password'];


    // $sql = "SELECT * FROM user WHERE email='$email' AND password='$password';";
    $sql = "SELECT * FROM user WHERE email='$email'";
    $res = mysqli_query($connection, $sql);

    if (mysqli_num_rows($res) !== 0) {
        //
        $row = mysqli_fetch_array($res, MYSQLI_ASSOC);
        $hashedPassword = $row['password'];

        if (password_verify($password, $hashedPassword)) {
            $userInfos = $res->fetch_assoc();
            $response = ['status' => 1, 'data' => $userInfos];
        } else {
            $response = ['status' => 0, 'message' => "Mot de passe incorrect !"];
        }
    } else {
        $response = ['status' => 0, 'message' => "Adresse mail ou mot de passe incorrect !"];
    }
    echo json_encode($response);
}
