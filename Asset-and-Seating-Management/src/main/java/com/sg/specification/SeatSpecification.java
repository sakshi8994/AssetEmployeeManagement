package com.sg.specification;

import org.springframework.data.jpa.domain.Specification;

import com.sg.entities.Seat;



public class SeatSpecification {
	public static Specification<Seat> hasStatus(String status) {
        return (root, query, cb) ->
        status == null ? null : cb.equal(root.get("status"), status);
    }
	
	public static Specification<Seat> hasSeatId(Long seatId){
		return (root , query , cb)->
		seatId == null ? null : cb.equal(root.get("seatId"),seatId);
	}
	
	public static Specification<Seat> hasRowNum(Integer rowNum){
		return (root , query , cb)->
		rowNum == null ? null : cb.equal(root.get("rowNum"),rowNum);
	}
	
	public static Specification<Seat> hasColNum(Integer colNum){
		return (root , query , cb)->
		colNum == null ? null : cb.equal(root.get("colNum"),colNum);
	}
	
	
	public static Specification<Seat> hasFloor(Integer floor){
		return (root , query , cb)->
		floor == null ? null : cb.equal(root.get("floor"),floor);
	}
	
}
