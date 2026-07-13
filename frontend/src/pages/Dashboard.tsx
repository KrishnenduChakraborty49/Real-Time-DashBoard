import React, { useState } from 'react';
import { useFloodData } from '../hooks/useFloodData';
import type { Station } from '../hooks/useFloodData';
import MapComponent from '../components/MapComponent';
import StationPanel from '../components/StationPanel';
import KPICards from '../components/KPICards';
import { Search, Filter } from 'lucide-react';

const Dashboard: React.FC = () => {
    const { stations } = useFloodData();
    const [selectedStation, setSelectedStation] = useState<Station | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredStations = stations.filter(s => 
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        s.river.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="h-full flex flex-col p-4 relative overflow-hidden">
            
            {/* Top Toolbar */}
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-bold">GIS Live Map</h1>
                
                <div className="flex gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
                        <input 
                            type="text" 
                            placeholder="Search stations or rivers..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                        />
                    </div>
                    <button className="glass px-3 py-1.5 rounded-full flex items-center gap-2 text-sm hover:bg-white/10 transition">
                        <Filter size={16} /> Filters
                    </button>
                </div>
            </div>

            {/* Map Area */}
            <div className="flex-1 relative rounded-xl overflow-hidden shadow-2xl border border-white/10">
                <MapComponent 
                    stations={filteredStations} 
                    selectedStation={selectedStation} 
                    onStationSelect={(station) => setSelectedStation(station)} 
                />
                
                {/* Station Detail Panel overlay */}
                <StationPanel 
                    station={selectedStation} 
                    onClose={() => setSelectedStation(null)} 
                />
            </div>
            
            {/* KPI Statistics */}
            <KPICards stations={stations} />
        </div>
    );
};

export default Dashboard;
