package com.sg.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "asset")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Asset {

	
	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long assetId;

	    @Column(unique = true)
	    private String assetTag;

	    @ManyToOne
	    @JoinColumn(name = "category_id")
	    private Category category;

	    private String brand;
	    private String model;
	    private String serialNumber;

	    private String status; // Available / Assigned / Repair / Lost / Retired
        
//	    @JsonIgnore
	    @ManyToOne
	    @JoinColumn(name = "assigned_to")
	    private Employee assignedTo;
	
}
