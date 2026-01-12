package com.sg.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.sg.entities.Employee;
import com.sg.entities.Seat;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long>,JpaSpecificationExecutor<Employee>  {

	Employee findBySeat_SeatId(Long seatId);

	boolean existsByEmail(String email);

	Optional<Employee> findByEmail(String email);
}
