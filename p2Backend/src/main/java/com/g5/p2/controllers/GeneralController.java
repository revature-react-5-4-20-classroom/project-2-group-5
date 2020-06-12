package com.g5.p2.controllers;

import java.util.LinkedHashMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.g5.p2.models.Users;
import com.g5.p2.services.UsersService;

@RestController
public class GeneralController {

    @Autowired
    UsersService usersService;
    
	@GetMapping("/hello")
	public String testEndpoint() {
		return "hello";
	}
	
	@PostMapping("/login")
	public Users attemptLogin(@RequestBody LinkedHashMap<String, String> c) {
	  return usersService.findOneUser(c.get("username"), c.get("password"));
	}
	
	//logout
	
	//getCredentials
	
}
