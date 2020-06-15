package com.g5.p2.controllers;

import java.util.LinkedHashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
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
  
  //get messages to and from author
  @GetMapping("/{userId}")
  public List<Messages> getMessagesByUser(@PathVariable Integer userId){
      return messagesService.getByUser(userId);
  }
  
  //get messages by author and receiver
  @GetMapping("/{authorId}/{receiverId}")
  public List<Messages> getMessages(@PathVariable Integer authorId, @PathVariable Integer receiverId){
      return messagesService.getByConversation(authorId, receiverId);
  }
  
  //post messages
  @PostMapping
  public Messages postMessage(@RequestBody LinkedHashMap<String, Object> message) {
      Messages m = new Messages((Integer)message.get("messageId"), (String)message.get("content"));
      return messagesService.create(m, (Integer)message.get("author"), (Integer)message.get("receiver"));
  }
  
}
