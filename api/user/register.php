<?php
$pdo = require_once '../database.php';
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

$objDb = new DbConnect;
$connection = $objDb->connect();
$method = $_SERVER['REQUEST_METHOD'];
if ($method === 'POST') {
    $newUser = json_decode(file_get_contents("php://input"));
    $sql = "INSERT INTO user(iduser, email, name, userName, password) VALUES(null, :email, :name, :userName, :password)";
    $stmt = $connection->prepare($sql);
    $password = $newUser->password;
    $hashedPassword = password_hash($password, PASSWORD_ARGON2ID);
    $stmt->bindParam(':email', $newUser->email);
    $stmt->bindParam(':name', $newUser->name);
    $stmt->bindParam(':userName', $newUser->userName);
    $stmt->bindParam(':password', $hashedPassword);
    if ($stmt->execute()) {
        $response = ['status' => 1, 'message' => 'Utilisateur crée !'];
    } else {
        $response = ['status' => 0, 'message' => "Erreur lors de la création de l'utilisateur !"];
    }
    echo json_encode($response);
}
