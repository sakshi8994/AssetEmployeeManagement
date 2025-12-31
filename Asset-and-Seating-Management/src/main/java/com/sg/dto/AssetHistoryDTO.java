package com.sg.dto;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class AssetHistoryDTO {

	
	private Long historyId;
	private String action;
	private LocalDateTime timestamp;
	private Long assetId;
	private String assetTag;
	private Long employeeId;
	private String employeeName;
	
}
