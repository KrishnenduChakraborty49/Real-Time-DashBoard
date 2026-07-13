package com.floodmap.dashboard.dto;


public class FloodDataDTO {
    private String id;
    private String name;
    private String river;
    private Double lat;
    private Double lng;
    private Double currentLevel;
    private String trend; // "rising", "falling", "stable"
    private String status; // "none", "action", "minor", "moderate", "major", "offline"
    private String lastUpdated;

    public FloodDataDTO() {}

    public FloodDataDTO(String id, String name, String river, Double lat, Double lng, Double currentLevel, String trend, String status, String lastUpdated) {
        this.id = id;
        this.name = name;
        this.river = river;
        this.lat = lat;
        this.lng = lng;
        this.currentLevel = currentLevel;
        this.trend = trend;
        this.status = status;
        this.lastUpdated = lastUpdated;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRiver() {
        return river;
    }

    public void setRiver(String river) {
        this.river = river;
    }

    public Double getLat() {
        return lat;
    }

    public void setLat(Double lat) {
        this.lat = lat;
    }

    public Double getLng() {
        return lng;
    }

    public void setLng(Double lng) {
        this.lng = lng;
    }

    public Double getCurrentLevel() {
        return currentLevel;
    }

    public void setCurrentLevel(Double currentLevel) {
        this.currentLevel = currentLevel;
    }

    public String getTrend() {
        return trend;
    }

    public void setTrend(String trend) {
        this.trend = trend;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(String lastUpdated) {
        this.lastUpdated = lastUpdated;
    }
}
