package com.g5.p2.services;

import java.util.List;
import java.util.Optional;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import com.g5.p2.exceptions.CommentNotFoundException;
import com.g5.p2.models.Comments;
import com.g5.p2.repositories.CommentsRepository;
import com.g5.p2.repositories.PostsRepository;
import com.g5.p2.repositories.UsersRepository;

@Service
@Primary
@Transactional
public class CommentsServiceImplementation implements CommentsService {

  @Autowired
  CommentsRepository commentsRepository;
  @Autowired
  UsersRepository usersRepository;
  @Autowired
  PostsRepository postsRepository;
  
  @Override
  public List<Comments> getAll() {
    return commentsRepository.findAll(); 
  }

  @Override
  public Comments getById(Integer commentId) {
    Optional<Comments> c = commentsRepository.findById(commentId);
    if(c.isPresent()) {
        return c.get();
    }
    else {
        throw new CommentNotFoundException();
    }
  }

  @Override
  public List<Comments> getByPost(Integer postId) {
    return commentsRepository.findByPost(postsRepository.findByPostId(postId));
  }

  @Override
  public List<Comments> getByAuthor(Integer userId) {
    return commentsRepository.findByAuthor(usersRepository.findByUserId(userId));
  }

  @Override
  public Comments create(Comments c, Integer postId, Integer userId) {
    c.setCommentId(commentsRepository.findAll().get(commentsRepository.findAll().size()-1).getCommentId() + 1);
    c.setPost(postsRepository.findByPostId(postId));
    c.setAuthor(usersRepository.findByUserId(userId));
    return commentsRepository.save(c);
  }

  @Override
  public Comments update(Comments c, Integer postId, Integer userId) {
    c.setPost(postsRepository.findByPostId(postId));
    c.setAuthor(usersRepository.findByUserId(userId));
    Optional<Comments> existingComment = commentsRepository.findById(c.getCommentId());
    if(existingComment.isPresent()) {
        return commentsRepository.save(c);
    }
    else {
        throw new CommentNotFoundException();
    }
  }

  @Override
  public Comments createOrUpdate(Comments c) {
    return commentsRepository.save(c);
  }

  @Override
  public boolean delete(Integer commentId) {
    Optional<Comments> existingComment = commentsRepository.findById(commentId);
    if(existingComment.isPresent()) {
        commentsRepository.deleteById(commentId);
        return true;
    }
    else {
        return false;
    }
  }

}
