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
$upload_dir = '../uploads';
$upload_name = '';

if ($method === 'POST') {
    // for image 
    $file_name = $_FILES["file"]["name"];
    $file_tmp_name = $_FILES["file"]["tmp_name"];
    $error = $_FILES["file"]["error"];
    if ($error === 0) {
        $random_name = rand(1000, 1000000) . "-" . $file_name;
        $upload_name = $upload_dir . strtolower($random_name);
        $upload_name = preg_replace('/\s+/', '-', $upload_name);

        if (move_uploaded_file($file_tmp_name, $upload_name)) {
            // we set all values and execute sql query
            $caption = $_POST['caption'];
            $location = $_POST['location'];
            $tags = $_POST['tags'];
            $image = $upload_name;
            $author = $_POST['author'];

            try {
                $sql = "INSERT INTO post (
        caption,
        location,
        tags,
        image,
        author
      ) VALUES (
        :caption,
        :location,
        :tags,
        :image,
        :author
      );";
                $statementCreateOne = $connection->prepare($sql);

                $statementCreateOne->bindParam(':caption', $caption);
                $statementCreateOne->bindParam(':location', $location);
                $statementCreateOne->bindParam(':tags', $tags);
                $statementCreateOne->bindParam(':image', $image);
                $statementCreateOne->bindParam(':author', $author);

                if ($statementCreateOne->execute()) {
                    // Post created successfully on mysql db
                    $response = ["status" => 1, "message" => "Post crée avec succès!"];
                }
            } catch (PDOException $e) {
                // Issue with the image
                die("La requete a échouée: " . $e->getMessage());
                $response = ["status" => 0, "message" => "Erreur lors du téléchargement de l'image!"];
            }
        }
        // Issue with the image
        elseif ($error > 0) {
            $response = ["status" => 0, "message" => "Erreur lors du téléchargement de l'image!"];
        }
        // Issue with the post
        else {
            $response = ["status" => 0, "message" => "Erreur lors de la création du post!"];
        }
        echo json_encode($response);
    }
}
