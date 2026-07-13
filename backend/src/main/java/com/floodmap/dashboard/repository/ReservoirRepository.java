package com.floodmap.dashboard.repository;

import com.floodmap.dashboard.entity.Reservoir;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReservoirRepository extends JpaRepository<Reservoir, Long> {
}
