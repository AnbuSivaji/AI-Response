package com.example.online.service;

import com.example.online.Dto.AnalyticsDto;
import com.example.online.repository.QueryHistoryRepository;
import com.example.online.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AnalyticsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private QueryHistoryRepository queryHistoryRepository;

    public long getTotalUsers() {
        return toLong(userRepository.countAllUsers());
    }

    public long getTotalQueries() {
        return toLong(queryHistoryRepository.countAllQueries());
    }

    public List<AnalyticsDto> getDailyUsage() {
        return queryHistoryRepository.getDailyUsage()
                .stream()
                .map(r -> {
                    String date = String.valueOf(r[0]); // e.g., 2025-09-14
                    long count = toLong(r[1]);
                    return new AnalyticsDto(date, count); // ✅ now works
                })
                .collect(Collectors.toList());
    }

    public List<AnalyticsDto> getWeeklyUsage() {
        return queryHistoryRepository.getWeeklyUsage()
                .stream()
                .map(r -> {
                    String week = "Week " + String.valueOf(r[0]); // e.g., Week 202537
                    long count = toLong(r[1]);
                    return new AnalyticsDto(week, count); // ✅ now works
                })
                .collect(Collectors.toList());
    }

    public List<AnalyticsDto> getMonthlyUsage() {
        return queryHistoryRepository.getMonthlyUsage()
                .stream()
                .map(r -> {
                    String year = String.valueOf(r[0]);
                    String month = String.valueOf(r[1]);
                    long count = toLong(r[2]);
                    String yearMonth = year + "-" + (month.length() == 1 ? "0" + month : month);
                    return new AnalyticsDto(yearMonth, count); // ✅ now works
                })
                .collect(Collectors.toList());
    }

    // ✅ Helper: safely convert DB values to long
    private long toLong(Object value) {
        if (value == null) return 0L;
        if (value instanceof Long) {
            return (Long) value;
        } else if (value instanceof Integer) {
            return ((Integer) value).longValue();
        } else if (value instanceof BigInteger) {
            return ((BigInteger) value).longValue();
        } else if (value instanceof Number) {
            return ((Number) value).longValue();
        } else {
            try {
                return Long.parseLong(value.toString());
            } catch (NumberFormatException e) {
                throw new IllegalArgumentException("Cannot convert value to long: " + value);
            }
        }
    }
}
