package com.example.online.controller;


import com.example.online.Dto.AdminLoginRequest;
import com.example.online.Dto.AdminRequest;
import com.example.online.entity.Admin;
import com.example.online.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    // Main Admin Signup
    @PostMapping("/main/signup")
    public Map<String, String> mainAdminSignup(@RequestBody AdminRequest request) {
        String message = adminService.mainAdminSignup(request.getName(), request.getEmail(), request.getPassword());
        Map<String, String> response = new HashMap<>();
        response.put("message", message);
        return response;
    }

    // Main Admin Login
    @PostMapping("/main/login")
    public Map<String, String> mainAdminLogin(@RequestBody AdminLoginRequest request) {
        String token = adminService.mainAdminLogin(request.getEmail(), request.getPassword());
        Map<String, String> response = new HashMap<>();
        response.put("token", token);
        return response;
    }

    // Admin Signup
    @PostMapping("/signup")
    public Map<String, String> adminSignup(@RequestBody AdminRequest request) {
        String message = adminService.adminSignup(request.getName(), request.getEmail(), request.getPassword());
        Map<String, String> response = new HashMap<>();
        response.put("message", message);
        return response;
    }

    // Admin Login
    @PostMapping("/login")
    public Map<String, String> adminLogin(@RequestBody AdminLoginRequest request) {
        String token = adminService.adminLogin(request.getEmail(), request.getPassword());
        Map<String, String> response = new HashMap<>();
        response.put("token", token);
        return response;
    }

    // Get all admins
    @GetMapping("/all")
    public List<Admin> getAllAdmins() {
        return adminService.getAllAdmins();
    }

    // Approve Admin
    @PutMapping("/approve/{id}")
    public Map<String, String> approveAdmin(@PathVariable Long id) {
        String message = adminService.approveAdmin(id);
        Map<String, String> response = new HashMap<>();
        response.put("message", message);
        return response;
    }

    // Delete Admin
    @DeleteMapping("/delete/{id}")
    public Map<String, String> deleteAdmin(@PathVariable Long id) {
        String message = adminService.deleteAdmin(id);
        Map<String, String> response = new HashMap<>();
        response.put("message", message);
        return response;
    }
}
