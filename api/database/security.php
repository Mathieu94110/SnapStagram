<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");

class AuthDB
{
    private PDOStatement $statementRegister;
    private PDOStatement $statementReadUserFromEmail;
    private PDOStatement $statementReadUserFromId;
    private PDOStatement $statementReadUser;

    function __construct(private PDO $pdo)
    {
        $this->statementRegister = $pdo->prepare('INSERT INTO user VALUES (
            DEFAULT,
            :email,
            :name,
            :userName,
            :password
        )');
        $this->statementReadUserFromId = $pdo->prepare('SELECT * FROM user WHERE iduser=:id');
        $this->statementReadUserFromEmail = $pdo->prepare('SELECT * FROM user WHERE email=:email');
        $this->statementReadUser = $pdo->prepare('SELECT * FROM user WHERE iduser=:id');
    }


    function register(array $user): void
    {
        $hashedPassword = password_hash($user['password'], PASSWORD_ARGON2I);
        $this->statementRegister->bindValue(':email', $user['email']);
        $this->statementRegister->bindValue(':name', $user['name']);
        $this->statementRegister->bindValue(':userName', $user['userName']);
        $this->statementRegister->bindValue(':password', $hashedPassword);
        if ($this->statementRegister->execute()) {
            $response = ['status' => 1, 'message' => 'Utilisateur crée !'];
            echo json_encode($response);
        }
    }

    function getUserFromId(int $id): array | false
    {
        $this->statementReadUserFromId->bindValue(':id', $id);
        $this->statementReadUserFromId->execute();
        return $this->statementReadUserFromId->fetch();
    }

    function getUserFromEmail(string $email): array | false
    {
        $this->statementReadUserFromEmail->bindValue(':email', $email);
        $this->statementReadUserFromEmail->execute();
        return $this->statementReadUserFromEmail->fetch();
    }

    function login(string $userId): void
    {
        $this->statementReadUser->bindValue(':id', $userId);
        if ($this->statementReadUser->execute()) {
            $userInfos = $this->statementReadUser->fetch();
            $payload = [
                "user_id" => $userId,
                "exp" => time() + 3600, // Token expiration time (1 hour)
            ];
            $response = ['status' => 1, 'data' => $userInfos, 'availability' => $payload];
            echo json_encode($response);
            exit();
        };
    }
}

return new AuthDB($pdo);
