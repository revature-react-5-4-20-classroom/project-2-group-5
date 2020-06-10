package com.g5.p2.services;

import java.util.List;

import com.g5.p2.models.Posts;

public interface PostsService {
	
	List<Posts> getAll();
	
	Posts getById(Integer postId);
	
	Posts create(Posts u);
	
	Posts update(Posts u);
	
	Posts createOrUpdate(Posts u);
	
	boolean delete(Integer postId);
}
