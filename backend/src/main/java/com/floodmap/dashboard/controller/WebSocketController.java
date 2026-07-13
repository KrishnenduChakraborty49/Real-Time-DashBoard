package com.floodmap.dashboard.controller;

import com.floodmap.dashboard.dto.FloodDataDTO;
import com.floodmap.dashboard.entity.Station;
import com.floodmap.dashboard.repository.StationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.stereotype.Controller;

import java.util.List;
import java.util.stream.Collectors;

@Controller
public class WebSocketController {

    @Autowired
    private StationRepository stationRepository;

    @SubscribeMapping("/flood-updates")
    public List<FloodDataDTO> sendInitialData() {
        return stationRepository.findAll().stream().map(station -> new FloodDataDTO(
                String.valueOf(station.getId()),
                station.getStationName(),
                "USGS River",
                station.getLatitude(),
                station.getLongitude(),
                0.0, // Gauge height placeholder since we don't store the exact current value in DB
                "stable",
                station.getStatus() == null ? "none" : station.getStatus(),
                station.getLastUpdated() == null ? "" : station.getLastUpdated().toString()
        )).collect(Collectors.toList());
    }
}
