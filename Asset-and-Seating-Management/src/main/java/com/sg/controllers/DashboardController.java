package com.sg.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sg.dto.DashboardSummaryDTO;
import com.sg.services.DashboardService;
import com.sg.services.EmployeeService;

import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

	
	private final DashboardService dashboardService;
	
	
	@PreAuthorize("hasAnyRole('ADMIN','USER')")
	@GetMapping("/summary")
	public ResponseEntity<DashboardSummaryDTO> getSummary(){
		return ResponseEntity.ok(dashboardService.getSummary()) ;
	}
	
}
