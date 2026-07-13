package com.floodmap.dashboard.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "stations")
public class Station {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String stationName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "river_id")
    private River river;

    private Double latitude;
    private Double longitude;

    private Double actionStage;
    private Double minorFloodStage;
    private Double moderateFloodStage;
    private Double majorFloodStage;

    @Column(nullable = false)
    private String status; // "ONLINE", "OFFLINE"

    private LocalDateTime lastUpdated;

    public Station() {}

    public Station(Long id, String stationName, River river, Double latitude, Double longitude, Double actionStage, Double minorFloodStage, Double moderateFloodStage, Double majorFloodStage, String status, LocalDateTime lastUpdated) {
        this.id = id;
        this.stationName = stationName;
        this.river = river;
        this.latitude = latitude;
        this.longitude = longitude;
        this.actionStage = actionStage;
        this.minorFloodStage = minorFloodStage;
        this.moderateFloodStage = moderateFloodStage;
        this.majorFloodStage = majorFloodStage;
        this.status = status;
        this.lastUpdated = lastUpdated;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStationName() {
        return stationName;
    }

    public void setStationName(String stationName) {
        this.stationName = stationName;
    }

    public River getRiver() {
        return river;
    }

    public void setRiver(River river) {
        this.river = river;
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

    public Double getActionStage() {
        return actionStage;
    }

    public void setActionStage(Double actionStage) {
        this.actionStage = actionStage;
    }

    public Double getMinorFloodStage() {
        return minorFloodStage;
    }

    public void setMinorFloodStage(Double minorFloodStage) {
        this.minorFloodStage = minorFloodStage;
    }

    public Double getModerateFloodStage() {
        return moderateFloodStage;
    }

    public void setModerateFloodStage(Double moderateFloodStage) {
        this.moderateFloodStage = moderateFloodStage;
    }

    public Double getMajorFloodStage() {
        return majorFloodStage;
    }

    public void setMajorFloodStage(Double majorFloodStage) {
        this.majorFloodStage = majorFloodStage;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(LocalDateTime lastUpdated) {
        this.lastUpdated = lastUpdated;
    }
}
