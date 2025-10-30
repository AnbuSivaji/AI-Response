package com.example.online.repository;




import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.online.entity.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
    
    
    @Query("SELECT COUNT(u) FROM User u")
    long countAllUsers();
}
