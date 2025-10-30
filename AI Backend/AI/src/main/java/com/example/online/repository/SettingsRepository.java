package com.example.online.repository;

import com.example.online.entity.Settings;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SettingsRepository extends JpaRepository<Settings, Long> {
}
