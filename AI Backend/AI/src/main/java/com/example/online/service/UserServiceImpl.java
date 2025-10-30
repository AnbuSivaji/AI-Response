package com.example.online.service;

import com.example.online.Dto.ForgotPasswordRequest;
import com.example.online.Dto.LoginRequest;
import com.example.online.Dto.ProfileDto;
import com.example.online.Dto.SignupRequest;
import com.example.online.entity.User;
import com.example.online.repository.QueryHistoryRepository;
import com.example.online.repository.UserRepository;
import com.example.online.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private QueryHistoryRepository queryHistoryRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private JavaMailSender mailSender;

    // OTP store with expiration
    private final Map<String, OtpDetails> otpStore = new HashMap<>();

    private static class OtpDetails {
        String otp;
        Instant expiresAt;

        OtpDetails(String otp, Instant expiresAt) {
            this.otp = otp;
            this.expiresAt = expiresAt;
        }
    }

    @Override
    public String register(SignupRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered");
        }
        if (!request.getPassword().equals(request.getConfirmPassword())) {
            throw new RuntimeException("Passwords do not match");
        }
        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setEnabled(true);
        userRepository.save(user);
        return "User registered successfully";
    }

    @Override
    public String login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }
        // Pass ROLE_USER when generating JWT
        return jwtUtil.generateToken(user.getEmail(), "ROLE_USER");
    }

    @Override
    public String forgotPassword(ForgotPasswordRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (request.getOtp() == null || request.getOtp().isEmpty()) {
            // generate OTP
            String otp = String.format("%06d", new Random().nextInt(999999));
            Instant expiresAt = Instant.now().plusSeconds(120); // 2 min
            otpStore.put(request.getEmail(), new OtpDetails(otp, expiresAt));

            // send OTP via Gmail
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(request.getEmail());
            message.setSubject("Your OTP for Password Reset");
            message.setText("Your OTP is: " + otp + "\nIt will expire in 2 minutes.");
            mailSender.send(message);

            return "OTP sent to email. It will expire in 2 minutes.";
        } else {
            // verify OTP
            OtpDetails otpDetails = otpStore.get(request.getEmail());
            if (otpDetails == null || !otpDetails.otp.equals(request.getOtp())) {
                throw new RuntimeException("Invalid OTP");
            }
            if (Instant.now().isAfter(otpDetails.expiresAt)) {
                otpStore.remove(request.getEmail());
                throw new RuntimeException("OTP expired. Request a new one.");
            }

            // update password
            user.setPassword(passwordEncoder.encode(request.getNewPassword()));
            userRepository.save(user);
            otpStore.remove(request.getEmail());

            return "Password updated successfully";
        }
    }

    @Override
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }

    // ✅ Profile Implementation
    @Override
    public ProfileDto getProfile(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        long totalQueries = queryHistoryRepository.countByUserEmail(email);

        // Example: Free plan allows 100 queries
        long freeLimit = 100;
        long remaining = Math.max(0, freeLimit - totalQueries);

        return new ProfileDto(
                user.getUsername(),
                user.getEmail(),
                totalQueries,
                remaining
        );
    }
}
