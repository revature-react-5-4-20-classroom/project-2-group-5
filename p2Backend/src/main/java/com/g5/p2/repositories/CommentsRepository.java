package com.g5.p2.repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.g5.p2.models.Comments;
import com.g5.p2.models.Posts;
import com.g5.p2.models.Users;

@Repository
public interface CommentsRepository extends JpaRepository<Comments, Integer> {
  Comments findByCommentId(Integer commentId);
  List<Comments> findByPost(Posts post);
  List<Comments> findByAuthor(Users author);
}
