package com.example.online.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "settings")
public class Settings {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private boolean aiEnabled = true;   // enable/disable AI globally
    private int dailyQueryLimit = 10;   // default 10 per day
    private String subscriptionTiers;   // JSON or CSV format like "FREE=10,PRO=100"
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public boolean isAiEnabled() {
		return aiEnabled;
	}
	public void setAiEnabled(boolean aiEnabled) {
		this.aiEnabled = aiEnabled;
	}
	public int getDailyQueryLimit() {
		return dailyQueryLimit;
	}
	public void setDailyQueryLimit(int dailyQueryLimit) {
		this.dailyQueryLimit = dailyQueryLimit;
	}
	public String getSubscriptionTiers() {
		return subscriptionTiers;
	}
	public void setSubscriptionTiers(String subscriptionTiers) {
		this.subscriptionTiers = subscriptionTiers;
	}
    
    
    
    
}
