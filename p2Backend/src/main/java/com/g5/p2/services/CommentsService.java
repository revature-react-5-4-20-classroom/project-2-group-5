package com.g5.p2.services;

import java.util.List;
import com.g5.p2.models.Comments;

public interface CommentsService {

  List<Comments> getAll();
  
  Comments getById(Integer commentId);
  
  List<Comments> getByPost(Integer postId);
  
  List<Comments> getByAuthor(Integer userId);
  
  Comments create(Comments c, Integer postId, Integer userId);
  
  Comments update(Comments c, Integer postId, Integer userId);
  
  Comments createOrUpdate(Comments c);
  
  boolean delete(Integer commentId);
  
}
