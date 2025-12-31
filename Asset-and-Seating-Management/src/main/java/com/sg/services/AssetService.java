package com.sg.services;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.sg.dto.AssetCreateDTO;
import com.sg.dto.AssetUpdateDTO;
import com.sg.entities.Asset;


public interface AssetService {

	Asset createAsset( AssetCreateDTO assetDTO);
	Asset getAsset(Long id);
	List<Asset>getAllAssets();
	Asset updateAsset(Long id, AssetUpdateDTO  assetDTO);
	void deleteAsset(Long assetId);
	Asset assignAsset(Long assetId ,Long empId);
	Asset revokeAsset(Long assetId);
	List<Asset> getListByStatus(String status);
	List<Asset> getListByCategory(Long categoryId);
	Page<Asset> search(
	        String status,
	        Long categoryId,
	        String model,
	        String brand, String employeeName, String CategoryName , Long employeeId, Pageable pageable
	);
	
}
