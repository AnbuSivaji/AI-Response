package com.example.online.service;

import com.example.online.Dto.ForgotPasswordRequest;
import com.example.online.Dto.LoginRequest;
import com.example.online.Dto.ProfileDto;
import com.example.online.Dto.SignupRequest;
import com.example.online.entity.User;

public interface UserService {
    String register(SignupRequest request);
    String login(LoginRequest request);
    String forgotPassword(ForgotPasswordRequest request);
    User getUserByEmail(String email);
    
    ProfileDto getProfile(String email); 
}

