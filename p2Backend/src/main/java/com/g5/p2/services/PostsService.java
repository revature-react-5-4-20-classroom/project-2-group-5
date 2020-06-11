package com.g5.p2.services;

import java.util.List;

import com.g5.p2.models.Posts;

public interface PostsService {
	
	List<Posts> getAll();
	
	Posts getById(Integer postId);
	
	List<Posts> getByUserId(Integer userId);
	
	Posts create(Posts p, Integer userId);
	
	Posts update(Posts p);
	
	Posts createOrUpdate(Posts p);
	
	boolean delete(Integer postId);
}
