<?php
$pdo = require_once './database.php';
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

$objDb = new DbConnect;
$connection = $objDb->connect();
$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case "GET":
        $sql = "SELECT * FROM user";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        if (isset($path[3]) && is_numeric($path[3])) {
            $sql .= " WHERE id = :id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $path[3]);
            $stmt->execute();
            $users = $stmt->fetch(PDO::FETCH_ASSOC);
        } else {
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        echo json_encode($users);
        break;
    case "POST":
        $newUser = json_decode(file_get_contents("php://input"));
        $sql = "INSERT INTO user(id, email, name, userName, password) VALUES(null, :email, :name, :userName, :password)";
        $stmt = $connection->prepare($sql);
        $stmt->bindParam(':email', $newUser->email);
        $stmt->bindParam(':name', $newUser->name);
        $stmt->bindParam(':userName', $newUser->userName);
        $stmt->bindParam(':password', $newUser->password);
        if ($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Utilisateur crée !'];
        } else {
            $response = ['status' => 0, 'message' => "Erreur lors de la création de l'utilisateur !"];
        }
        echo json_encode($response);
        break;
}
