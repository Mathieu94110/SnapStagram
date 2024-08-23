<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Credentials: true");

require '../database/database.php';
$postDB = require_once '../database/models/postDB.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    if (isset($_GET['post_id'])) {
        $id = $_GET['post_id'] ?? '';
        $likes = $postDB->fetchPostLikes($id);
        $response = ['status' => 1, 'data' => $likes];
        echo json_encode($response);
    }
}
if ($method === 'POST') {
    $idPost = $_POST['postId'];
    $idUser = $_POST['userId'];
    $type = $_POST['type'];
    if ($type === 'like') {
        $postDB->createPostLike([
            'iduser' => (int)$idUser,
            'idpost' => (int)$idPost,
        ]);
    } elseif ($type === 'dislike') {
        $postDB->deletePostLike([
            'iduser' => (int)$idUser,
            'idpost' => (int)$idPost,
        ]);
    }
}
