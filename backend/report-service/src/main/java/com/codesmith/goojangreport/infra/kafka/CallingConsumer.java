package com.codesmith.goojangreport.infra.kafka;

import com.codesmith.goojangreport.report.dto.message.CallingCreateMessage;
import com.codesmith.goojangreport.report.dto.message.CallingStatusMessage;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CallingConsumer {
    private final ObjectMapper objectMapper;

    @KafkaListener(topics = "calling-topic", groupId = "report-consumer-dev")
    public void consumeCallingTopic(String message){
        try {
            System.out.println("========================" + message);
            if (message.contains("occurrenceId")) {
                CallingCreateMessage callingCreateMessage = objectMapper.readValue(message, CallingCreateMessage.class);
                System.out.println(callingCreateMessage);
            }

            else {
                CallingStatusMessage callingStatusMessage = objectMapper.readValue(message, CallingStatusMessage.class);
                System.out.println(callingStatusMessage);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}