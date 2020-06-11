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

import com.g5.p2.models.Posts;
import com.g5.p2.services.PostsServiceImplementation;

@RequestMapping(path = "/posts")
@RestController
public class PostsController {

	@Autowired
	PostsServiceImplementation postsService;
	
	//get all posts
	@GetMapping
	public List<Posts> getPosts() {;
		return postsService.getAll();
	}
	
	//create post
	@PostMapping
    public Posts createPost(@RequestBody LinkedHashMap<String, Object> p) {
	    try {
	        Posts convert = new Posts((Integer)p.get("postId"), (Integer)p.get("datePosted"), (String)p.get("title"), (String)p.get("content"));
	        return postsService.create(convert, (Integer)p.get("author"));
	    }
	    catch(Exception e) {
	        e.printStackTrace();
	        throw e;
	    }
    }
	
	//get post by author id
	@GetMapping("/{userId}")
    public List<Posts> getPostsByAuthorId(@PathVariable Integer userId) {;
        return postsService.getByUserId(userId);
    }
	
	
}
