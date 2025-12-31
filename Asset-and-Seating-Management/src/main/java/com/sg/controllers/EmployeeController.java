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

import com.sg.dto.EmployeeDTO;

import com.sg.entities.Employee;
import com.sg.services.EmployeeService;

import lombok.RequiredArgsConstructor;


@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/employee")
@RequiredArgsConstructor
public class EmployeeController {

	private final EmployeeService employeeService;
	
	@PostMapping
	public ResponseEntity<Employee> create(@RequestBody EmployeeDTO employeeDTO){
		return ResponseEntity.status(HttpStatus.CREATED).body(employeeService.createEmployee(employeeDTO));
	}
	@GetMapping
	public ResponseEntity<List<Employee>>getAll(){
		List<Employee>list = employeeService.getAllEmployee();
		 if (list.isEmpty()) {
		        return ResponseEntity.noContent().build();
		    }
		return ResponseEntity.ok(list);
	}
	@GetMapping("/{id}")
	public ResponseEntity<Employee>getById(@PathVariable Long id ){
		return ResponseEntity.ok(employeeService.getEmployeeById(id));
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<Employee>update(@PathVariable Long id,@RequestBody EmployeeDTO employeeDTO){
	 return ResponseEntity.status(HttpStatus.OK)
             .body(employeeService.updateEmployee(id, employeeDTO))	;
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<String>delete(@PathVariable Long id){
		employeeService.deleteEmployee(id);
		return ResponseEntity.status(HttpStatus.OK)
                .body("Employee Deleted Successfully");
	}
	
	 @GetMapping("/search")
	    public ResponseEntity<Page<Employee>> search(
	            @RequestParam(required=false) String name,
	            @RequestParam(required = false) String department,
	            @RequestParam(required = false) String designation,
	            @RequestParam(required=false)String email,
	            @RequestParam(defaultValue = "0") int page,
	            @RequestParam(defaultValue = "10") int size,
	            @RequestParam(defaultValue = "employeeId") String sortBy,
	            @RequestParam(defaultValue = "asc") String direction
	    ) {
		 
		 Sort sort = direction.equalsIgnoreCase("desc")
	                ? Sort.by(sortBy).descending()
	                : Sort.by(sortBy).ascending();

	        Pageable pageable = PageRequest.of(page, size, sort);
	        
	        return  ResponseEntity.ok(employeeService.search(name,department,designation,email,pageable));
	    }
	
}
