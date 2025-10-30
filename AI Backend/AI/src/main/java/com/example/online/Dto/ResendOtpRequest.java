package com.example.online.Dto;

import lombok.Data;

@Data
public class ResendOtpRequest {
    private String email;

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
    
    
    
}
