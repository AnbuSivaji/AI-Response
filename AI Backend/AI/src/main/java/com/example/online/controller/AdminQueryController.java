package com.example.online.controller;

import com.example.online.entity.QueryHistory;
import com.example.online.service.AdminQueryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/api/admin/queries")
public class AdminQueryController {

    @Autowired
    private AdminQueryService adminQueryService;

    // ✅ List all queries (Admin + Main Admin)
    @GetMapping("/all")
    @PreAuthorize("hasAnyRole('ADMIN','MAIN_ADMIN')")
    public ResponseEntity<List<QueryHistory>> getAllQueries() {
        return ResponseEntity.ok(adminQueryService.listAllQueries());
    }

    // ✅ Search queries (Admin + Main Admin)
    @GetMapping("/search")
    @PreAuthorize("hasAnyRole('ADMIN','MAIN_ADMIN')")
    public ResponseEntity<List<QueryHistory>> searchQueries(
            @RequestParam(required = false) String email,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant fromDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant toDate
    ) {
        return ResponseEntity.ok(adminQueryService.searchQueries(email, keyword, fromDate, toDate));
    }

    // ✅ Delete inappropriate query (Admin + Main Admin)
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','MAIN_ADMIN')")
    public ResponseEntity<String> deleteQuery(@PathVariable Long id) {
        adminQueryService.deleteQuery(id);
        return ResponseEntity.ok("Query deleted successfully");
    }
}
