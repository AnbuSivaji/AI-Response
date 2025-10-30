package com.example.online.Dto;

import java.time.Instant;

public class QueryDto {

    public static class CreateRequest {
        private String userQuery;
        private String aiResponse;

        public String getUserQuery() { return userQuery; }
        public void setUserQuery(String userQuery) { this.userQuery = userQuery; }

        public String getAiResponse() { return aiResponse; }
        public void setAiResponse(String aiResponse) { this.aiResponse = aiResponse; }
    }

    public static class Response {
        private Long id;
        private String userEmail;
        private String userQuery;
        private String aiResponse;
        private Instant createdAt;

        public Response(Long id, String userEmail, String userQuery, String aiResponse, Instant createdAt) {
            this.id = id;
            this.userEmail = userEmail;
            this.userQuery = userQuery;
            this.aiResponse = aiResponse;
            this.createdAt = createdAt;
        }

        // Getters
        public Long getId() { return id; }
        public String getUserEmail() { return userEmail; }
        public String getUserQuery() { return userQuery; }
        public String getAiResponse() { return aiResponse; }
        public Instant getCreatedAt() { return createdAt; }
    }
}
