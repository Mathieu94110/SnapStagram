<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Credentials: true");

require '../database/database.php';
$authDB = require  '../database/security.php';
$postDB = require_once '../database/models/postDB.php';

$currentUser = $authDB->isLoggedin();
$method = $_SERVER['REQUEST_METHOD'];
$upload_dir = '../uploads';
$upload_name = '';

if ($method === 'GET') {
    if (isset($_GET['post_id'])) {
        $id = $_GET['post_id'] ?? '';
        $post = $postDB->fetchOne($id);
        $response = ['status' => 1, 'data' => $post];
        echo json_encode($response);
    } else {
        $posts = $postDB->fetchAll();

        if (count($posts)) {
            $response = ['status' => 1, 'data' => $posts];
        } else {
            $response = ['status' => 0, 'message' => "Aucun post trouvé !"];
        }
        echo json_encode($response);
    }
}

if ($method === 'POST') {
    // we set common queries values
    $caption = $_POST['caption'];
    $location = $_POST['location'];
    $tags = $_POST['tags'];
    $author = $_POST['author'];

    $post['caption'] = $caption;
    $post['location'] = $location;
    $post['tags'] = $tags;
    $post['author'] = $author;
    //
    if (empty($_FILES['file'])) {
        // Post without new image in this case we only adding idpost value to common queries values for update
        $id = $_GET['post_id'] ?? '';
        $post['idpost'] = $id;
        $postDB->updateOne($post);
    } else {
        // Post with new image 
        $file_name = $_FILES["file"]["name"];
        $file_tmp_name = $_FILES["file"]["tmp_name"];
        $error = $_FILES["file"]["error"];
        if ($error === 0) {
            $random_name = rand(1000, 1000000) . "-" . $file_name;
            $upload_name = $upload_dir . strtolower($random_name);
            $upload_name = preg_replace('/\s+/', '-', $upload_name);
            if (move_uploaded_file($file_tmp_name, $upload_name)) {
                $image = $upload_name;
                if (isset($_GET['post_id'])) {
                    // We adding idpost value and new image value for update
                    $id = $_GET['post_id'] ?? '';
                    $post['idpost'] = $id;
                    $post['image'] = $image;
                    $postDB->updateOne($post);
                } else {
                    $postDB->createOne([
                        'caption' => $caption,
                        'location' => $location,
                        'tags' => $tags,
                        'image' => $image,
                        'author' => $author
                    ]);
                }
            }
        }
    }
}
