package com.sg.services;

import java.util.List;

import org.jspecify.annotations.Nullable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.sg.dto.AssetHistoryResponseDTO;
import com.sg.entities.AssetHistory;

public interface AssetHistoryService {
   
	List<AssetHistory> getHistoryByAsset(Long assetId);
	List<AssetHistory>getHistoryByEmployee(Long employeeId);
	
	Page<AssetHistoryResponseDTO>search(Long historyId, String action, Long assetId, String assetTag, Long employeeId, String employeeName,
			Pageable pageable);
	
	Page<AssetHistoryResponseDTO>getAll(Pageable pageable);
}
