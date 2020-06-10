package com.g5.p2.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GeneralController {

	@GetMapping("/hello")
	public String testEndpoint() {
		return "hello";
	}
	
	//login
	
	//logout
	
	//getCredentials
	
}
