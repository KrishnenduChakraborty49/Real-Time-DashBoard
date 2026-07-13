package com.floodmap.dashboard.repository;

import com.floodmap.dashboard.entity.River;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RiverRepository extends JpaRepository<River, Long> {
}
