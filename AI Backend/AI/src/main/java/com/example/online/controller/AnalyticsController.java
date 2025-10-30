package com.example.online.controller;

import com.example.online.Dto.AnalyticsDto;
import com.example.online.service.AnalyticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/analytics")
public class AnalyticsController {

    @Autowired
    private AnalyticsService analyticsService;

    // ✅ Only Admins & Main Admins can access
    @GetMapping("/summary")
    @PreAuthorize("hasAnyRole('ADMIN','MAIN_ADMIN')")
    public ResponseEntity<Map<String, Long>> getSummary() {
        Map<String, Long> response = new HashMap<>();
        response.put("totalUsers", analyticsService.getTotalUsers());
        response.put("totalQueries", analyticsService.getTotalQueries());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/daily")
    @PreAuthorize("hasAnyRole('ADMIN','MAIN_ADMIN')")
    public ResponseEntity<List<AnalyticsDto>> getDailyUsage() {
        return ResponseEntity.ok(analyticsService.getDailyUsage());
    }

    @GetMapping("/weekly")
    @PreAuthorize("hasAnyRole('ADMIN','MAIN_ADMIN')")
    public ResponseEntity<List<AnalyticsDto>> getWeeklyUsage() {
        return ResponseEntity.ok(analyticsService.getWeeklyUsage());
    }

    @GetMapping("/monthly")
    @PreAuthorize("hasAnyRole('ADMIN','MAIN_ADMIN')")
    public ResponseEntity<List<AnalyticsDto>> getMonthlyUsage() {
        return ResponseEntity.ok(analyticsService.getMonthlyUsage());
    }
}
