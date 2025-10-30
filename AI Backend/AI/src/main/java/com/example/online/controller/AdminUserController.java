package com.example.online.controller;

import com.example.online.entity.User;
import com.example.online.service.AdminUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/users")
public class AdminUserController {

    @Autowired
    private AdminUserService adminUserService;

    // 🔹 Get all users (Admin + MainAdmin only)
    @GetMapping("/all")
    @PreAuthorize("hasAnyRole('ADMIN','MAIN_ADMIN')")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(adminUserService.getAllUsers());
    }

    // 🔹 Edit user details
    @PutMapping("/update/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','MAIN_ADMIN')")
    public ResponseEntity<User> updateUser(
            @PathVariable Long id,
            @RequestBody Map<String, String> updates
    ) {
        String username = updates.get("username");
        String email = updates.get("email");
        return ResponseEntity.ok(adminUserService.updateUser(id, username, email));
    }

    // 🔹 Block / Unblock user
    @PutMapping("/toggle/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','MAIN_ADMIN')")
    public ResponseEntity<Map<String, String>> toggleUserStatus(@PathVariable Long id) {
        String message = adminUserService.toggleUserStatus(id);
        return ResponseEntity.ok(Map.of("message", message));
    }

    // 🔹 Delete user
    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','MAIN_ADMIN')")
    public ResponseEntity<Map<String, String>> deleteUser(@PathVariable Long id) {
        String message = adminUserService.deleteUser(id);
        return ResponseEntity.ok(Map.of("message", message));
    }
}
