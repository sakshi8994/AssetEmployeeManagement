package com.sg.services;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.sg.dto.EmployeeDTO;
import com.sg.entities.Asset;
import com.sg.entities.Employee;

public interface EmployeeService {
  
	Employee createEmployee(EmployeeDTO employeeDTO);
	List<Employee> getAllEmployee();
	Employee getEmployeeById(Long id);
	Employee updateEmployee(Long id ,EmployeeDTO employeeDTO);
	void deleteEmployee(Long id);
	public Page<Employee> search(String name, String brand,String designation,String email,Pageable pageable);
}
