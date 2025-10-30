package com.example.online.Dto;

public class AnalyticsDto {

    private String label;  // ex: 2025-09-14, Week 37, 2025-09
    private long count;    // query count

    // 🔹 No-args constructor (Spring/Jackson use pannum)
    public AnalyticsDto() {
    }

    // 🔹 All-args constructor (for new AnalyticsDto(label, count))
    public AnalyticsDto(String label, long count) {
        this.label = label;
        this.count = count;
    }

    // 🔹 Getters and Setters
    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public long getCount() {
        return count;
    }

    public void setCount(long count) {
        this.count = count;
    }
}
