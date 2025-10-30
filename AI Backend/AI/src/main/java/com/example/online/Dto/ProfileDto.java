package com.example.online.Dto;

public class ProfileDto {
    private String username;
    private String email;
    private long totalQueriesUsed;
    private long remainingQueries;

    public ProfileDto(String username, String email, long totalQueriesUsed, long remainingQueries) {
        this.username = username;
        this.email = email;
        this.totalQueriesUsed = totalQueriesUsed;
        this.remainingQueries = remainingQueries;
    }

    public String getUsername() { return username; }
    public String getEmail() { return email; }
    public long getTotalQueriesUsed() { return totalQueriesUsed; }
    public long getRemainingQueries() { return remainingQueries; }
}
