package com.g5.p2.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import com.g5.p2.exceptions.UserNotFoundException;
import com.g5.p2.models.Users;
import com.g5.p2.repositories.UsersRepository;

@Service
@Primary
public class UsersServiceImplementation implements UsersService{

	@Autowired
	UsersRepository usersRepository;
	
	@Override
	public List<Users> getAll() {
		return usersRepository.findAll();
	}

	@Override
	public Users getById(Integer userId) {	
		Optional<Users> u = usersRepository.findById(userId);
		if(u.isPresent()) {
			return u.get();
		}
		else {
			throw new UserNotFoundException();
		}
	}

	@Override
	public Users create(Users u) {
		u.setUserId(usersRepository.findAll().get(usersRepository.findAll().size()-1).getUserId() + 1);
		return usersRepository.save(u);
	}

	@Override
	public Users update(Users u) {
		
		Optional<Users> existingUser = usersRepository.findById(u.getUserId());
		if(existingUser.isPresent()) {
			return usersRepository.save(u);
		}
		else {
			throw new UserNotFoundException();
		}
	}

	@Override
	public Users createOrUpdate(Users u) {
		return usersRepository.save(u);
	}
	
//    @Override  --- working login route
//    public Users findOneUsers(String username, String password) {
//      Optional<Users> existingUser = usersRepository.findByUsernameAndPassword(username, password);
//      if (existingUser.isPresent()) {
//        return existingUser.get();
//      } else {
//        throw new UserNotFoundException();
//      }
//    }

	@Override
	public boolean delete(Integer userId) {
		Optional<Users> existingUser = usersRepository.findById(userId);
		if(existingUser.isPresent()) {
			usersRepository.deleteById(userId);
			return true;
		}
		else {
			return false;
		}
	}

}
