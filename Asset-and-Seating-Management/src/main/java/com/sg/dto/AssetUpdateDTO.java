package com.sg.dto;

import lombok.Data;

@Data
public class AssetUpdateDTO {

	private String assetTag;
	private String brand;
	private String model;
	private String serialNumber;
	private String status;
	private Long categoryId;
	private Long employeeId;
}
