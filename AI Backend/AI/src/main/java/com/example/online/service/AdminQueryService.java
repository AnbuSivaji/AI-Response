package com.example.online.service;

import com.example.online.entity.QueryHistory;
import com.example.online.repository.QueryHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;

@Service
public class AdminQueryService {

    @Autowired
    private QueryHistoryRepository repository;

    // List all queries
    public List<QueryHistory> listAllQueries() {
        return repository.findAll();
    }

    // Search/filter queries
    public List<QueryHistory> searchQueries(String email, String keyword, Instant fromDate, Instant toDate) {
        return repository.searchQueries(email, keyword, fromDate, toDate);
    }

    // Delete any query (Admin or Main Admin can delete)
    @Transactional
    public void deleteQuery(Long queryId) {
        if (!repository.existsById(queryId)) {
            throw new RuntimeException("Query not found");
        }
        repository.deleteById(queryId);
    }
}
