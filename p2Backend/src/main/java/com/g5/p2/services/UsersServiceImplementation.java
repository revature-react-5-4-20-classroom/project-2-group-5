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
public class UsersServiceImplementation implements UsersService {

  @Autowired
  UsersRepository usersRepository;

  @Override
  public List<Users> getAll(Users session) {
    List<Users> users = usersRepository.findAll();
    
    users = checkBlocked(session, users);
    
    return users;
  }

  @Override
  public Users getById(Integer userId) {
    Optional<Users> u = usersRepository.findById(userId);
    if (u.isPresent()) {
      return u.get();
    } else {
      throw new UserNotFoundException();
    }
  }
  
  @Override
  public List<Users> getLikeUsername(String username, Users session) {
    List<Users> users = usersRepository.findLikeUsername(username + "%");
    
    users = checkBlocked(session, users);
    
    return users;
  }

  @Override
  public Users create(Users u) {
    u.setUserId(
        usersRepository.findAll().get(usersRepository.findAll().size() - 1).getUserId() + 1);
    return usersRepository.save(u);
  }

  @Override
  public Users update(Users u) {

    Optional<Users> existingUser = usersRepository.findById(u.getUserId());
    if (existingUser.isPresent()) {
      return usersRepository.save(u);
    } else {
      throw new UserNotFoundException();
    }
  }

  @Override
  public Users createOrUpdate(Users u) {
    return usersRepository.save(u);
  }

  @Override
  public Users findOneUser(String username) {
    return usersRepository.findByUsername(username);
  }

  @Override
  public Users findOneUser(String username, String password) {
    return usersRepository.findByUsernameAndPassword(username, password);
  }

  @Override
  public boolean delete(Integer userId) {
    Optional<Users> existingUser = usersRepository.findById(userId);
    if (existingUser.isPresent()) {
      usersRepository.deleteById(userId);
      return true;
    } else {
      return false;
    }
  }
  
  //u is the active user to check if they are blocked, users is the list of users that will end up returning
  //if the subscriber matches the user, and their subscription lists them as blocked, remove them from the list
  public List<Users> checkBlocked(Users u, List<Users> users){
    for (int i=0; i < u.getSubscriber().size(); i++) {
      for(int j=0; j < users.size(); j++) {
        if((u.getSubscriber().get(i).getSubscribee().getUserId() == users.get(j).getUserId())) {
          if(u.getSubscriber().get(i).isBlocked()) {
            users.remove(j);
            j--;
          }
          break;
        }
      }
   }
    return users;
  }
 
}
