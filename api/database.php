<?php

/**
 * Database Connection
 */
class DbConnect
{
    private $server = getenv('DB_HOST');
    private $dbname = getenv('DB_NAME');
    private $user = getenv('DB_USER');
    private $pass = getenv('DB_PASS');

    public function connect()
    {
        try {
            $conn = new PDO('mysql:host=' . $this->server . ';dbname=' . $this->dbname, $this->user, $this->pass);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $conn;
        } catch (\Exception $e) {
            echo "Database Error: " . $e->getMessage();
        }
    }
}
