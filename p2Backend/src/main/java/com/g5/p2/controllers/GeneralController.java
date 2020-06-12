package com.g5.p2.controllers;

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
	
	//login - in progress
//	@PostMapping("/login")
//	public String login(@RequestBody String username, String password) {
//	  return usersService.login(username, password);
//	}
	
	//logout
	
	//getCredentials
	
}
