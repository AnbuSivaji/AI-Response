package com.example.online.service;

import com.example.online.entity.Admin;
import com.example.online.entity.MainAdmin;
import com.example.online.repository.AdminRepository;
import com.example.online.repository.MainAdminRepository;
import com.example.online.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private MainAdminRepository mainAdminRepository;

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    public String mainAdminSignup(String name, String email, String password) {
        if (mainAdminRepository.existsByEmail(email)) {
            throw new RuntimeException("Main admin already exists with this email");
        }
        MainAdmin mainAdmin = new MainAdmin(name, email, passwordEncoder.encode(password));
        mainAdminRepository.save(mainAdmin);
        return "Main Admin registered successfully";
    }

    @Override
    public String mainAdminLogin(String email, String password) {
        MainAdmin mainAdmin = mainAdminRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Main admin not found"));

        if (!passwordEncoder.matches(password, mainAdmin.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        return jwtUtil.generateToken(mainAdmin.getEmail(), "ROLE_MAIN_ADMIN");
    }

    @Override
    public String adminSignup(String name, String email, String password) {
        if (adminRepository.existsByEmail(email)) {
            throw new RuntimeException("Admin already exists with this email");
        }
        Admin admin = new Admin(name, email, passwordEncoder.encode(password), false);
        adminRepository.save(admin);
        return "Admin registered successfully. Waiting for main admin approval.";
    }

    @Override
    public String adminLogin(String email, String password) {
        Admin admin = adminRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Admin not found"));

        if (!passwordEncoder.matches(password, admin.getPassword())) {
            throw new RuntimeException("Invalid password");
        }
        if (!admin.isApproved()) {
            throw new RuntimeException("Admin not approved by Main Admin yet");
        }

        return jwtUtil.generateToken(admin.getEmail(), "ROLE_ADMIN");
    }

    @Override
    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }

    @Override
    public String approveAdmin(Long adminId) {
        Admin admin = adminRepository.findById(adminId)
                .orElseThrow(() -> new RuntimeException("Admin not found"));
        admin.setApproved(true);
        adminRepository.save(admin);
        return "Admin approved successfully";
    }

    @Override
    public String deleteAdmin(Long adminId) {
        adminRepository.deleteById(adminId);
        return "Admin deleted successfully";
    }
}
