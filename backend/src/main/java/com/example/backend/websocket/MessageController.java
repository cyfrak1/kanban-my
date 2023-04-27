package com.example.backend.websocket;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class MessageController {
    @MessageMapping("/messages")
    @SendTo("/topic/messages")
    public String getMessage(String message) {
        return message;
    }
}
