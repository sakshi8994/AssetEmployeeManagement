package com.sg.services;

import org.springframework.http.ResponseEntity;

import com.sg.dto.DashboardSummaryDTO;

public interface DashboardService {

	DashboardSummaryDTO getSummary();

}
