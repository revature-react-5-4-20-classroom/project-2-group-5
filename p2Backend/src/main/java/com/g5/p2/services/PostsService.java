package com.g5.p2.services;

import java.util.List;

import com.g5.p2.models.Posts;
import com.g5.p2.models.Users;

public interface PostsService {
	
	List<Posts> getAll();
	
	Posts getById(Integer postId);
	
	List<Posts> getByUserId(Integer userId);
	
	List<Posts> getPostBySubscribees(Integer userId);
	
	Posts create(Posts p, Integer userId);
	
	Posts update(Posts p, Integer userId);
	
	Posts createOrUpdate(Posts p);
	
	boolean delete(Integer postId);
}
