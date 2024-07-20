<?php
$pdo = require_once '../database.php';
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Credentials: true");

$objDb = new DbConnect;
$connection = $objDb->connect();
$method = $_SERVER['REQUEST_METHOD'];
$fileResponse = array();
$upload_dir = '../uploads';
$server_url = 'http://localhost:8888/api/post/';

$status = $statusMsg = '';
if ($method === 'POST') {
    // for image 
    $status = 'error';
    if (($_FILES['file'])) {
        $file_name = $_FILES["file"]["name"];
        $file_tmp_name = $_FILES["file"]["tmp_name"];
        $error = $_FILES["file"]["error"];
        if ($error > 0) {
            $fileResponse = array(
                "status" => "error",
                "error" => true,
                "message" => "Erreur lors du téléchargement de l'image!"
            );
        } else {
            $random_name = rand(1000, 1000000) . "-" . $file_name;
            $upload_name = $upload_dir . strtolower($random_name);
            $upload_name = preg_replace('/\s+/', '-', $upload_name);

            if (move_uploaded_file($file_tmp_name, $upload_name)) {
                $fileResponse = array(
                    "status" => "success",
                    "error" => false,
                    "message" => "Image téléchargée correctement",
                    "url" => $server_url . "/" . $upload_name
                );

                $host = "localhost";
                $user = "root";
                $password = "root";
                $dbname = "socialapp";

                $con = mysqli_connect($host, $user, $password, $dbname);

                if (!$con) {
                    die("La connexion a échouée: " . mysqli_connect_error());
                }

                $sql = "insert into images (image) values ('$upload_name')";
                mysqli_query($con, $sql);
            } else {
                $response = array(
                    "status" => "error",
                    "error" => true,
                    "message" => "Erreur lors du téléchargement de l'image!"
                );
            }
        }
    } else {
        $response = array(
            "status" => "error",
            "error" => true,
            "message" => "Aucune image n'a été transmise!"
        );
    }
    // for the rest remain to fix issues
    $newUser = json_decode(file_get_contents("php://input"));
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
    echo json_encode($fileResponse);

    echo json_encode($response);
}
