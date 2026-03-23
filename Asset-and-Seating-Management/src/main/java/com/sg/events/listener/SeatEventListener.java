package com.sg.events.listener;

import com.sg.events.SeatAssignedEvent;
import com.sg.websocket.NotificationService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionalEventListener;
import org.springframework.transaction.event.TransactionPhase;

@Component
@RequiredArgsConstructor
@Slf4j
public class SeatEventListener {

    private final NotificationService notificationService;

    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void onSeatAssigned(SeatAssignedEvent event) {

        log.info("Seat assigned event AFTER COMMIT: {}", event);

        notificationService.notifySeatUpdate(
            java.util.Map.of(
                "seatId", event.seatId(),
                "employeeId", event.employeeId()
            )
        );
    }
    
    
    
}
