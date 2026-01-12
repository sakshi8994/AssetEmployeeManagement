package com.sg.serviceImpl;

import org.springframework.stereotype.Service;

import com.sg.dto.DashboardSummaryDTO;
import com.sg.repositories.AssetRepository;
import com.sg.repositories.CategoryRepository;
import com.sg.repositories.SeatRepository;
import com.sg.services.DashboardService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {
	
	private final AssetRepository assetRepo;
	private final SeatRepository seatRepo;

	@Override
	public DashboardSummaryDTO getSummary() {
		// TODO Auto-generated method stub
		DashboardSummaryDTO summaryDTO = new DashboardSummaryDTO();
		
//		"totalAssets": 120,
//		  "assignedAssets": 80,
//		  "availableAssets": 30,
//		  "repairAssets": 10,
//
//		  "totalSeats": 150,
//		  "occupiedSeats": 90,
//		  "freeSeats": 60
		
		Long totalAssets = assetRepo.count();
		Long assignedAssets= assetRepo.countByStatus("Assigned");
		Long availableAssets=assetRepo.countByStatus("Available");
		Long repairAssets = assetRepo.countByStatus("Repair");
		
		
		Long totalSeats = seatRepo.count();
		Long occupiedSeats=seatRepo.countByStatus("Occupied");
		Long freeSeats = seatRepo.countByStatus("Free");
		
		
		summaryDTO.setAssignedAssets(assignedAssets);
		summaryDTO.setAvailableAssets(availableAssets);
		summaryDTO.setRepairAssets(repairAssets);
		summaryDTO.setTotalAssets(totalAssets);
		summaryDTO.setTotalSeats(totalSeats);
		summaryDTO.setFreeSeats(freeSeats);
		summaryDTO.setOccupiedSeats(occupiedSeats);
		  
		  
		return summaryDTO;
	}

}
