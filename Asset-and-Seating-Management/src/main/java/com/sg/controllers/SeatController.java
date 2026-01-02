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

import com.sg.dto.SeatDTO;
import com.sg.entities.Seat;
import com.sg.services.SeatService;

import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/seats")
@RequiredArgsConstructor
public class SeatController {

	private final SeatService seatService;
	
	@PostMapping
	public ResponseEntity<Seat> create(@RequestBody SeatDTO seatDTO) {
		return  ResponseEntity.status(HttpStatus.CREATED).body(seatService.createSeat(seatDTO));
	}
	
	@PostMapping("/floor")
	public ResponseEntity<String> createFloor(@RequestParam Integer floor,@RequestParam Integer columns, @RequestParam Integer rows){
		seatService.createFloor(floor,columns,rows);
		return ResponseEntity.status(HttpStatus.OK)
                .body("Floor Added Successfully");
		
	}
	
	@GetMapping
	public ResponseEntity<List<Seat>>getAll(){
		List<Seat>list=seatService.getAllSeats();
		if (list.isEmpty()) {
	        return ResponseEntity.noContent().build();
	    }
		return ResponseEntity.ok(list);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Seat>getById(@PathVariable Long id){
		  Seat seat=seatService.getSeatById(id);
		
		return ResponseEntity.ok(seat);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<Seat>update(@PathVariable Long id , @RequestBody SeatDTO seatDTO){
		return ResponseEntity.status(HttpStatus.OK)
                .body(seatService.updateSeat(id, seatDTO));
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<String >delete(@PathVariable Long id) {
		
		seatService.deleteSeat(id);
		return ResponseEntity.status(HttpStatus.OK)
                .body("Seat deleted successfully");
	}
	
	@PostMapping("/{seatId}/assign")
	public ResponseEntity<Seat> assignSeat(
	        @PathVariable Long seatId,
	        @RequestParam Long employeeId) {

	    return ResponseEntity.ok(seatService.assignSeat(seatId, employeeId));
	}

	@PostMapping("/{seatId}/release")
	public ResponseEntity<Seat> releaseSeat(@PathVariable Long seatId) {
	    return ResponseEntity.ok(seatService.releaseSeat(seatId));
	}
	
	@GetMapping("/status/{status}")
	public ResponseEntity<List<Seat>> getListByStatus(@PathVariable String status){
		List<Seat>list = seatService.getListByStatus(status);
		return ResponseEntity.ok(list);
	}
	
	

	@GetMapping("/search")
	public ResponseEntity<Page<Seat>>search( 
			@RequestParam(required = false) Long seatId,
			@RequestParam(required = false) Integer floor,
			@RequestParam(required = false) Integer colNum,
			@RequestParam(required = false) Integer rowNum,
			@RequestParam(required = false) String status,
			@RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "seatId") String sortBy,
            @RequestParam(defaultValue = "asc") String direction
			){
		
		Sort sort = direction.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);
        
		return ResponseEntity.ok(seatService.searchSeat(seatId,floor,colNum,rowNum,status,pageable)) ;
		
	}

	
}
