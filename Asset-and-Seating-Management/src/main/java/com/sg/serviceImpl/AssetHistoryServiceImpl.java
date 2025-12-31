package com.sg.serviceImpl;

import java.util.List;

import org.jspecify.annotations.Nullable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.sg.dto.AssetHistoryResponseDTO;
import com.sg.entities.Asset;
import com.sg.entities.AssetHistory;
import com.sg.exception.ResourceNotFoundException;
import com.sg.repositories.AssetHistoryRepository;
import com.sg.services.AssetHistoryService;
import com.sg.specification.AssetHistorySpecification;
import com.sg.specification.AssetSpecification;
import com.sg.utils.DtoMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AssetHistoryServiceImpl implements AssetHistoryService{
	
	private final AssetHistoryRepository historyRepo;

	@Override
	public List<AssetHistory> getHistoryByAsset(Long assetId) {
		// TODO Auto-generated method stub
		List<AssetHistory>history = historyRepo.findByAsset_AssetId(assetId);
		
		if(history.isEmpty()) {
			throw new ResourceNotFoundException("No history found for asset id : "+assetId);
		}
		return history;
	}

	@Override
	public List<AssetHistory> getHistoryByEmployee(Long employeeId) {
		// TODO Auto-generated method stub
		
		List<AssetHistory>history =historyRepo.findByEmployee_EmployeeId(employeeId);
		if(history.isEmpty()) {
			throw new ResourceNotFoundException("No history found for employee id : "+employeeId);
		}
		return history;
	}

	@Override
	public @Nullable Page<AssetHistoryResponseDTO> search(Long historyId, String action, Long assetId, String assetTag,
			Long employeeId, String employeeName, Pageable pageable) {
		// TODO Auto-generated method stub
		
		 Specification<AssetHistory> spec = Specification
	             .where(AssetHistorySpecification.hasHistoryId(historyId))
	             .and(AssetHistorySpecification.hasAction(action))
	             .and(AssetHistorySpecification.hasEmployeeId(employeeId))
	             .and(AssetHistorySpecification.hasEmployeeName(employeeName))
	             .and(AssetHistorySpecification.hasAssetId(assetId))
	             .and(AssetHistorySpecification.hasAssetTag(assetTag));
         
		 
		 Page<AssetHistory>historyPage = historyRepo.findAll(spec, pageable);
//	     Page<AssetHistoryResponseDTO> assetHistoryPage = historyRepo.findAll(spec, pageable);

		 
		 if (historyPage.isEmpty()) {
		        throw new ResourceNotFoundException("No asset history found");
		    }
	    return historyPage.map(DtoMapper::toDTO);
		
	}

	@Override
	public Page<AssetHistoryResponseDTO> getAll(Pageable pageable) {
		// TODO Auto-generated method stub
		Page<AssetHistory> historyPage = historyRepo.findAll(pageable);
		
		if(historyPage.isEmpty()) {
			throw new ResourceNotFoundException("No asset history found");
		}
		
		 return historyPage.map(DtoMapper::toDTO);
	}

}
