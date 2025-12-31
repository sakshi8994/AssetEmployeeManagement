package com.sg.utils;



import org.springframework.stereotype.Service;

import com.sg.dto.AssetDTO;
import com.sg.dto.AssetHistoryDTO;
import com.sg.dto.AssetHistoryResponseDTO;
import com.sg.dto.CategoryDTO;
import com.sg.dto.EmployeeDTO;
import com.sg.dto.SeatDTO;
import com.sg.entities.Asset;
import com.sg.entities.AssetHistory;
import com.sg.entities.Category;
import com.sg.entities.Employee;
import com.sg.entities.Seat;

@Service
public class DtoMapper {
    
//	public static Asset toAssetEntity() {
//		
//		Asset asset = new Asset();
//		
//	}
	
	
	public static CategoryDTO toCategoryDTO(Category c) {
		
		
		if(c==null) return null;
		
		CategoryDTO dto = new CategoryDTO();
		dto.setCategory(c.getCategoryId());
		dto.setName(c.getName());
		
		return dto;
		
	}
	
	public static SeatDTO toSeatDTO(Seat seat) {
		
		if(seat == null) return null;
		
		SeatDTO dto = new SeatDTO();
		
//	     dto.setSeatId(seat.getSeatId());
	     dto.setFloor(seat.getFloor());
	     dto.setRowNum(seat.getRowNum());
	     dto.setStatus(seat.getStatus());
	     dto.setColNum(seat.getColNum());
	     
	     return dto;
		
	}
	
	public static EmployeeDTO toEmployeeDTO(Employee e) {
		
		 if (e == null) return null;

	        EmployeeDTO dto = new EmployeeDTO();
//	        dto.setEmployeeId(e.getEmployeeId());
	        dto.setName(e.getName());
	        dto.setEmail(e.getEmail());
	        dto.setDepartment(e.getDepartment());
	        dto.setDesignation(e.getDesignation());
	        dto.setSeatId((e.getSeat().getSeatId()));

	        return dto;
	}
	
	 public static AssetDTO toAssetDTO(Asset asset) {
	        if (asset == null) return null;

	        AssetDTO dto = new AssetDTO();
	        dto.setAssetId(asset.getAssetId());
	        dto.setAssetTag(asset.getAssetTag());
	        dto.setBrand(asset.getBrand());
	        dto.setModel(asset.getModel());
	        dto.setSerialNumber(asset.getSerialNumber());
	        dto.setStatus(asset.getStatus());

	        dto.setCategory(toCategoryDTO(asset.getCategory()));

	        if (asset.getAssignedTo() != null) {
	            dto.setEmployeeId(asset.getAssignedTo().getEmployeeId());
	            dto.setEmployeeName(asset.getAssignedTo().getName());
	        }

	        return dto;
	    }
	 
	 public static AssetHistoryDTO toHistoryDTO(AssetHistory h) {

	        AssetHistoryDTO dto = new AssetHistoryDTO();
	        dto.setHistoryId(h.getHistoryId());
	        dto.setAction(h.getAction());
	        dto.setTimestamp(h.getTimestamp());

	        if (h.getAsset() != null) {
	            dto.setAssetId(h.getAsset().getAssetId());
	            dto.setAssetTag(h.getAsset().getAssetTag());
	        }

	        if (h.getEmployee() != null) {
	            dto.setEmployeeId(h.getEmployee().getEmployeeId());
	            dto.setEmployeeName(h.getEmployee().getName());
	        }

	        return dto;
	    }
	 
	 public static AssetHistoryResponseDTO toDTO(AssetHistory history) {
		 
		 AssetHistoryResponseDTO historyDTO = new  AssetHistoryResponseDTO();
		 
		 if(history.getHistoryId()!=null)
		 historyDTO.setHistoryId(history.getHistoryId());
		 
		 if(history.getAsset()!=null)
		 historyDTO.setAssetId(history.getAsset().getAssetId());
		 
		 if(history.getAction()!=null)
		 historyDTO.setAction(history.getAction());
		 
		 if(history.getAsset()!=null)
		 historyDTO.setAssetTag( history.getAsset().getAssetTag());
		 
		
		 historyDTO.setEmployeeId(  history.getEmployee() != null ? history.getEmployee().getEmployeeId() : null);
		 
		 historyDTO.setEmployeeName(history.getEmployee() != null ? history.getEmployee().getName() : null);
		 
		 if(history.getTimestamp()!=null)
		 historyDTO.setTimestamp(history.getTimestamp());
		 
	        return historyDTO;
	    }
	 
	
}
