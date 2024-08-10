<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Origin: http://localhost:5173");
header('Access-Control-Allow-Credentials: true');

require_once '../database/database.php';
$authDB = require_once '../database/security.php';
$method = $_SERVER['REQUEST_METHOD'];
if ($method === 'GET') {
    if (isset($_GET['user_id'])) {
        $id = $_GET['user_id'] ?? '';
        $user = $authDB->getUserFromId($id);
        $response = ['status' => 1, 'data' => $user];
        echo json_encode($response);
    }
} elseif ($method === 'POST') {
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
