package com.sg.kafka;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

import com.sg.dto.AuditEvent;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class AuditProducer {

    private final KafkaTemplate<String, AuditEvent> kafkaTemplate;
    private static final String TOPIC = "audit-events";

    public void publish(AuditEvent event) {
        log.info("Publishing audit event: {}", event);
        kafkaTemplate.send(TOPIC, event);
    }
}


