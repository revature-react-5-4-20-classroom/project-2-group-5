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
      return usersService.getById(userId);
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

  @PostMapping(path = "/upload/{userid}", consumes = "multipart/form-data")
  public ResponseEntity<?> saveEnvironmentConfig(MultipartHttpServletRequest request,
      @PathVariable Integer userid) {
    // System.out.println(request.getContentType());
    MultipartFile file = request.getFile("file");
    usersService.saveFile(file, userid);
    return ResponseEntity.ok().body("picture uploaded");

    // public String uploadImage(@RequestParam("files") MultipartHttpServletRequest request) {
    // MultipartFile mPF = request.getFile(files);
    // System.out.println("vlsigje");
    // usersService.saveFile(mPF);
    // return "redirect:/";
  }

  @GetMapping("showFile/{userId}")
  public ResponseEntity<ByteArrayResource> downloadfile(@PathVariable Integer userId) {
    Users users = usersService.getfile(userId).get();
    return ResponseEntity.ok().contentType(MediaType.parseMediaType(users.getPictureType()))
        .header(HttpHeaders.CONTENT_DISPOSITION,
            "attachment:filename=\"" + users.getPictureName() + "\"")
        .body(new ByteArrayResource(users.getPic()));

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
