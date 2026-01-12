package com.sg.dto;

import lombok.Data;

@Data
public class DashboardSummaryDTO {
  
	

	private Long totalAssets;
	private Long assignedAssets;
	private Long availableAssets;
	private Long repairAssets;
	private Long totalSeats;
	private Long occupiedSeats;
	private  Long freeSeats;
	
	
}
