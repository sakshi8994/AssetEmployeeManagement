package com.sg.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "employee")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Employee {

	
	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long employeeId;

	    private String name;
	    private String email;
	    private String department;
	    private String designation;
        
//	    @JsonIgnore
	    @OneToOne
	    @JoinColumn(name = "seat_id")
	    private Seat seat;
}
