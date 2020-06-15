package com.g5.p2.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.g5.p2.models.Messages;
import com.g5.p2.services.MessagesServiceImplementation;

@RequestMapping(path = "/messages")
@RestController
public class MessagesController {

  @Autowired
  MessagesServiceImplementation messagesService;
  
  //get all messages sent  to receiver 
  @GetMapping("/user/{authorId}")
  public List<Messages> getUserMessages(@PathVariable Integer authorId) {
    return messagesService.getByAuthor(authorId);
  }
  
  //get conversation between author ID and userId
  @GetMapping("/author/{authorId}/{userId}")
  public List<Messages> getConversation(@PathVariable Integer authorId, @PathVariable Integer userId) {
    return messagesService.getByAuthorAndUser(authorId, userId);
  }
  
  // post message with author and receiver
  
}
