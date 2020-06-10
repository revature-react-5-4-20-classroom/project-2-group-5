package com.g5.p2.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.g5.p2.models.Posts;
import com.g5.p2.services.PostsServiceImplementation;

@RequestMapping(path = "/posts")
@RestController
public class PostsController {

	@Autowired
	PostsServiceImplementation postsService;
	
	@GetMapping
	public List<Posts> getPosts() {;
		return postsService.getAll();
	}
	
	//create post
	
	//update post
	
	//get post by author id
	
	
	
	
}
