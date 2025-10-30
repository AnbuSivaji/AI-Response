package com.example.online.controller;

import com.example.online.entity.QueryHistory;
import com.example.online.entity.Settings;
import com.example.online.service.AiService;
import com.example.online.service.QueryHistoryService;
import com.example.online.service.SettingsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/ai")
public class AiController {

    @Autowired
    private AiService aiService;

    @Autowired
    private QueryHistoryService queryHistoryService;

    @Autowired
    private SettingsService settingsService;

    @PostMapping("/chat")
    public ResponseEntity<Map<String, Object>> chatWithAi(@RequestBody Map<String, String> request,
                                                          Authentication authentication) {
        String userEmail = authentication.getName();
        String userQuery = request.get("query");

        // 1️⃣ Load settings
        Settings settings = settingsService.getSettings();
        if (settings == null || !settings.isAiEnabled()) {
            return ResponseEntity.badRequest().body(Map.of("error", "AI service is disabled by Admin."));
        }

        // 2️⃣ Count today's queries for this user
        Instant startOfDay = LocalDate.now().atStartOfDay(ZoneId.systemDefault()).toInstant();
        Instant now = Instant.now();
        long todayCount = queryHistoryService.countByUserEmailAndCreatedAtBetween(userEmail, startOfDay, now);

        if (todayCount >= settings.getDailyQueryLimit()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Daily AI query limit reached!"));
        }

        // 3️⃣ Call AI
        String aiResponse = aiService.getAiResponse(userQuery);

        // 4️⃣ Save into DB
        QueryHistory saved = queryHistoryService.saveQuery(userEmail, userQuery, aiResponse);

        // 5️⃣ Return response
        Map<String, Object> response = new HashMap<>();
        response.put("query", saved.getUserQuery());
        response.put("response", saved.getAiResponse());
        response.put("id", saved.getId());
        response.put("createdAt", saved.getCreatedAt());

        return ResponseEntity.ok(response);
    }
}
