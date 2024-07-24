<?php

require_once '../database/database.php';

$authDB = require_once '../database/security.php';
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    $newUser = json_decode(file_get_contents("php://input"));
    $email = $newUser->email;
    $name = $newUser->name;
    $userName = $newUser->userName;
    $password = $newUser->password;
    $authDB->register([
        'email' => $email,
        'name' => $name,
        'userName' => $userName,
        'password' => $password
    ]);
}
