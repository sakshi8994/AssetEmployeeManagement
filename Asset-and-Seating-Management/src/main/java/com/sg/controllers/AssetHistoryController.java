package com.sg.controllers;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sg.dto.AssetHistoryResponseDTO;
import com.sg.entities.AssetHistory;
import com.sg.services.AssetHistoryService;

import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/history")
@RequiredArgsConstructor
public class AssetHistoryController {
	
	private final AssetHistoryService historyService;
	
	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/asset/{assetId}")
	public ResponseEntity<List<AssetHistory>> getByAsset(@PathVariable Long assetId){
		return ResponseEntity.ok(historyService.getHistoryByAsset(assetId));
		
		
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/employee/{employeeId}")
	public ResponseEntity<List<AssetHistory>>getByEmployee(@PathVariable Long employeeId){
		return ResponseEntity.ok(historyService.getHistoryByEmployee(employeeId));
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping()
	public ResponseEntity<Page<AssetHistoryResponseDTO>>getAll(
			@RequestParam(defaultValue="0") int page,
			@RequestParam(defaultValue="10") int size,
			@RequestParam(defaultValue="historyId") String sortBy,
			@RequestParam(defaultValue="asc")String direction			
			){
		Sort sort = direction.equalsIgnoreCase("desc")
				? Sort.by(sortBy).descending()
			    : Sort.by(sortBy).ascending();
		Pageable pageable = PageRequest.of(page, size, sort);
		return ResponseEntity.ok(historyService.getAll(pageable));
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/search")
	public ResponseEntity<Page<AssetHistoryResponseDTO>>search(
			@RequestParam(required = false) Long historyId,
			@RequestParam(required = false) String action,
			@RequestParam(required = false) Long assetId,
			@RequestParam(required = false) String assetTag,
			@RequestParam(required = false) Long employeeId,
			@RequestParam(required = false) String employeeName,
			@RequestParam(required = false)
			@DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
		    LocalDate timestamp,
			@RequestParam(defaultValue = "0") int page,
	        @RequestParam(defaultValue = "10") int size,
	        @RequestParam(defaultValue = "historyId") String sortBy,
	        @RequestParam(defaultValue = "asc") String direction
			){
		
		Sort sort = direction.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);
        return ResponseEntity.ok(historyService.search(historyId,action,assetId,assetTag,employeeId,employeeName,timestamp,pageable));
	}

}
