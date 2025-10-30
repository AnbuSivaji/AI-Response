package com.example.online.service;

import com.example.online.entity.Settings;
import com.example.online.repository.SettingsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class SettingsService {

    @Autowired
    private SettingsRepository repository;

    // Get latest settings (only 1 row is maintained)
    public Settings getSettings() {
        return repository.findAll().stream().findFirst().orElseGet(() -> {
            Settings s = new Settings();
            return repository.save(s);
        });
    }

    // Update settings
    public Settings updateSettings(Settings newSettings) {
        Settings settings = getSettings();
        settings.setAiEnabled(newSettings.isAiEnabled());
        settings.setDailyQueryLimit(newSettings.getDailyQueryLimit());
        settings.setSubscriptionTiers(newSettings.getSubscriptionTiers());
        return repository.save(settings);
    }
}
