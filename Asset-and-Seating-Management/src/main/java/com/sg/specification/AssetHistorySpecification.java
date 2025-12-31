package com.sg.specification;

import org.springframework.data.jpa.domain.Specification;


import com.sg.entities.AssetHistory;

public class AssetHistorySpecification {
	 public static Specification<AssetHistory> hasHistoryId(Long historyId) {
	        return (root, query, cb) ->
	        historyId == null ? null :
	                        cb.equal(root.get("historyId"), historyId);
	    }
	 
	 public static Specification<AssetHistory> hasAction(String action) {
	        return (root, query, cb) ->
	        action == null ? null :
	                        cb.equal(root.get("action"),  action);
	    }
	 
	 
	 public static Specification<AssetHistory> hasAssetId(Long assetId) {
	        return (root, query, cb) ->
	        assetId == null ? null :
	                        cb.equal(root.get("assetId"),  assetId);
	    }
	 
	 public static Specification<AssetHistory> hasAssetTag(String assetTag) {
	        return (root, query, cb) ->
	        assetTag == null ? null :
	                        cb.equal(root.get("assetTag"),  assetTag);
	    }
	 
	 public static Specification<AssetHistory> hasEmployeeId(Long employeeId) {
	        return (root, query, cb) ->
	        employeeId == null ? null :
	                        cb.equal(root.get("assetTag"),  employeeId);
	    }
	 
	 public static Specification<AssetHistory> hasEmployeeName(String employeeName) {
	        return (root, query, cb) ->
	        employeeName == null ? null :
	                        cb.equal(root.get("employeeName"),  employeeName);
	    }
	 
	 
	 
	    
}
