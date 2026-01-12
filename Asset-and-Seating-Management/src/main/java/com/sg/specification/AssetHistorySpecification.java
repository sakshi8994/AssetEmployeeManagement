package com.sg.specification;

import java.time.LocalDateTime;

import org.springframework.data.jpa.domain.Specification;


import com.sg.entities.AssetHistory;

import jakarta.persistence.criteria.JoinType;

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
		 return (root, query, cb) -> {
		        if (assetId == null) return null;
		        return cb.equal(
		            root.join("asset", JoinType.LEFT).get("assetId"),
		            assetId
		        );
		    };
	    }
	 
	 public static Specification<AssetHistory> hasAssetTag(String assetTag) {
	        return (root, query, cb) ->
	        assetTag == null ? null :
	                        cb.equal(root.get("asset").get("assetTag"),  assetTag);
	    }
	 
	 public static Specification<AssetHistory> hasEmployeeId(Long employeeId) {
		 return (root, query, cb) -> {
		        if (employeeId == null) return null;
		        return cb.equal(
		            root.join("employee", JoinType.LEFT).get("employeeId"),
		            employeeId
		        );
		    };
	    }
	 
	 public static Specification<AssetHistory> hasEmployeeName(String name) {
		 return (root, query, cb) -> {
		        if (name == null) return null;
		        return cb.equal(
		            root.join("employee", JoinType.LEFT).get("name"),
		            name
		        );
		    };
	    }
	    
	 
  
public static Specification<AssetHistory> hasTimestampBetween(
        LocalDateTime start,
        LocalDateTime end
) {
    return (root, query, cb) -> {
        if (start == null || end == null) return null;
        return cb.between(root.get("timestamp"), start, end);
    };
}

}


	 
	 
	    

