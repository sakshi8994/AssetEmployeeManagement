package com.sg.services;

import java.util.List;

import org.jspecify.annotations.Nullable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

import com.sg.dto.SeatDTO;
import com.sg.entities.Seat;

public interface SeatService {
  Seat createSeat(SeatDTO seatDTO);
  List<Seat>getAllSeats();
  Seat getSeatById(Long seatId);
  Seat updateSeat(Long seatId,SeatDTO seatDTO);
  void deleteSeat(Long seatId);
  Seat assignSeat(Long seatId , Long employeeId);
  Seat releaseSeat(Long seatId);
  List<Seat> getListByStatus(String status);
  
  Page<Seat> searchSeat(Long seatId, Integer floor, Integer colNum, Integer rowNum, String status, Pageable pageable);
 
  void createFloor(Integer floor, Integer columns, Integer rows);
}
