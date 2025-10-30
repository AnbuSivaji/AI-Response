package com.example.online.controller;

import com.example.online.Dto.QueryDto;
import com.example.online.entity.QueryHistory;
import com.example.online.service.QueryHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/user/queries")
public class QueryHistoryController {

    @Autowired
    private QueryHistoryService queryHistoryService;

    // List queries by email
    @GetMapping
    public ResponseEntity<List<QueryDto.Response>> list(Authentication authentication) {
        String userEmail = authentication.getName();
        List<QueryHistory> list = queryHistoryService.listUserQueries(userEmail);

        List<QueryDto.Response> out = list.stream()
                .map(q -> new QueryDto.Response(
                        q.getId(),
                        q.getUserEmail(),
                        q.getUserQuery(),
                        q.getAiResponse(),
                        q.getCreatedAt()
                ))
                .collect(Collectors.toList());

        return ResponseEntity.ok(out);
    }

    // Delete query
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Long id, Authentication authentication) {
        String userEmail = authentication.getName();
        queryHistoryService.deleteQuery(userEmail, id);
        return ResponseEntity.ok().body("Deleted");
    }
}
