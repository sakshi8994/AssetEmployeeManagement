package com.sg.serviceImpl;

import java.util.List;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.sg.dto.EmployeeDTO;
import com.sg.dto.LoginRequestDTO;
import com.sg.dto.SignupRequestDTO;
import com.sg.entities.Asset;
import com.sg.entities.Employee;
import com.sg.entities.Seat;
import com.sg.exception.ResourceNotFoundException;
import com.sg.repositories.EmployeeRepository;
import com.sg.repositories.SeatRepository;
import com.sg.security.JwtService;
import com.sg.services.EmployeeService;
import com.sg.specification.AssetSpecification;
import com.sg.specification.EmployeeSpecification;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmployeeServiceImpl implements EmployeeService{
	
	private final EmployeeRepository employeeRepo;
	
	private final SeatRepository seatRepo;
	
	 private final PasswordEncoder passwordEncoder;
	 
	 private final JwtService jwtService;


	@Override
	public Employee createEmployee(EmployeeDTO employeeDTO) {
		// TODO Auto-generated method stub
		
		Employee employee = new Employee();
		employee.setDepartment(employeeDTO.getDepartment());
		employee.setDesignation(employeeDTO.getDesignation());
		employee.setEmail(employeeDTO.getEmail());
		employee.setName(employeeDTO.getName());
		employee.setPassword(passwordEncoder.encode("12345"));
		employee.setRole(
				  employeeDTO.getRole() != null ? employeeDTO.getRole() : "ROLE_USER"
				);

		if(employeeDTO.getSeatId()!=null) {
			Long seatId =employeeDTO.getSeatId();
			Seat seat = seatRepo.findById(seatId)
					.orElseThrow(()->new  ResourceNotFoundException("Seat not found with id : "+ seatId));
			seat.setStatus("Occupied");
			seatRepo.save(seat);
			employee.setSeat(seat);
		}
		
		
	
		return employeeRepo.save(employee);
	}

	@Override
	public List<Employee> getAllEmployee() {
		// TODO Auto-generated method stub
		  return employeeRepo.findAll();
	}

	@Override
	public Employee getEmployeeById(Long id) {
		// TODO Auto-generated method stub
		return employeeRepo.findById(id)
				.orElseThrow(()->new  ResourceNotFoundException("Employee not found with id : "+ id));
	}

	@Override
	public Employee updateEmployee(Long id, EmployeeDTO employeeDTO) {
		// TODO Auto-generated method stub
		Employee existing = employeeRepo.findById(id)
				.orElseThrow(()->new  ResourceNotFoundException("Employee not found with id : "+ id));
		if(employeeDTO.getDepartment()!=null) {
			existing.setDepartment(employeeDTO.getDepartment());
		}
		if(employeeDTO.getDesignation()!=null) {
			existing.setDesignation(employeeDTO.getDesignation());
		}
		if(employeeDTO.getEmail()!=null) {
			existing.setEmail(employeeDTO.getEmail());
		}
		
		if(employeeDTO.getName() !=null) {
			existing.setName(employeeDTO.getName());
		}
		
		if(employeeDTO.getSeatId()!=null) {
			
			Seat seat = seatRepo.findById(employeeDTO.getSeatId())
					.orElseThrow(()->new  ResourceNotFoundException("Seat not found with id : "+ employeeDTO.getSeatId()));
			if("Occupied".equals(seat.getStatus())) {
				throw new ResourceNotFoundException("Given seat is already assigned with seatId : "+ employeeDTO.getSeatId());
			}
			seat.setStatus("Occupied");
			seatRepo.save(seat);
			existing.setSeat(seat);
		}
		employeeRepo.save(existing);
		return existing;
	}

	@Override
	public void deleteEmployee(Long id) {
		// TODO Auto-generated method stub
		Employee emp = employeeRepo.findById(id).get();
		
		Seat seat  = emp.getSeat();
		if(seat!=null && seat.getStatus().equals("Occupied")) {
			seat.setStatus("Free");
		}
		employeeRepo.deleteById(id);
		
	}
	
	 @Override
	 public Page<Employee> search(  String name ,String department,String designation,String email,Pageable pageable) {

	     Specification<Employee> spec = Specification
	             .where(EmployeeSpecification.hasDepartment(department))
	             .and(EmployeeSpecification.hasName(name))
	             .and(EmployeeSpecification.hasDesignation(designation))
	             .and(EmployeeSpecification.hasEmail(email));

	     Page<Employee> employeePage = employeeRepo.findAll(spec, pageable);

	     return employeePage;
	 }

	 @Override
	 public String signup(SignupRequestDTO signupRequestDTO) {
		// TODO Auto-generated method stub
		 if(employeeRepo.existsByEmail(signupRequestDTO.getEmail())) {
			 return "Email already exists" ;
		 }
		 
		 Employee emp = new Employee();
	        emp.setName(signupRequestDTO.getName());
	        emp.setEmail(signupRequestDTO.getEmail());
	        emp.setPassword(passwordEncoder.encode(signupRequestDTO.getPassword()));
	        emp.setRole("ROLE_USER"); // default
	        
	        employeeRepo.save(emp);
	        
	        return "User registered successfully";
		
	 }

	 @Override
	 public Map<String, Object> login(LoginRequestDTO request) {
		// TODO Auto-generated method stub
		Employee emp = employeeRepo.findByEmail(request.getEmail())
		            .orElseThrow(() -> new RuntimeException("Invalid credentials"));

		        if (!passwordEncoder.matches(request.getPassword(), emp.getPassword())) {
		            throw new RuntimeException("Invalid credentials");
		        }

		        String token = jwtService.generateToken(emp);

		        return 
		            Map.of(
		                "token", token,
		                "role", emp.getRole(),
		                "employeeId", emp.getEmployeeId()
		            );
		        
		
	 }
	 


}
