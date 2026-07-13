package com.floodmap.dashboard.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "historical_levels")
public class HistoricalLevel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "station_id")
    private Station station;

    private Double waterLevel;
    
    private LocalDateTime timestamp;

    public HistoricalLevel() {}

    public HistoricalLevel(Long id, Station station, Double waterLevel, LocalDateTime timestamp) {
        this.id = id;
        this.station = station;
        this.waterLevel = waterLevel;
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

    public Double getWaterLevel() {
        return waterLevel;
    }

    public void setWaterLevel(Double waterLevel) {
        this.waterLevel = waterLevel;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}
