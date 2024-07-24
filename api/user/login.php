<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

require_once '../database/database.php';
$authDB = require_once '../database/security.php';
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    $encodeddData = file_get_contents("php://input");
    $decodedData = json_decode($encodeddData, true);
    $email = $decodedData['email'];
    $password = $decodedData['password'];

    if ($email !== '') {
        $user = $authDB->getUserFromEmail($email);
        $response = null;
        if (!$user) {
            $response = ['status' => 0, 'message' => "L'adresse mail n'éxiste pas !"];
        } else {
            if (!password_verify($password, $user['password'])) {
                $response = ['status' => 0, 'message' => "Mot de passe incorrect !"];
            } else {
                $authDB->login($user['iduser']);
            }
        }
        if ($response) echo json_encode($response);
    }
}
