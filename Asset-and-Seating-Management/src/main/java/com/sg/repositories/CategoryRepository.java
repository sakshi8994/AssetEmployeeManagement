package com.sg.repositories;



import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.sg.entities.AssetHistory;
import com.sg.entities.Category;

@Repository
public interface CategoryRepository extends  JpaRepository<Category, Long>,JpaSpecificationExecutor<Category> {

	 Optional<Category> findByName(String name);

	 

}
