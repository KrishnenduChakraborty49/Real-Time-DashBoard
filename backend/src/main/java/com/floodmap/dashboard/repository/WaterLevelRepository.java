package com.floodmap.dashboard.repository;

import com.floodmap.dashboard.entity.WaterLevel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WaterLevelRepository extends JpaRepository<WaterLevel, Long> {
}
