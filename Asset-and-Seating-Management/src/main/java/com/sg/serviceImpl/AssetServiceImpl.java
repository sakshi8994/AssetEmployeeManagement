package com.sg.serviceImpl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.sg.dto.AssetCreateDTO;
import com.sg.dto.AssetUpdateDTO;
import com.sg.entities.Asset;
import com.sg.entities.AssetHistory;
import com.sg.entities.Category;
import com.sg.entities.Employee;
import com.sg.exception.ResourceNotFoundException;
import com.sg.repositories.AssetHistoryRepository;
import com.sg.repositories.AssetRepository;
import com.sg.repositories.CategoryRepository;
import com.sg.repositories.EmployeeRepository;
import com.sg.services.AssetService;
import com.sg.specification.AssetSpecification;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AssetServiceImpl implements AssetService   {
	
	
	private final AssetRepository assetRepo;
	
	private final EmployeeRepository employeeRepo;
	
	private final AssetHistoryRepository historyRepo;
	 private final CategoryRepository categoryRepo;
	 
	 

	@Override
	public Asset createAsset( AssetCreateDTO assetDTO) {
		// TODO Auto-generated method stub
		Category category = categoryRepo.findById(assetDTO.getCategoryId()).get();
		Asset asset = new Asset();
		asset.setAssetTag(assetDTO.getAssetTag());
		asset.setBrand(assetDTO.getBrand());
		asset.setModel(assetDTO.getModel());
		asset.setSerialNumber(assetDTO.getSerialNumber());
		asset.setCategory(category);
		asset.setStatus("Available");
		Asset saved = assetRepo.save(asset);
		saveHistory(saved,null,"CREATED");
		return asset;
	}

	@Override
	public Asset getAsset(Long assetId) {
		// TODO Auto-generated method stub
		Asset asset = assetRepo.findById(assetId)
				.orElseThrow(()->new ResourceNotFoundException("Asset not found with id : "+assetId));
		return asset;
	}

	@Override
	public List<Asset> getAllAssets() {
		// TODO Auto-generated method stub
		    List<Asset>assetList = assetRepo.findAll();
		return assetList;
	}

	@Override
	public Asset updateAsset(Long id, AssetUpdateDTO  assetDTO) {
		// TODO Auto-generated method stub
		
		   Asset existing = assetRepo.findById(id)
		            .orElseThrow(() -> new ResourceNotFoundException("Asset not found with id : "+id));

		   

		    if (assetDTO.getAssetTag() != null)
		        existing.setAssetTag(assetDTO.getAssetTag());

//		    if (assetDTO.getAssignedTo() != null)
//		        existing.setAssignedTo(updatedAsset.getAssignedTo());

		    if (assetDTO.getBrand() != null)
		        existing.setBrand(assetDTO.getBrand());

		    if (assetDTO.getCategoryId() != null) {
		    	
		    	 Long categoryId = assetDTO.getCategoryId();
		    	Category category =  categoryRepo.findById(categoryId)
		    			.orElseThrow(()->new ResourceNotFoundException("Category Does not found : "+ categoryId));
		    			
		    	 existing.setCategory(category);
		    }
		    	
		       

		    if (assetDTO.getModel() != null)
		    	
		        existing.setModel(assetDTO.getModel());

		    if (assetDTO.getStatus() != null)
		    {
		    	if("Available".equals(assetDTO.getStatus())|| "Retired".equals(assetDTO.getStatus())) {
		    		
		    		existing.setAssignedTo(null);
		    	}
		   
		    		existing.setStatus(assetDTO.getStatus());	
		    	
		    }
		    
		    if(assetDTO.getEmployeeId()!=null) {
		    	 Employee employee = employeeRepo.findById(assetDTO.getEmployeeId())
	    				 .orElseThrow(()->new ResourceNotFoundException("Employee  not found with ID : "+ assetDTO.getEmployeeId()));
	    		existing.setAssignedTo(employee);
		    }
		        

		    if (assetDTO.getSerialNumber() != null)
		        existing.setSerialNumber(assetDTO.getSerialNumber());

		    Asset saved = assetRepo.save(existing);

		    saveHistory(saved, saved.getAssignedTo(), "UPDATED");

		    return saved;
	}

	@Override
	public void deleteAsset(Long assetId) {
		// TODO Auto-generated method stub
		assetRepo.deleteById(assetId);
		
	}

	@Override
	public Asset assignAsset(Long assetId, Long empId) {
		// TODO Auto-generated method stub
		
		Asset asset = assetRepo.findById(assetId)
				.orElseThrow(()->new ResourceNotFoundException("Asset not found with id : "+assetId));
		Employee emp = employeeRepo.findById(empId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id : "+empId));
		
		if(!asset.getStatus().equals("Available"))
            throw new ResourceNotFoundException("Asset is not available");
		
		 asset.setAssignedTo(emp);
	     asset.setStatus("Assigned");
	     
	     Asset saved = assetRepo.save(asset);
	        saveHistory(saved, emp, "ASSIGNED");

	        return saved;
	 
	}

	@Override
	public Asset revokeAsset(Long assetId) {
		// TODO Auto-generated method stub
		Asset asset = assetRepo.findById(assetId)
                .orElseThrow(() -> new ResourceNotFoundException("Asset not found with id : "+assetId));
		
		  if (asset.getAssignedTo() == null) {
		        throw new RuntimeException("Asset is not assigned to any employee");
		    }
		
	     Employee emp = asset.getAssignedTo();
	     
	     asset.setAssignedTo(null);
	        asset.setStatus("Available");
		
	        Asset saved = assetRepo.save(asset);
	        saveHistory(saved, emp, "REVOKED");

	        return saved;
	}
	
	 private void saveHistory(Asset asset, Employee emp, String action) {
	        AssetHistory history = new AssetHistory();
	        history.setAsset(asset);
	        history.setEmployee(emp);
	        history.setAction(action);
	        history.setTimestamp(LocalDateTime.now());
	        historyRepo.save(history);
	    }

	 @Override
	 public List<Asset> getListByStatus(String status) {
		// TODO Auto-generated method stub
		 List<Asset>list = assetRepo.findByStatus(status);
		 
		return list;
	 }

	 @Override
	 public List<Asset> getListByCategory(Long categoryId) {
		// TODO Auto-generated method stub
		 List<Asset>list=assetRepo.findByCategory_CategoryId(categoryId);
		return list;
	 }
	 
	 @Override
	 public Page<Asset> search( String status,
		        Long categoryId,
		        String model,
		        String brand, String employeeName, String categoryName , Long employeeId,Pageable pageable) {

	     Specification<Asset> spec = Specification
	             .where(AssetSpecification.hasStatus(status))
	             .and(AssetSpecification.hasCategory(categoryId))
	             .and(AssetSpecification.hasBrand(brand))
	             .and(AssetSpecification.hasModel(model))
	             .and(AssetSpecification.hasEmployeeName(employeeName))
	             .and(AssetSpecification.hasCategoryName(categoryName))
	             .and(AssetSpecification.hasEmployeeId(employeeId));

	     Page<Asset> assetPage = assetRepo.findAll(spec, pageable);

	     return assetPage;
	      
	    
	 }

}
