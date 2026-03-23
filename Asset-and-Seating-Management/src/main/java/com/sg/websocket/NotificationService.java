package com.sg.websocket;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor 
public class NotificationService {
  
	private final SimpMessagingTemplate messagingTemplate;

	public void notifySeatUpdate(Object payload) {
	    System.out.println("📡 Sending WebSocket payload: " + payload);
	    messagingTemplate.convertAndSend("/topic/seats", payload);
	}


    public void notifyAssetUpdate(Object payload) {
        messagingTemplate.convertAndSend("/topic/assets", payload);
    }

    public void notifyDashboardUpdate(Object payload) {
        messagingTemplate.convertAndSend("/topic/dashboard", payload);
    }
}
