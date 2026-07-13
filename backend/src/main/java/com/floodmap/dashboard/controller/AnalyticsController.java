package com.floodmap.dashboard.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/analytics")
public class AnalyticsController {

    @GetMapping("/historical")
    @PreAuthorize("hasRole('VIEWER') or hasRole('ANALYST') or hasRole('ADMIN')")
    public ResponseEntity<List<Map<String, Object>>> getHistoricalData(
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate) {
        
        // Mocking historical data based on the dates requested for demo purposes
        // In a real application, this would query the HistoricalLevelRepository using the dates
        List<Map<String, Object>> trendData = new ArrayList<>();
        
        LocalDate start = startDate != null ? LocalDate.parse(startDate) : LocalDate.now().minusDays(7);
        
        for (int i = 0; i < 7; i++) {
            Map<String, Object> day = new HashMap<>();
            day.put("name", start.plusDays(i).getDayOfWeek().toString().substring(0, 3));
            day.put("kansas", 12.0 + Math.random() * 5);
            day.put("arkansas", 4.0 + Math.random() * 2);
            day.put("neosho", 22.0 + Math.random() * 8);
            trendData.add(day);
        }

        return ResponseEntity.ok(trendData);
    }

    @GetMapping("/distribution")
    @PreAuthorize("hasRole('VIEWER') or hasRole('ANALYST') or hasRole('ADMIN')")
    public ResponseEntity<List<Map<String, Object>>> getDistributionData() {
        
        // Mock distribution based on DB state in a real app
        List<Map<String, Object>> distribution = new ArrayList<>();
        
        distribution.add(createDistNode("No Flood", 180, "#22c55e"));
        distribution.add(createDistNode("Action", 40, "#eab308"));
        distribution.add(createDistNode("Minor", 20, "#f97316"));
        distribution.add(createDistNode("Moderate", 8, "#ef4444"));
        distribution.add(createDistNode("Major", 4, "#a855f7"));

        return ResponseEntity.ok(distribution);
    }

    private Map<String, Object> createDistNode(String name, int value, String color) {
        Map<String, Object> node = new HashMap<>();
        node.put("name", name);
        node.put("value", value);
        node.put("color", color);
        return node;
    }
}
