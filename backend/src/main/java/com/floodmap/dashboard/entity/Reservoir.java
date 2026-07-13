package com.floodmap.dashboard.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "reservoirs")
public class Reservoir {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private Double latitude;
    private Double longitude;

    private Double currentLevel;
    private Double maxCapacity;

    private LocalDateTime lastUpdated;

    public Reservoir() {}

    public Reservoir(Long id, String name, Double latitude, Double longitude, Double currentLevel, Double maxCapacity, LocalDateTime lastUpdated) {
        this.id = id;
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
        this.currentLevel = currentLevel;
        this.maxCapacity = maxCapacity;
        this.lastUpdated = lastUpdated;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public Double getCurrentLevel() {
        return currentLevel;
    }

    public void setCurrentLevel(Double currentLevel) {
        this.currentLevel = currentLevel;
    }

    public Double getMaxCapacity() {
        return maxCapacity;
    }

    public void setMaxCapacity(Double maxCapacity) {
        this.maxCapacity = maxCapacity;
    }

    public LocalDateTime getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(LocalDateTime lastUpdated) {
        this.lastUpdated = lastUpdated;
    }
}
