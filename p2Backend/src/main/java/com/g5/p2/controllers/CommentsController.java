package com.g5.p2.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.g5.p2.services.CommentsServiceImplementation;

@RequestMapping(path = "/comments")
@RestController
public class CommentsController {
  
  @Autowired
  CommentsServiceImplementation commentsService;
 
  //get comments by postId
  
  //create comment
  
}
