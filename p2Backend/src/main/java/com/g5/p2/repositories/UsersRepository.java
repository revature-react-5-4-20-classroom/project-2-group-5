package com.g5.p2.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.g5.p2.models.Users;

@Repository
public interface UsersRepository extends JpaRepository<Users, Integer> {
	Users findByUserId(Integer userId);

	Users findByUsername(String username);

	Users findByUsernameAndPassword(String username, String password);
}
