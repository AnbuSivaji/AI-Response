package com.example.online.controller;

import com.example.online.Dto.ProfileDto;
import com.example.online.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class ProfileController {

    @Autowired
    private UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<ProfileDto> getProfile(Authentication authentication) {
        String email = authentication.getName();
        ProfileDto profile = userService.getProfile(email);
        return ResponseEntity.ok(profile);
    }
}
