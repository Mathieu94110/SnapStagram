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
    // first of all we try to insert images on separate table on mysql
    echo $_FILES;
    $fileName = $_FILES["image"]["name"];
    $ext = pathinfo($fileName, PATHINFO_EXTENSION);
    $allowedTypes = array("jpg", "jpeg", "png", "gif");
    $tempName = $_FILES["image"]["tmp_name"];
    $targetPath = "../uploads/" . $fileName;
    if (in_array($ext, $allowedTypes)) {
        if (move_uploaded_file($tempName, $targetPath)) {
            $query = "INSERT INTO images (name, filename) VALUES ('$fullName', '$fileName')";
        }
    }
    // After we insert post 
    $sql = "INSERT INTO post(idpost, caption, file, location, tags, author) VALUES(null, :caption, :file, :location, :tags, :author)";
    $stmt = $connection->prepare($sql);
    $stmt->bindParam(':caption', $newUser->caption);
    $stmt->bindParam(':file', $newUser->file);
    $stmt->bindParam(':location', $newUser->location);
    $stmt->bindParam(':tags', $newUser->tags);
    $stmt->bindParam(':author', $newUser->author);
    if ($stmt->execute()) {
        $response = ['status' => 1, 'message' => 'Post crée !'];
    } else {
        $response = ['status' => 0, 'message' => "Erreur lors de la création du post !"];
    }
    echo json_encode($response);
}



if ($_POST["submit"]) {
    $fullName = $_POST["fullname"];
    $fileName = $_FILES["image"]["name"];
    $ext = pathinfo($fileName, PATHINFO_EXTENSION);
    $allowedTypes = array("jpg", "jpeg", "png", "gif");
    $tempName = $_FILES["image"]["tmp_name"];
    $targetPath = "uploads/" . $fileName;
    if (in_array($ext, $allowedTypes)) {
        if (move_uploaded_file($tempName, $targetPath)) {
            $query = "INSERT INTO images (name, filename) VALUES ('$fullName', '$fileName')";
            if (mysqli_query($conn, $query)) {
                header("Location: index.php");
            } else {
                echo "Something is wrong";
            }
        } else {
            echo "File is not uploaded";
        }
    } else {
        echo "Your files are not allowed";
    }
}
