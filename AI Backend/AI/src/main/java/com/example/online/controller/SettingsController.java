package com.example.online.controller;

import com.example.online.entity.Settings;
import com.example.online.service.SettingsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/settings")
public class SettingsController {

    @Autowired
    private SettingsService settingsService;

    // ✅ Get settings (only Admin + Main Admin)
    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','MAIN_ADMIN')")
    public ResponseEntity<Settings> getSettings() {
        return ResponseEntity.ok(settingsService.getSettings());
    }

    // ✅ Update settings (only Admin + Main Admin)
    @PutMapping
    @PreAuthorize("hasAnyRole('ADMIN','MAIN_ADMIN')")
    public ResponseEntity<Settings> updateSettings(@RequestBody Settings newSettings) {
        return ResponseEntity.ok(settingsService.updateSettings(newSettings));
    }
}
