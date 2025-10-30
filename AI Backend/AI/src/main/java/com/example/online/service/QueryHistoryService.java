package com.example.online.service;

import com.example.online.entity.QueryHistory;

import java.time.Instant;
import java.util.List;

public interface QueryHistoryService {
    QueryHistory saveQuery(String userEmail, String userQuery, String aiResponse);
    List<QueryHistory> listUserQueries(String userEmail);
    void deleteQuery(String userEmail, Long queryId);

    // ✅ New method for daily query limit check
    long countByUserEmailAndCreatedAtBetween(String userEmail, Instant start, Instant end);
}
