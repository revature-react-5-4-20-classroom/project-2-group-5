package com.g5.p2.controllers;

import java.util.List;

import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpStatus;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.server.ResponseStatusException;

import com.g5.p2.exceptions.UserNotFoundException;
import com.g5.p2.models.Users;
import com.g5.p2.services.UsersServiceImplementation;
import com.google.common.net.HttpHeaders;

@RequestMapping(path = "/users")
@RestController
public class UsersController {

  @Autowired
  UsersServiceImplementation usersService;

  // get all users
  @GetMapping
  public List<Users> getUser(HttpSession s) {
    return usersService.getAll((Users) s.getAttribute("user"));
  }

  // get users by id
  @GetMapping("/{userId}")
  public Users getUserById(@PathVariable Integer userId) {
    try {
      Users u = usersService.getById(userId);
      return u;
    } catch (UserNotFoundException e) {
      e.printStackTrace();
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User Not Found", e);
    }

  }

  // get users by username
  @GetMapping("/username/{username}")
  // public Users[] getUserLikeUsername(@PathVariable String username) {
  // return usersService.getLikeUsername(username);
  public List<Users> getUserLikeUsername(@PathVariable String username, HttpSession s) {
    return usersService.getLikeUsername(username, (Users) s.getAttribute("user"));
  }

  // create a user
  @PostMapping
  public Users createUser(@RequestBody Users u) {
    return usersService.create(u);
  }

  // update a user
  @PatchMapping
  public Users updateUser(@RequestBody Users u) {
    try {
      return usersService.update(u);
    } catch (UserNotFoundException e) {
      e.printStackTrace();
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User Not Found", e);
    }
  }


  
  

  // delete user
  @DeleteMapping("{userId}")
  public boolean deleteUser(@PathVariable Integer userId) {
    try {
      return usersService.delete(userId);
    } catch (UserNotFoundException e) {
      e.printStackTrace();
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User Not Found", e);
    }
  }

}
