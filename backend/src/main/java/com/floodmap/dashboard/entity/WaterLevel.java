package com.floodmap.dashboard.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "water_levels")
public class WaterLevel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "station_id")
    private Station station;

    private Double currentLevel;
    private Double gaugeHeight;
    private Double flowRate;

    private String floodCategory; // "No Flood", "Action Stage", "Minor Flood", etc.
    private String waterTrend; // "Rising", "Falling", "Steady"

    private LocalDateTime timestamp;

    public WaterLevel() {}

    public WaterLevel(Long id, Station station, Double currentLevel, Double gaugeHeight, Double flowRate, String floodCategory, String waterTrend, LocalDateTime timestamp) {
        this.id = id;
        this.station = station;
        this.currentLevel = currentLevel;
        this.gaugeHeight = gaugeHeight;
        this.flowRate = flowRate;
        this.floodCategory = floodCategory;
        this.waterTrend = waterTrend;
        this.timestamp = timestamp;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Station getStation() {
        return station;
    }

    public void setStation(Station station) {
        this.station = station;
    }

    public Double getCurrentLevel() {
        return currentLevel;
    }

    public void setCurrentLevel(Double currentLevel) {
        this.currentLevel = currentLevel;
    }

    public Double getGaugeHeight() {
        return gaugeHeight;
    }

    public void setGaugeHeight(Double gaugeHeight) {
        this.gaugeHeight = gaugeHeight;
    }

    public Double getFlowRate() {
        return flowRate;
    }

    public void setFlowRate(Double flowRate) {
        this.flowRate = flowRate;
    }

    public String getFloodCategory() {
        return floodCategory;
    }

    public void setFloodCategory(String floodCategory) {
        this.floodCategory = floodCategory;
    }

    public String getWaterTrend() {
        return waterTrend;
    }

    public void setWaterTrend(String waterTrend) {
        this.waterTrend = waterTrend;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}
