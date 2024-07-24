<?php

class AuthDB
{
    private PDOStatement $statementRegister;
    private PDOStatement $statementReadUserFromEmail;
    private PDOStatement $statementCreateSession;
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
        $this->statementReadUserFromEmail = $pdo->prepare('SELECT * FROM user WHERE email=:email');
        $this->statementCreateSession = $pdo->prepare('INSERT INTO session VALUES (
            :idsession,
            :iduser
        )');
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

    function getUserFromEmail(string $email): array | false
    {
        $this->statementReadUserFromEmail->bindValue(':email', $email);
        $this->statementReadUserFromEmail->execute();
        return $this->statementReadUserFromEmail->fetch();
    }

    function login(string $userId): void
    {
        //we create the session
        $sessionId = bin2hex(random_bytes(32));
        $this->statementCreateSession->bindValue(':iduser', $userId);
        $this->statementCreateSession->bindValue(':idsession', $sessionId);
        $this->statementCreateSession->execute();
        // then we return user data
        $this->statementReadUser->bindValue(':id', $userId);
        $this->statementReadUser->execute();
        $userInfos = $this->statementReadUser->fetch();
        $response = ['status' => 1, 'data' => $userInfos];
        echo json_encode($response);
    }
}

return new AuthDB($pdo);
