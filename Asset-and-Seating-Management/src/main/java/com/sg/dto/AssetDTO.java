package com.sg.dto;

import lombok.Data;

@Data
public class AssetDTO {

	private Long assetId;
	private String assetTag;
	private String brand;
	private String Model;
	private String serialNumber;
	private String status;
	
	private CategoryDTO category;
	
	private Long employeeId;
	private String employeeName;
	
}
