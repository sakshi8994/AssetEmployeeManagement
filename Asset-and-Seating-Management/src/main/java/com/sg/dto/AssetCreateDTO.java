package com.sg.dto;

import lombok.Data;

@Data
public class AssetCreateDTO {
 
	private String assetTag;
	private Long categoryId;
	private String brand;
	private String serialNumber;
	 private String model;
}
