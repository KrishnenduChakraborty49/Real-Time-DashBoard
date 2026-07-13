import React, { useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import type { Station } from '../hooks/useFloodData';

interface MapComponentProps {
    stations: Station[];
    selectedStation: Station | null;
    onStationSelect: (station: Station) => void;
}

const statusColors = {
    'none': '#22c55e', // green-500
    'action': '#eab308', // yellow-500
    'minor': '#f97316', // orange-500
    'moderate': '#ef4444', // red-500
    'major': '#a855f7', // purple-500
    'offline': '#64748b' // slate-500
};

// Component to handle map zooming to selected station
const MapController = ({ selectedStation }: { selectedStation: Station | null }) => {
    const map = useMap();
    useEffect(() => {
        if (selectedStation) {
            map.flyTo([selectedStation.lat, selectedStation.lng], 9, {
                duration: 1.5
            });
        }
    }, [selectedStation, map]);
    return null;
};

const MapComponent: React.FC<MapComponentProps> = ({ stations, selectedStation, onStationSelect }) => {
    return (
        <MapContainer 
            center={[38.5, -98.0]} 
            zoom={6} 
            className="w-full h-full bg-slate-900 rounded-xl"
            zoomControl={false}
        >
            <TileLayer
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
            />
            
            {stations.map(station => (
                <CircleMarker
                    key={station.id}
                    center={[station.lat, station.lng]}
                    pathOptions={{ 
                        color: '#000', 
                        weight: 1, 
                        fillColor: statusColors[station.status], 
                        fillOpacity: 0.8 
                    }}
                    radius={station.status === 'major' ? 10 : (station.status === 'moderate' ? 8 : 6)}
                    eventHandlers={{
                        click: () => onStationSelect(station)
                    }}
                />
            ))}

            <MapController selectedStation={selectedStation} />
            
            {/* Custom Legend */}
            <div className="absolute bottom-4 right-4 z-[400] glass p-3 rounded-lg border border-white/10 text-xs">
                <div className="font-semibold mb-2">Flood Legend</div>
                <div className="flex flex-col gap-1.5">
                    {Object.entries(statusColors).map(([status, color]) => (
                        <div key={status} className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full border border-black" style={{ backgroundColor: color }}></div>
                            <span className="capitalize">{status === 'none' ? 'No Flood' : status}</span>
                        </div>
                    ))}
                </div>
            </div>
        </MapContainer>
    );
};

export default MapComponent;
