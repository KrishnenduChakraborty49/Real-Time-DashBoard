package com.floodmap.dashboard.controller;

import com.floodmap.dashboard.entity.Station;
import com.floodmap.dashboard.repository.StationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/stations")
public class StationController {
    
    @Autowired
    private StationRepository stationRepository;

    @GetMapping
    @PreAuthorize("hasRole('VIEWER') or hasRole('ANALYST') or hasRole('ADMIN')")
    public List<Station> getAllStations() {
        return stationRepository.findAll();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('VIEWER') or hasRole('ANALYST') or hasRole('ADMIN')")
    public ResponseEntity<Station> getStationById(@PathVariable Long id) {
        return stationRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
