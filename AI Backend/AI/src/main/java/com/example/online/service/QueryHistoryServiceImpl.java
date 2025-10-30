package com.example.online.service;

import com.example.online.entity.QueryHistory;
import com.example.online.repository.QueryHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;

@Service
public class QueryHistoryServiceImpl implements QueryHistoryService {

    @Autowired
    private QueryHistoryRepository repository;

    @Override
    public QueryHistory saveQuery(String userEmail, String userQuery, String aiResponse) {
        QueryHistory q = new QueryHistory(userEmail, userQuery, aiResponse, Instant.now());
        return repository.save(q);
    }

    @Override
    public List<QueryHistory> listUserQueries(String userEmail) {
        return repository.findByUserEmailOrderByCreatedAtDesc(userEmail);
    }

    @Override
    @Transactional
    public void deleteQuery(String userEmail, Long queryId) {
        QueryHistory q = repository.findById(queryId)
                .orElseThrow(() -> new RuntimeException("Query not found"));
        if (!q.getUserEmail().equalsIgnoreCase(userEmail)) {
            throw new RuntimeException("Not authorized to delete this query");
        }
        repository.deleteById(queryId);
    }

    @Override
    public long countByUserEmailAndCreatedAtBetween(String userEmail, Instant start, Instant end) {
        return repository.countByUserEmailAndCreatedAtBetween(userEmail, start, end);
    }
}
