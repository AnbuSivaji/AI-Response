package com.example.online.service;

import com.example.online.entity.Admin;
import com.example.online.entity.MainAdmin;

import java.util.List;

public interface AdminService {
    String mainAdminSignup(String name, String email, String password);
    String mainAdminLogin(String email, String password);

    String adminSignup(String name, String email, String password);
    String adminLogin(String email, String password);

    List<Admin> getAllAdmins();
    String approveAdmin(Long adminId);
    String deleteAdmin(Long adminId);
}
