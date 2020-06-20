package com.g5.p2.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import com.g5.p2.exceptions.PostNotFoundException;
import com.g5.p2.models.Posts;
import com.g5.p2.models.Subscriptions;
import com.g5.p2.models.Users;
import com.g5.p2.repositories.PostsRepository;
import com.g5.p2.repositories.SubscriptionsRepository;
import com.g5.p2.repositories.UsersRepository;

@Service
@Primary
@Transactional
public class PostsServiceImplementation implements PostsService {
	
	@Autowired
	PostsRepository postsRepository;
	@Autowired
	UsersRepository usersRepository;
	@Autowired
	SubscriptionsRepository subscriptionsRepository;

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
	
	public List<Posts> getPostBySubscribees(Integer userId){
	    List<Posts> out = new ArrayList<Posts>();
	    Users subscriber = usersRepository.findByUserId(userId);
	    List<Subscriptions> subscriptions = subscriptionsRepository.findBySubscriber(subscriber);
	    for (Subscriptions s : subscriptions) {
	        out.addAll(s.getSubscribee().getPosts());
	    }
	    
	    return out;
	}

	@Override
	public Posts create(Posts p, Integer userId) {
		p.setPostId(postsRepository.findAll().get(postsRepository.findAll().size()-1).getPostId() + 1);
		p.setAuthor(usersRepository.findByUserId(userId));
		return postsRepository.save(p);
	}

	@Override
	public Posts update(Posts p, Integer userId) {
	    p.setAuthor(usersRepository.findByUserId(userId));
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
