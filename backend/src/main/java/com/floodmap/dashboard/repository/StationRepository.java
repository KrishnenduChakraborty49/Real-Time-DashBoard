package com.floodmap.dashboard.repository;

import com.floodmap.dashboard.entity.Station;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StationRepository extends JpaRepository<Station, Long> {
    Station findByStationName(String stationName);
}
