package com.sg.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.sg.entities.Asset;

@Repository
public interface AssetRepository extends JpaRepository<Asset, Long> , JpaSpecificationExecutor<Asset>{

	List<Asset> findByStatus(String status);

	 List<Asset> findByCategory_CategoryId(Long categoryId);

}
