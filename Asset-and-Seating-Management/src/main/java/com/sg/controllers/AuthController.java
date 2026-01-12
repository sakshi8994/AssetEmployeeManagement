package com.sg.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sg.dto.LoginRequestDTO;
import com.sg.dto.SignupRequestDTO;
import com.sg.repositories.EmployeeRepository;
import com.sg.services.EmployeeService;

import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

	 
	   
	    
	   private final EmployeeService employeeService;
	    
	    @PostMapping("/signup")
	    public ResponseEntity<String> signup(@RequestBody SignupRequestDTO signupRequestDTO){
	    	
	    	  
	    	return ResponseEntity.ok(employeeService.signup(signupRequestDTO));
	    }
	    
	    
	    @PostMapping("/login")
	    public ResponseEntity<?> login(@RequestBody LoginRequestDTO request) {
             
	    	return ResponseEntity.ok(employeeService.login(request));
	       
	    }

}
