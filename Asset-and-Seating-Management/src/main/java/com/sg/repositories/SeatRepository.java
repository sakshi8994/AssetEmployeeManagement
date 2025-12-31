package com.sg.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.sg.entities.Seat;

@Repository
public interface SeatRepository extends JpaRepository<Seat, Long>,JpaSpecificationExecutor<Seat> {
            
	List<Seat>findByStatus(String status);
}
