package com.sg.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "seat")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Seat {

	
	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long seatId;

	    private Integer floor;
	    private Integer rowNum;
	    private Integer colNum;

	    private String status;  // Free / Occupied
}
