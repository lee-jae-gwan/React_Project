package com.example.demo.kafka;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class ChatConsumer {
    
    @KafkaListener(topics="LLM_topuic", groupId = "chat-consumer-group")
    public void listen(String message){
        System.out.println("Received message: " + message);
    }
}
