<?php
class PostDB
{
  private PDOStatement $statementCreateOne;
  private PDOStatement $statementDeleteOne;
  private PDOStatement $statementUpdateOneWithImg;
  private PDOStatement $statementUpdateOneWithoutImg;
  private PDOStatement $statementReadOne;
  private PDOStatement $statementReadAll;
  private PDOStatement $statementReadUserAll;


  function __construct(private PDO $pdo)
  {
    $this->statementCreateOne = $pdo->prepare('
      INSERT INTO post (
        caption,
        location,
        tags,
        image,
        author,
        authorId
      ) VALUES (
        :caption,
        :location,
        :tags,
        :image,
        :author,
        :authorId
      )
    ');
    $this->statementDeleteOne = $pdo->prepare('DELETE FROM post WHERE idpost=:id');
    $this->statementReadOne = $pdo->prepare('SELECT * FROM post LEFT JOIN user ON post.authorId = user.iduser WHERE post.idpost=:id');
    $this->statementUpdateOneWithImg = $pdo->prepare('
        UPDATE post
        SET
          caption=:caption,
          location=:location,
          tags=:tags,
          image=:image,
          author=:author,
          authorId=:authorId
        WHERE idpost=:idpost
      ');
    $this->statementUpdateOneWithoutImg = $pdo->prepare('
      UPDATE post
      SET
        caption=:caption,
        location=:location,
        tags=:tags,
        author=:author,
        authorId=:authorId
      WHERE idpost=:idpost
    ');
    $this->statementReadAll = $pdo->prepare('SELECT * FROM post LEFT JOIN user ON post.authorId = user.iduser');
    $this->statementReadUserAll = $pdo->prepare('SELECT * FROM post WHERE authorId=:authorId');
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
    $this->statementCreateOne->bindValue(':authorId', $post['authorId']);
    if ($this->statementCreateOne->execute()) {
      $response = ['status' => 1, 'message' => 'Post crée avec succès !'];
      echo json_encode($response);
    }
  }

  public function deleteOne(int $id): int
  {
    $this->statementDeleteOne->bindValue(':id', $id);
    $this->statementDeleteOne->execute();
    return $id;
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
      $this->statementUpdateOneWithImg->bindValue(':authorId', $post['authorId']);
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
      $this->statementUpdateOneWithoutImg->bindValue(':authorId', $post['authorId']);
      if ($this->statementUpdateOneWithoutImg->execute()) {
        $response = ['status' => 1, 'message' => 'Post mis à jour avec succès !'];
      } else {
        $response = ['status' => 0, 'message' => 'Echec de la mise à jour du post !'];
      }
    }
    echo json_encode($response);
  }

  public function fetchUserPosts(int $authorId): array
  {
    $this->statementReadUserAll->bindValue(':authorId', $authorId);
    $this->statementReadUserAll->execute();
    return $this->statementReadUserAll->fetchAll();
  }
}

return new PostDB($pdo);
