package com.sg.kafka;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import com.sg.dto.AuditEvent;

import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class AuditDLTConsumer {

    @KafkaListener(topics = "audit-events.DLT", groupId = "audit-dlt-group")
    public void consumeDLT(AuditEvent event) {

        log.error("❌ DLT EVENT RECEIVED: {}", event);

        // Optional:
        // 1. Store in DB
        // 2. Send alert (email/slack)
        // 3. Push to monitoring system
    }
}
