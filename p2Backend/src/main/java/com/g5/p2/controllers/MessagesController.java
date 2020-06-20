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
  
  //get list of users w/messages that have conversations open with the current user
  @GetMapping("/user/{userId}")
  public List<Messages> getUserMessages(@PathVariable Integer userId) {
    List<Messages> messages = messagesService.getByUser(userId);
    
    messages = checkBlocked(userId, messages);
    
    return messages;
  }
  
  //get conversation between author ID and userId
  @GetMapping("/author/{authorId}/{userId}")
  public List<Messages> getConversation(@PathVariable Integer authorId, @PathVariable Integer userId) {
    List<Messages> messages = messagesService.getByAuthorAndUser(authorId, userId);
    
    messages = checkBlocked(userId, messages);
    
    return messages;
  }
  
  //post messages
  @PostMapping
  public Messages postMessage(@RequestBody LinkedHashMap<String, Object> message) {
      Messages m = new Messages((Integer)message.get("messageId"), (String)message.get("content"));
      return messagesService.create(m, (Integer)message.get("author"), (Integer)message.get("receiver"));
  }
  
  
  public List<Messages> checkBlocked(Integer userId, List<Messages> messages){
    boolean blocked = false;
    for (int i=0; i < messages.size(); i++) {
      if(userId != messages.get(i).getAuthor().getUserId()) {
        for (int j=0; j < messages.get(i).getAuthor().getSubscribee().size(); j++) {
          if(messages.get(i).getAuthor().getSubscribee().get(j).getSubscriber().getUserId() == userId) {
            if(messages.get(i).getAuthor().getSubscribee().get(j).isBlocked()){
              messages.remove(i);
              i--;
              blocked = true;
              break;
            }
          }
        }
        if(blocked) {
          blocked = false;
          continue;
        }
        for (int j=0; j < messages.get(i).getAuthor().getSubscriber().size(); j++) {
          if(messages.get(i).getAuthor().getSubscribee().get(j).getSubscribee().getUserId() == userId) {
            if(messages.get(i).getAuthor().getSubscribee().get(j).isBlocked()){
              messages.remove(i);
              i--;
              break;
            }
          }
        }
      }
      else {
        for (int j=0; j < messages.get(i).getReceiver().getSubscribee().size(); j++) {
          if(messages.get(i).getReceiver().getSubscribee().get(j).getSubscriber().getUserId() == userId) {
            if(messages.get(i).getReceiver().getSubscribee().get(j).isBlocked()){
              messages.remove(i);
              i--;
              blocked = true;
              break;
            }
          }
        }
        if(blocked) {
          blocked = false;
          continue;
        }
        for (int j=0; j < messages.get(i).getReceiver().getSubscriber().size(); j++) {
          if(messages.get(i).getReceiver().getSubscribee().get(j).getSubscribee().getUserId() == userId) {
            if(messages.get(i).getReceiver().getSubscribee().get(j).isBlocked()){
              messages.remove(i);
              i--;
              break;
            }
          }
        }
      }
    }
    return messages;
  }
  
  
}
