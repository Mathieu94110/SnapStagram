<?php
class PostDB
{
    private PDOStatement $statementCreateOne;
    private PDOStatement $statementReadOne;
    private PDOStatement $statementReadAll;

    function __construct(private PDO $pdo)
    {
        $this->statementCreateOne = $pdo->prepare('
      INSERT INTO post (
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
      )
    ');
        $this->statementReadOne = $pdo->prepare('SELECT * FROM post LEFT JOIN user ON post.author = user.iduser WHERE post.idpost=:id');
        $this->statementReadAll = $pdo->prepare('SELECT * FROM post LEFT JOIN user ON post.author = user.iduser');
    }


    public function fetchAll(): array
    {
        $this->statementReadAll->execute();
        return $this->statementReadAll->fetchAll();
    }

    public function fetchOne(string $id): array
    {
        $this->statementReadOne->bindValue(':id', $id);
        $this->statementReadOne->execute();
        return $this->statementReadOne->fetch();
    }

    public function createOne($post): void
    {
        $this->statementCreateOne->bindValue(':caption', $post['caption']);
        $this->statementCreateOne->bindValue(':location', $post['location']);
        $this->statementCreateOne->bindValue(':tags', $post['tags']);
        $this->statementCreateOne->bindValue(':image', $post['image']);
        $this->statementCreateOne->bindValue(':author', $post['author']);
        if ($this->statementCreateOne->execute()) {
            $response = ['status' => 1, 'message' => 'Post crée avec succès !'];
            echo json_encode($response);
        }
    }
}

return new PostDB($pdo);
