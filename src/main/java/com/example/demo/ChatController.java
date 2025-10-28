package com.example.demo;

import org.springframework.web.bind.annotation.*;
import com.example.demo.kafka.ChatProducer;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/chat")
public class ChatController{

    private final ChatProducer chatProducer;

    public ChatController(ChatProducer chatProducer){
        this.chatProducer = chatProducer;
    }


    @PostMapping
    public Map <String, String> chat(@RequestBody Map<String, String> request){
        String userMessage = request.get("message");

        chatProducer.sendMessage("LLM_topic", userMessage);

        System.out.println("Received message" + userMessage);
        
        String llmReply = "LLM 답변: \"" + userMessage + "\"";

        Map<String, String> response = new HashMap<>();
        response.put("reply", llmReply);
        return response;

    }

    
}
