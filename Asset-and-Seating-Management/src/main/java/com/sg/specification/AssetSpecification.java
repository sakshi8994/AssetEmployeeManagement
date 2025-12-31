package com.sg.specification;

import org.springframework.data.jpa.domain.Specification;

import com.sg.entities.Asset;
import com.sg.entities.AssetHistory;

public class AssetSpecification {
      
	public static Specification<Asset> hasStatus(String status) {
        return (root, query, cb) ->
                status == null ? null : cb.equal(root.get("status"), status);
    }

    public static Specification<Asset> hasCategory(Long categoryId) {
        return (root, query, cb) ->
                categoryId == null ? null :
                        cb.equal(root.get("category").get("categoryId"), categoryId);
    }
    
    public static Specification<Asset>hasBrand(String brand){
    	return (root,query,cb)->
    	         brand==null ? null :
    	        	 cb.equal(root.get("brand"),brand);
    }
    public static Specification<Asset> hasEmployeeId(Long employeeId) {
        return (root, query, cb) ->
        employeeId == null ? null :
                        cb.equal(root.get("assignedTo").get("employeeId"),  employeeId);
    }
 
 public static Specification<Asset> hasEmployeeName(String employeeName) {
        return (root, query, cb) ->
        employeeName == null ? null :
                        cb.equal(root.get("assignedTo").get("name"),  employeeName);
    }
 
 public static Specification<Asset>hasModel(String model){
 	return (root,query,cb)->
 	         model==null ? null :
 	        	 cb.equal(root.get("model"),model);
 }
 
 public static Specification<Asset> hasCategoryName(String categoryName) {
     return (root, query, cb) ->
     categoryName == null ? null :
                     cb.equal(root.get("category").get("name"),  categoryName);
}
 }
