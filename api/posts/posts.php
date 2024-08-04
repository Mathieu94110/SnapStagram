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
    } elseif (isset($_GET['author_id'])) {
        //get user posts case
        $author = intval($_GET['author_id']);
        $userPosts = $postDB->fetchUserPosts($author);
        if (count($userPosts)) {
            $response = ['status' => 1, 'data' => $userPosts];
        } else {
            $response = ['status' => 0, 'message' => "Aucun post trouvé pour cet utilisateur !"];
        }
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

    $caption = $_POST['caption'];
    $location = $_POST['location'];
    $tags = $_POST['tags'];
    $author = $_POST['author'];
    $authorId = $_POST['authorId'];

    $post['caption'] = $caption;
    $post['location'] = $location;
    $post['tags'] = $tags;
    $post['author'] = $author;
    $post['authorId'] = $authorId;

    if (empty($_FILES['file'])) {
        $id = $_GET['post_id'] ?? '';
        $post['idpost'] = $id;
        $postDB->updateOne($post);
    } else {
        // post with new image 
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
                    //update post case
                    $id = $_GET['post_id'] ?? '';
                    $post['idpost'] = $id;
                    $post['image'] = $image;
                    $postDB->updateOne($post);
                } elseif (isset($_GET['user_id'])) {
                    //get user posts case
                    $userId = $_GET['user_id'] ?? '';
                    $post['idpost'] = $id;
                    $post['image'] = $image;
                    $postDB->updateOne($post);
                } else {
                    $postDB->createOne([
                        'caption' => $caption,
                        'location' => $location,
                        'tags' => $tags,
                        'image' => $image,
                        'author' => $author,
                        'authorId' => $authorId
                    ]);
                }
            }
        }
    }
}
