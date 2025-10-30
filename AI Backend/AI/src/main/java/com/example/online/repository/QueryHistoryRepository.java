package com.example.online.repository;

import com.example.online.entity.QueryHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.Instant;
import java.util.List;

public interface QueryHistoryRepository extends JpaRepository<QueryHistory, Long> {

	long countByUserEmailAndCreatedAtBetween(String userEmail, Instant start, Instant end);

    // 🔹 User specific queries
    List<QueryHistory> findByUserEmailOrderByCreatedAtDesc(String userEmail);

    long countByUserEmail(String userEmail);

    // 🔹 Search filters (email, keyword, date range)
    @Query("SELECT q FROM QueryHistory q " +
           "WHERE (:email IS NULL OR q.userEmail = :email) " +
           "AND (:keyword IS NULL OR LOWER(q.userQuery) LIKE LOWER(CONCAT('%', :keyword, '%'))) " +
           "AND (:fromDate IS NULL OR q.createdAt >= :fromDate) " +
           "AND (:toDate IS NULL OR q.createdAt <= :toDate) " +
           "ORDER BY q.createdAt DESC")
    List<QueryHistory> searchQueries(
            @Param("email") String email,
            @Param("keyword") String keyword,
            @Param("fromDate") Instant fromDate,
            @Param("toDate") Instant toDate
    );

    // 🔹 Analytics Queries
    @Query(value = "SELECT COUNT(*) FROM query_history", nativeQuery = true)
    long countAllQueries();

    @Query(value = "SELECT DATE(created_at) AS date, COUNT(*) AS total " +
                   "FROM query_history " +
                   "GROUP BY DATE(created_at) " +
                   "ORDER BY DATE(created_at)", nativeQuery = true)
    List<Object[]> getDailyUsage();

    @Query(value = "SELECT YEARWEEK(created_at, 1) AS week, COUNT(*) AS total " +
                   "FROM query_history " +
                   "GROUP BY YEARWEEK(created_at, 1) " +
                   "ORDER BY week", nativeQuery = true)
    List<Object[]> getWeeklyUsage();

    @Query(value = "SELECT YEAR(created_at) AS year, MONTH(created_at) AS month, COUNT(*) AS total " +
                   "FROM query_history " +
                   "GROUP BY YEAR(created_at), MONTH(created_at) " +
                   "ORDER BY year, month", nativeQuery = true)
    List<Object[]> getMonthlyUsage();
}
