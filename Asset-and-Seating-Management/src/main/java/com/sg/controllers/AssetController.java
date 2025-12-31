package com.sg.controllers;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sg.dto.AssetCreateDTO;
import com.sg.dto.AssetDTO;
import com.sg.dto.AssetUpdateDTO;
import com.sg.entities.Asset;
import com.sg.services.AssetService;
import com.sg.utils.DtoMapper;

import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/assets")
@RequiredArgsConstructor
public class AssetController {
	
	private final AssetService assetService;
	private final DtoMapper dtoMapper;
	
	@PostMapping
	 public ResponseEntity<Asset> create(@RequestBody AssetCreateDTO assetDTO) {
		
        return ResponseEntity.status(HttpStatus.CREATED).body(assetService.createAsset(assetDTO));
    }
	
	@GetMapping("/{id}")
    public ResponseEntity<Asset> get(@PathVariable Long id) {
		
        return ResponseEntity.ok(assetService.getAsset(id));
    }
	
	@GetMapping("/all")
	public ResponseEntity<List<Asset>>getAllAsset(){
		List<Asset>list=assetService.getAllAssets();
		  if (list.isEmpty()) {
		        return ResponseEntity.noContent().build();  
		    }
		return ResponseEntity.ok(list);
	}
	
	  @PostMapping("/{id}/assign")
	    public ResponseEntity<Asset> assign(
	            @PathVariable Long id,
	            @RequestParam Long employeeId
	    ) {
	        return ResponseEntity.ok(assetService.assignAsset(id, employeeId));
	    }

	    @PostMapping("/{id}/revoke")
	    public ResponseEntity<Asset> revoke(@PathVariable Long id) {
	        return ResponseEntity.ok(assetService.revokeAsset(id));
	    }
	
	    
	    @DeleteMapping("/{id}")
	    public ResponseEntity<String>deleteAsset(@PathVariable Long id ){
	    	assetService.deleteAsset(id);
	    	
	    	return ResponseEntity.status(HttpStatus.OK)
                    .body("Asset deleted successfully");
	    }
	    
	    @PutMapping("/{id}")
	    public ResponseEntity<Asset> updateAsset(@PathVariable Long id , @RequestBody  AssetUpdateDTO  assetDTO){
	    	
	    	return ResponseEntity.status(HttpStatus.OK)
                    .body(assetService.updateAsset(id, assetDTO));
	    }
	    
	    @GetMapping("/status/{status}")
	    public ResponseEntity<List<Asset>> getListByStatus(@PathVariable String status ){
	    	List<Asset>list = assetService.getListByStatus(status);
	    	return ResponseEntity.ok(list);
	    }
	    
	    @GetMapping("/category/{categoryId}")
	    public ResponseEntity<List<Asset>> getListByCategoryId(@PathVariable Long categoryId){
	    	List<Asset>list = assetService.getListByCategory(categoryId);
	    	return ResponseEntity.ok(list);
	    }
	    
	    @GetMapping("/search")
	    public ResponseEntity<Page<Asset>> search(
	            @RequestParam(required = false) String status,
	            @RequestParam(required = false) Long categoryId,
	            @RequestParam(required = false) String model,
	            @RequestParam(required = false) String brand,
	            @RequestParam(required=false) String employeeName,
	            @RequestParam(required=false) String categoryName,
	            @RequestParam(required = false) Long employeeId,
	            @RequestParam(defaultValue = "0") int page,
	            @RequestParam(defaultValue = "10") int size,
	            @RequestParam(defaultValue = "assetId") String sortBy,
	            @RequestParam(defaultValue = "asc") String direction
	    ) {
	    	
	    	Sort sort = direction.equalsIgnoreCase("desc")
	                ? Sort.by(sortBy).descending()
	                : Sort.by(sortBy).ascending();

	        Pageable pageable = PageRequest.of(page, size, sort);
	        return ResponseEntity.ok(assetService.search(status, categoryId,model,brand,employeeName,categoryName,employeeId,pageable));
	    }


}
