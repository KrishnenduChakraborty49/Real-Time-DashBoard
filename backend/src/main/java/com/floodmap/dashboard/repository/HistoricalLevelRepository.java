package com.floodmap.dashboard.repository;

import com.floodmap.dashboard.entity.HistoricalLevel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HistoricalLevelRepository extends JpaRepository<HistoricalLevel, Long> {
    List<HistoricalLevel> findByStationIdOrderByTimestampAsc(Long stationId);
}
