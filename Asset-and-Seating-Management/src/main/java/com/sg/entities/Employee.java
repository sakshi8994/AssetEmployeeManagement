package com.sg.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
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
	 
	 @Column(nullable = false)
	 private String role;
	 @Column(nullable = false, unique = true)
	    private String name;
	 @Column(nullable = false)
	    private String email;
	 @Column(nullable = false)
	    private String department;
	 @Column(nullable = false)
	    private String designation;
	    
	    @Column(nullable = false)
	    private String password;
        
//	    @JsonIgnore
	    @OneToOne
	    @JoinColumn(name = "seat_id")
	    private Seat seat;
}
