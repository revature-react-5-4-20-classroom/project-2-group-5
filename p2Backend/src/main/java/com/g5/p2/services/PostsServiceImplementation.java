package com.g5.p2.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import com.g5.p2.exceptions.PostNotFoundException;
import com.g5.p2.models.Posts;
import com.g5.p2.repositories.PostsRepository;
import com.g5.p2.repositories.UsersRepository;

@Service
@Primary
public class PostsServiceImplementation implements PostsService {
	
	@Autowired
	PostsRepository postsRepository;
	@Autowired
	UsersRepository usersRepository;

	@Override
	public List<Posts> getAll() {
		return postsRepository.findAll();
	}

	@Override
	public Posts getById(Integer postId) {
		Optional<Posts> p = postsRepository.findById(postId);
		if(p.isPresent()) {
			return p.get();
		}
		else {
			throw new PostNotFoundException();
		}
	}
	
	@Override
    public List<Posts> getByUserId(Integer userId) {
       return postsRepository.findByAuthor(usersRepository.findByUserId(userId));
    }

	@Override
	public Posts create(Posts p, Integer userId) {
		p.setPostId(postsRepository.findAll().get(postsRepository.findAll().size()-1).getPostId() + 1);
		p.setAuthor(usersRepository.findByUserId(userId));
		return postsRepository.save(p);
	}

	@Override
	public Posts update(Posts p) {
		Optional<Posts> existingPost = postsRepository.findById(p.getPostId());
		if(existingPost.isPresent()) {
			return existingPost.get();
		}
		else {
			throw new PostNotFoundException();
		}
	}

	@Override
	public Posts createOrUpdate(Posts p) {
		return postsRepository.save(p);
	}

	@Override
	public boolean delete(Integer postId) {
		Optional<Posts> existingPost = postsRepository.findById(postId);
		if(existingPost.isPresent()) {
			postsRepository.deleteById(postId);
			return true;
		}
		else {
			return false;
		}
	}

}
