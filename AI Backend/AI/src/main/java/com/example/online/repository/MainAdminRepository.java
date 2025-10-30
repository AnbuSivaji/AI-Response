package com.example.online.repository;

import com.example.online.entity.MainAdmin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MainAdminRepository extends JpaRepository<MainAdmin, Long> {
    Optional<MainAdmin> findByEmail(String email);
    boolean existsByEmail(String email);
}
