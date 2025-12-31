package com.sg.specification;

import org.springframework.data.jpa.domain.Specification;

import com.sg.entities.Employee;



public class EmployeeSpecification {
	
	public static Specification<Employee> hasName(String name) {
        return (root, query, cb) ->
                name == null ? null : cb.equal(root.get("name"), name);
    }
	
	public static Specification<Employee>hasDepartment(String department){
		
		return (root,query,cb)->
		      department==null?null :cb.equal(root.get("department"), department);
	}
	
	
	public static Specification<Employee>hasDesignation(String designation){
		return (root,query,cb)->
		     designation==null?null:cb.equal(root.get("designation"), designation);
	}
	
	
	public static Specification<Employee>hasEmail(String email){
		return (root,query,cb)->
		     email==null?null:cb.equal(root.get("email"), email);
	}
	
	
}
