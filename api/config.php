<?php
require 'vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

$databaseHost = $_ENV['DB_HOST'];
$databaseUser = $_ENV['DB_USER'];
$databasePass = $_ENV['DB_PASS'];
$databaseName = $_ENV['DB_NAME'];
