package com.floodmap.dashboard.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.floodmap.dashboard.dto.FloodDataDTO;
import com.floodmap.dashboard.entity.Station;
import com.floodmap.dashboard.repository.StationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@EnableScheduling
public class USGSSyncService {

    @Autowired
    private StationRepository stationRepository;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Scheduled(fixedRate = 60000) // Every 1 minute for demo
    public void fetchUSGSData() {
        String url = "https://waterservices.usgs.gov/nwis/iv/?format=json&stateCd=ks&parameterCd=00065";
        
        try {
            JsonNode root = restTemplate.getForObject(url, JsonNode.class);
            JsonNode timeSeries = root.path("value").path("timeSeries");
            
            List<FloodDataDTO> updates = new ArrayList<>();

            for (JsonNode ts : timeSeries) {
                JsonNode sourceInfo = ts.path("sourceInfo");
                String siteName = sourceInfo.path("siteName").asText();
                double lat = sourceInfo.path("geoLocation").path("geogLocation").path("latitude").asDouble();
                double lng = sourceInfo.path("geoLocation").path("geogLocation").path("longitude").asDouble();
                
                JsonNode valuesArray = ts.path("values").get(0).path("value");
                if (valuesArray.isEmpty()) continue;
                
                JsonNode latestValue = valuesArray.get(0);
                double gaugeHeight = latestValue.path("value").asDouble();
                
                Station station = stationRepository.findByStationName(siteName);
                if (station == null) {
                    station = new Station();
                    station.setStationName(siteName);
                    station.setLatitude(lat);
                    station.setLongitude(lng);
                    station.setActionStage(15.0);
                    station.setMinorFloodStage(18.0);
                    station.setModerateFloodStage(22.0);
                    station.setMajorFloodStage(25.0);
                    station.setStatus("ONLINE");
                    station = stationRepository.save(station);
                }

                String status = "none";
                if (gaugeHeight >= station.getMajorFloodStage()) status = "major";
                else if (gaugeHeight >= station.getModerateFloodStage()) status = "moderate";
                else if (gaugeHeight >= station.getMinorFloodStage()) status = "minor";
                else if (gaugeHeight >= station.getActionStage()) status = "action";

                station.setLastUpdated(LocalDateTime.now());
                stationRepository.save(station);
                
                FloodDataDTO dto = new FloodDataDTO(
                        String.valueOf(station.getId()),
                        station.getStationName(),
                        "USGS River",
                        station.getLatitude(),
                        station.getLongitude(),
                        gaugeHeight,
                        "stable", 
                        status,
                        LocalDateTime.now().toString()
                );
                updates.add(dto);
            }

            messagingTemplate.convertAndSend("/topic/flood-updates", updates);
            System.out.println("USGS Sync Complete. Pushed " + updates.size() + " updates to WebSocket.");

        } catch (Exception e) {
            System.err.println("Error syncing USGS data: " + e.getMessage());
        }
    }
}
