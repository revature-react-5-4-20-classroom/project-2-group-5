package com.g5.p2.services;

import java.util.List;
import com.g5.p2.models.Messages;

public interface MessagesService {

  List<Messages> getAll();
  
  Messages getById(Integer messageId);
  
  List<Messages> getByUser(Integer userId);
  
  List<Messages> getByConversation(Integer authorId, Integer receiverId);
  
  Messages create(Messages m, Integer author, Integer receiver);
  
  Messages update(Messages m, Integer author, Integer receiver);
  
  Messages createOrUpdate(Messages m);
  
  boolean delete(Integer messageId);
  
}
