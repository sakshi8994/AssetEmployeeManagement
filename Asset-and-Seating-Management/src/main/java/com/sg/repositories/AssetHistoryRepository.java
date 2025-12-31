package com.sg.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.sg.entities.Asset;
import com.sg.entities.AssetHistory;

@Repository
public interface AssetHistoryRepository extends JpaRepository<AssetHistory, Long>,JpaSpecificationExecutor<AssetHistory> {

	List<AssetHistory> findByAsset_AssetId(Long assetId);
	List<AssetHistory>findByEmployee_EmployeeId(Long employeeId);
}
