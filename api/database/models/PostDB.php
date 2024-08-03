<?php
class PostDB
{
    private PDOStatement $statementCreateOne;
    private PDOStatement $statementUpdateOneWithImg;
    private PDOStatement $statementUpdateOneWithoutImg;
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
        $this->statementUpdateOneWithImg = $pdo->prepare('
        UPDATE post
        SET
          caption=:caption,
          location=:location,
          tags=:tags,
          image=:image,
          author=:author
        WHERE idpost=:idpost
      ');
        $this->statementUpdateOneWithoutImg = $pdo->prepare('
      UPDATE post
      SET
        caption=:caption,
        location=:location,
        tags=:tags,
        author=:author
      WHERE idpost=:idpost
    ');
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

    public function updateOne($post): void
    {
        if (!empty($post['image'])) {
            $this->statementUpdateOneWithImg->bindValue(':idpost', $post['idpost']);
            $this->statementUpdateOneWithImg->bindValue(':caption', $post['caption']);
            $this->statementUpdateOneWithImg->bindValue(':location', $post['location']);
            $this->statementUpdateOneWithImg->bindValue(':tags', $post['tags']);
            $this->statementUpdateOneWithImg->bindValue(':image', $post['image']);
            $this->statementUpdateOneWithImg->bindValue(':author', $post['author']);
            if ($this->statementUpdateOneWithImg->execute()) {
                $response = ['status' => 1, 'message' => 'Post mis à jour avec succès !'];
            } else {
                $response = ['status' => 0, 'message' => 'Echec de la mise à jour du post !'];
            }
        } else {
            $this->statementUpdateOneWithoutImg->bindValue(':idpost', $post['idpost']);
            $this->statementUpdateOneWithoutImg->bindValue(':caption', $post['caption']);
            $this->statementUpdateOneWithoutImg->bindValue(':location', $post['location']);
            $this->statementUpdateOneWithoutImg->bindValue(':tags', $post['tags']);
            $this->statementUpdateOneWithoutImg->bindValue(':author', $post['author']);
            if ($this->statementUpdateOneWithoutImg->execute()) {
                $response = ['status' => 1, 'message' => 'Post mis à jour avec succès !'];
            } else {
                $response = ['status' => 0, 'message' => 'Echec de la mise à jour du post !'];
            }
        }

        echo json_encode($response);
    }
}

return new PostDB($pdo);
