import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

let stompClient = null;

export const connectWebSocket = (onMessage) => {
  const socket = new SockJS("http://localhost:8080/ws");

  stompClient = new Client({
    webSocketFactory: () => socket,
    reconnectDelay: 5000,
    debug: (str) => console.log("STOMP:", str),

    onConnect: () => {
      console.log("WebSocket connected");

      stompClient.subscribe("/topic/seats", (message) => {
        console.log(" Seat message:", message.body);
        onMessage(JSON.parse(message.body));
      });


      stompClient.subscribe("/topic/assets",(message)=>{
         console.log("asset message",message.body);
         onMessage(JSON.parse(message.body));
      })
    },

    onStompError: (frame) => {
      console.error("STOMP error", frame);
    }
  });

  stompClient.activate();
};

export const disconnectWebSocket = () => {
  if (stompClient) {
    stompClient.deactivate();
    console.log("🔌 WebSocket disconnected");
  }
};
