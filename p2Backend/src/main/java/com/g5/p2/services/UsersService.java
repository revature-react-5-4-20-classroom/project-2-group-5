package com.g5.p2.services;

import java.util.List;
import java.util.Optional;

import org.springframework.web.multipart.MultipartFile;

import com.g5.p2.models.Users;

public interface UsersService {

  List<Users> getAll(Users u);

  // Users login(String username, String password); - working on login route

  Users getById(Integer userId);

  List<Users> getLikeUsername(String username, Users session);

  Users create(Users u);

  Users update(Users u);

  Users createOrUpdate(Users u);

  boolean delete(Integer userId);

  Users findOneUser(String username);

  Users findOneUser(String username, String password);

  Users saveFile(MultipartFile file, Integer id);

  Optional<Users> getfile(Integer fileId);

}
