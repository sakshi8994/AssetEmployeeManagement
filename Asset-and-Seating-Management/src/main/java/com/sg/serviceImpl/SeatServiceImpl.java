package com.sg.serviceImpl;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.sg.dto.SeatDTO;
import com.sg.entities.Asset;
import com.sg.entities.Employee;
import com.sg.entities.Seat;
import com.sg.exception.ResourceNotFoundException;
import com.sg.repositories.EmployeeRepository;
import com.sg.repositories.SeatRepository;
import com.sg.services.SeatService;
import com.sg.specification.AssetSpecification;
import com.sg.specification.SeatSpecification;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SeatServiceImpl implements SeatService{
	
	private final SeatRepository seatRepo;
	
	private final EmployeeRepository employeeRepo;

	@Override
	public Seat createSeat(SeatDTO seatDTO) {
		// TODO Auto-generated method stub
		Seat seat = new Seat();
		seat.setColNum(seatDTO.getColNum());
		seat.setFloor(seatDTO.getFloor());
		seat.setRowNum(seatDTO.getRowNum());
		seat.setStatus("Free");
		return seatRepo.save(seat);
	}

	@Override
	public List<Seat> getAllSeats() {
		// TODO Auto-generated method stub
		return seatRepo.findAll();
	}

	@Override
	public Seat getSeatById(Long seatId) {
		// TODO Auto-generated method stub
		return seatRepo.findById(seatId).orElseThrow(()->new ResourceNotFoundException("Seat not found with id : "+seatId));
	}

	@Override
	public Seat updateSeat(Long seatId, SeatDTO seatDTO) {
		// TODO Auto-generated method stub
		Seat existing =  seatRepo.findById(seatId)
                .orElseThrow(() -> new ResourceNotFoundException("Seat not found with id: " + seatId));
		
		if(seatDTO.getFloor() != null) {
			existing.setFloor(seatDTO.getFloor());
		}
		
		if(seatDTO.getColNum() !=null) {
			existing.setColNum(seatDTO.getColNum());
		}
		
		if(seatDTO.getRowNum() != null) {
			existing.setRowNum(seatDTO.getColNum());
		}
		
		if(seatDTO.getStatus()!=null) {
			existing.setStatus(seatDTO.getStatus());
		}
		
		return seatRepo.save(existing);
	}

	@Override
	public void deleteSeat(Long seatId) {
		// TODO Auto-generated method stub
		
		seatRepo.deleteById(seatId);
        
		
	}

	@Override
	public Seat assignSeat(Long seatId, Long employeeId) {
		// TODO Auto-generated method stub
		
		Seat seat  = seatRepo.findById(seatId)
				.orElseThrow(()->new ResourceNotFoundException("Seat not found with id: " + seatId));
		
		 if (!"Free".equalsIgnoreCase(seat.getStatus())) {
		        throw new RuntimeException("Seat is already occupied");
		    }
		 
		Employee employee= employeeRepo.findById(employeeId)
				.orElseThrow(()->new ResourceNotFoundException("Employee not found with id : "+employeeId));
		
		if (employee.getSeat() != null) {
	        throw new RuntimeException("Employee already has a seat");
	    }
		seat.setStatus("Occupied");
	     employee.setSeat(seat);
	     employeeRepo.save(employee);
	     
		
		return seatRepo.save(seat);
	}

	@Override
	public Seat releaseSeat(Long seatId) {
		// TODO Auto-generated method stub
		Seat seat = seatRepo.findById(seatId)
				.orElseThrow(()-> new ResourceNotFoundException("Seat not found woth id : "+seatId));
		
		if("Free".equalsIgnoreCase(seat.getStatus())) {
			throw new RuntimeException("Seat is already free");
		}
		
		Employee employee = employeeRepo.findAll()
				.stream()
				.filter(e->e.getSeat()!=null && e.getSeat().getSeatId().equals(seatId))
				.findFirst()
				.orElseThrow(()->new RuntimeException("No Employee assigned to this seat"));
		
		employee.setSeat(null);
		seat.setStatus("Free");
		
		employeeRepo.save(employee);
		return seatRepo.save(seat);
		
	}

	@Override
	public List<Seat> getListByStatus(String status) {
		// TODO Auto-generated method stub
		List<Seat>list = seatRepo.findByStatus(status);
		return list;
	}

	@Override
	public Page<Seat> searchSeat(Long seatId, Integer floor, Integer colNum, Integer rowNum, String status,
			Pageable pageable) {
		// TODO Auto-generated method 

		 Specification<Seat> spec = Specification
	             .where(SeatSpecification.hasStatus(status))
	             .and(SeatSpecification.hasSeatId(seatId))
	             .and(SeatSpecification.hasColNum(colNum))
	             .and(SeatSpecification.hasRowNum(rowNum))
	             .and(SeatSpecification.hasFloor(floor));
	            

	     Page<Seat> seatPage = seatRepo.findAll(spec, pageable);

		return seatPage;
	}

	@Override
	public void createFloor(Integer floor, Integer columns, Integer rows) {
		// TODO Auto-generated method stub
		
		for (int r = 1; r <= rows; r++) {
			  for (int c = 1; c <= columns; c++) {
			    Seat seat = new Seat();
			    seat.setFloor(floor);
			    seat.setRowNum(r);
			    seat.setColNum(c);
			    seat.setStatus("Free");
			    seatRepo.save(seat);
			  }
			}

		return ;
	}

}
