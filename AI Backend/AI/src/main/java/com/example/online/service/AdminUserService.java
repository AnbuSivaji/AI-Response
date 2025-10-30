package com.example.online.service;

import com.example.online.entity.User;
import com.example.online.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminUserService {

    @Autowired
    private UserRepository userRepository;

    // 🔹 List all users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // 🔹 Edit user details
    public User updateUser(Long id, String username, String email) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setUsername(username);
        user.setEmail(email);
        return userRepository.save(user);
    }

    // 🔹 Block/Unblock user
    public String toggleUserStatus(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setEnabled(!user.isEnabled());
        userRepository.save(user);
        return user.isEnabled() ? "User unblocked successfully" : "User blocked successfully";
    }

    // 🔹 Delete user
    public String deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new RuntimeException("User not found");
        }
        userRepository.deleteById(id);
        return "User deleted successfully";
    }
}
