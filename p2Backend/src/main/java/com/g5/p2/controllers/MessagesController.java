package com.g5.p2.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.g5.p2.services.MessagesServiceImplementation;

@RequestMapping(path = "/messages")
@RestController
public class MessagesController {

  @Autowired
  MessagesServiceImplementation messagesService;
  
  //get messages by author and receiver
  
}
