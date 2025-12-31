package com.sg.exception;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<Map<String,Object>>handleNotFound(ResourceNotFoundException ex){
		
		Map<String,Object> error = new HashMap<>();
		error.put("message", ex.getMessage());
		error.put("status", 404);
        error.put("timestamp", LocalDateTime.now());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
	}
	
	 @ExceptionHandler(IllegalStateException.class)
	    public ResponseEntity<String> handleIllegalState(IllegalStateException ex) {
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
	                             .body(ex.getMessage());
	    }

	    @ExceptionHandler(Exception.class)
	    public ResponseEntity<String> handleGeneral(Exception ex) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                             .body("Something went wrong");
	    }
}
