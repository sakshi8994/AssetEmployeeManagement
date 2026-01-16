package com.sg.kafka;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import com.sg.dto.AuditEvent;
import com.sg.entities.AssetHistory;
import com.sg.repositories.AssetHistoryRepository;
import com.sg.repositories.AssetRepository;
import com.sg.repositories.EmployeeRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class AuditConsumer {

    private final AssetHistoryRepository  historyRepo;
    private final AssetRepository assetRepo;
    private final EmployeeRepository employeeRepo;

    @KafkaListener(
    	    topics = "audit-events",
    	    groupId = "audit-group",
    	    containerFactory = "kafkaListenerContainerFactory"
    	)
    public void consume(AuditEvent event) {

        log.info("Received audit event: {}", event);

        AssetHistory history = new AssetHistory();
        history.setAction(event.getAction());
        history.setTimestamp(event.getTimestamp());

        if ("ASSET".equals(event.getEntityType())) {
            history.setAsset(assetRepo.findById(event.getEntityId()).orElse(null));
        }

        if (event.getEmployeeId() != null) {
            history.setEmployee(
                employeeRepo.findById(event.getEmployeeId()).orElse(null)
            );
        }

        historyRepo.save(history);
    }
}

