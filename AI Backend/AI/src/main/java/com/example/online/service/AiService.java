package com.example.online.service;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Map;

@Service
public class AiService {

    private final WebClient webClient;

    public AiService() {
        this.webClient = WebClient.builder()
                .baseUrl("http://localhost:11434") // Ollama server
                .defaultHeader("Content-Type", "application/json")
                .build();
    }

    public String getAiResponse(String userQuery) {
        Map<String, Object> requestBody = Map.of(
                "model", "llama2", // or another installed model
                "prompt", userQuery,
                "max_tokens", 200
        );

        try {
            Map<String, Object> response = webClient.post()
                    .uri("/v1/completions")
                    .bodyValue(requestBody)
                    .retrieve()
                    .bodyToMono(Map.class)
                    .block();

            if (response != null && response.containsKey("choices")) {
                List<Map<String, Object>> choices = (List<Map<String, Object>>) response.get("choices");
                if (!choices.isEmpty() && choices.get(0).containsKey("text")) {
                    return choices.get(0).get("text").toString().trim();
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "AI service error: " + e.getMessage();
        }

        return "No response from AI.";
    }
}
