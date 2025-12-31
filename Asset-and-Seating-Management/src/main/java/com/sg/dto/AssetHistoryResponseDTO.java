package com.sg.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AssetHistoryResponseDTO {
	private Long historyId;

    private Long assetId;
    private String assetTag;

    private Long employeeId;
    private String employeeName;

    private String action;
    private LocalDateTime timestamp;
}
