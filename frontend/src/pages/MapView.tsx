import React, { useState } from 'react';
import { useFloodData } from '../hooks/useFloodData';
import type { Station } from '../hooks/useFloodData';
import MapComponent from '../components/MapComponent';
import StationPanel from '../components/StationPanel';

const MapView: React.FC = () => {
    const { stations } = useFloodData();
    const [selectedStation, setSelectedStation] = useState<Station | null>(null);

    return (
        <div className="h-full flex flex-col p-4 relative overflow-hidden">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-bold">Full Map View</h1>
            </div>

            <div className="flex-1 relative rounded-xl overflow-hidden shadow-2xl border border-white/10">
                <MapComponent 
                    stations={stations} 
                    selectedStation={selectedStation} 
                    onStationSelect={(station) => setSelectedStation(station)} 
                />
                
                <StationPanel 
                    station={selectedStation} 
                    onClose={() => setSelectedStation(null)} 
                />
            </div>
        </div>
    );
};

export default MapView;
