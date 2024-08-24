<?php
class PostDB
{
  private PDOStatement $statementCreateOne;
  private PDOStatement $statementDeleteOne;
  private PDOStatement $statementUpdateOneWithImg;
  private PDOStatement $statementUpdateOneWithoutImg;
  private PDOStatement $statementReadOne;
  private PDOStatement $statementReadAllRecentPosts;
  private PDOStatement $statementReadAllUserPosts;
  private PDOStatement $statementReadAllPostLikes;
  private PDOStatement $statementCreatePostLike;
  private PDOStatement $statementDeletePostLike;
  private PDOStatement $statementFetchPostWithTerm;

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
    $this->statementReadAllRecentPosts = $pdo->prepare('SELECT * FROM post ORDER BY created DESC');
    $this->statementReadAllUserPosts = $pdo->prepare('SELECT * FROM post WHERE authorId=:authorId');
    $this->statementReadAllPostLikes = $pdo->prepare('SELECT * FROM post_likes WHERE idpost=:idpost');
    $this->statementCreatePostLike = $pdo->prepare(
      '
      INSERT INTO post_likes (
      iduser,
      idpost
      ) VALUES (
      :iduser,
      :idpost
      )
      '
    );
    $this->statementDeletePostLike = $pdo->prepare('DELETE FROM post_likes WHERE iduser=:iduser AND idpost=:idpost');


    $this->statementFetchPostWithTerm = $pdo->prepare('SELECT * FROM post WHERE caption LIKE :term');
  }

  public function fetchAllRecentPosts(): array
  {
    $this->statementReadAllRecentPosts->execute();
    return $this->statementReadAllRecentPosts->fetchAll();
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
    } else {
      $response = ['status' => 1, 'message' => 'Echec de la création du post !'];
    }
    echo json_encode($response);
  }

  public function deleteOne(int $id): void
  {
    $this->statementDeleteOne->bindValue(':id', $id);
    if ($this->statementDeleteOne->execute()) {
      $response = ['status' => 1, 'message' => 'Post supprimé avec succès !'];
    } else {
      $response = ['status' => 0, 'message' => 'Echec de supression du post !'];
    }
    echo json_encode($response);
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
    $this->statementReadAllUserPosts->bindValue(':authorId', $authorId);
    $this->statementReadAllUserPosts->execute();
    return $this->statementReadAllUserPosts->fetchAll();
  }

  public function fetchPostLikes(int $id): array
  {
    $this->statementReadAllPostLikes->bindValue(':idpost', $id);
    $this->statementReadAllPostLikes->execute();
    return $this->statementReadAllPostLikes->fetchAll();
  }

  public function  createPostLike($likeInfo): void
  {
    $this->statementCreatePostLike->bindParam(':iduser', $likeInfo['iduser'], PDO::PARAM_INT);
    $this->statementCreatePostLike->bindParam(':idpost', $likeInfo['idpost'], PDO::PARAM_INT);
    if ($this->statementCreatePostLike->execute()) {
      $response = ['status' => 1, 'message' => 'Like créer avec succès !'];
    } else {
      $response = ['status' => 1, 'message' => 'Echec de la demande de like/dislike !'];
    }
    echo json_encode($response);
  }

  public function  deletePostLike($likeInfo): void
  {
    $this->statementDeletePostLike->bindParam(':iduser', $likeInfo['iduser'], PDO::PARAM_INT);
    $this->statementDeletePostLike->bindParam(':idpost', $likeInfo['idpost'], PDO::PARAM_INT);
    if ($this->statementDeletePostLike->execute()) {
      $response = ['status' => 1, 'message' => 'Like retiré avec succès !'];
    } else {
      $response = ['status' => 0, 'message' => 'Echec de supression du like !'];
    }
    echo json_encode($response);
  }

  public function searchPostIncludeTerm(string $term): array
  {
    $this->statementFetchPostWithTerm->bindParam(':term', $term);
    if ($this->statementFetchPostWithTerm->execute()) {
      return $this->statementFetchPostWithTerm->fetchAll();
    }
  }
}

return new PostDB($pdo);
