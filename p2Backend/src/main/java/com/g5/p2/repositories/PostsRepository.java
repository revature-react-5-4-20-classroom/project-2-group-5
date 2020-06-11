package com.g5.p2.repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.g5.p2.models.Posts;
import com.g5.p2.models.Users;

@Repository
public interface PostsRepository extends JpaRepository<Posts, Integer>{
	Posts findByPostId(Integer postId);
	List<Posts> findByAuthor(Users author);
	
}
