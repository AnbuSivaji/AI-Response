package com.example.online.controller;

import com.example.online.Dto.ForgotPasswordRequest;
import com.example.online.Dto.LoginRequest;
import com.example.online.Dto.SignupRequest;
import com.example.online.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public Map<String, String> signup(@RequestBody SignupRequest request) {
        String message = userService.register(request);
        Map<String, String> response = new HashMap<>();
        response.put("message", message);
        return response;
    }

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody LoginRequest request) {
        String token = userService.login(request);
        Map<String, String> response = new HashMap<>();
        response.put("token", token);
        return response;
    }

    @PostMapping("/forgot-password")
    public Map<String, String> forgotPassword(@RequestBody ForgotPasswordRequest request) {
        String message = userService.forgotPassword(request);
        Map<String, String> response = new HashMap<>();
        response.put("message", message);
        return response;
    }
}
