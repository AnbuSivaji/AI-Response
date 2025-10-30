package com.example.online.entity;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "query_history")
public class QueryHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userEmail;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String userQuery;

    @Column(columnDefinition = "TEXT")
    private String aiResponse;

    private Instant createdAt;

    public QueryHistory() {}

    public QueryHistory(String userEmail, String userQuery, String aiResponse, Instant createdAt) {
        this.userEmail = userEmail;
        this.userQuery = userQuery;
        this.aiResponse = aiResponse;
        this.createdAt = createdAt;
    }

    // Getters & Setters
    public Long getId() { return id; }
    public String getUserEmail() { return userEmail; }
    public void setUserEmail(String userEmail) { this.userEmail = userEmail; }

    public String getUserQuery() { return userQuery; }
    public void setUserQuery(String userQuery) { this.userQuery = userQuery; }

    public String getAiResponse() { return aiResponse; }
    public void setAiResponse(String aiResponse) { this.aiResponse = aiResponse; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
