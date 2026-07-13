import React, { useState } from 'react';
import { useFloodData } from '../hooks/useFloodData';
import type { Station, FloodStatus } from '../hooks/useFloodData';
import MapComponent from '../components/MapComponent';
import StationPanel from '../components/StationPanel';
import KPICards from '../components/KPICards';
import { Search, Filter, ChevronDown } from 'lucide-react';

const Dashboard: React.FC = () => {
    const { stations } = useFloodData();
    const [selectedStation, setSelectedStation] = useState<Station | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<FloodStatus | 'all'>('all');
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const filteredStations = stations.filter(s => {
        const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.river.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || s.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

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
                    <div className="relative">
                        <button 
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            className={`glass px-3 py-1.5 rounded-full flex items-center gap-2 text-sm hover:bg-white/10 transition cursor-pointer ${statusFilter !== 'all' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' : ''}`}
                        >
                            <Filter size={16} /> 
                            {statusFilter === 'all' ? 'Filters' : statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}
                            <ChevronDown size={14} />
                        </button>
                        
                        {isFilterOpen && (
                            <div className="absolute right-0 mt-2 w-40 glass rounded-xl border border-white/10 shadow-2xl py-2 z-[500]">
                                <button onClick={() => { setStatusFilter('all'); setIsFilterOpen(false); }} className="w-full text-left px-4 py-2 text-sm hover:bg-white/10 transition">All Statuses</button>
                                <button onClick={() => { setStatusFilter('major'); setIsFilterOpen(false); }} className="w-full text-left px-4 py-2 text-sm hover:bg-white/10 transition text-purple-400">Major Flood</button>
                                <button onClick={() => { setStatusFilter('moderate'); setIsFilterOpen(false); }} className="w-full text-left px-4 py-2 text-sm hover:bg-white/10 transition text-red-400">Moderate Flood</button>
                                <button onClick={() => { setStatusFilter('minor'); setIsFilterOpen(false); }} className="w-full text-left px-4 py-2 text-sm hover:bg-white/10 transition text-orange-400">Minor Flood</button>
                                <button onClick={() => { setStatusFilter('action'); setIsFilterOpen(false); }} className="w-full text-left px-4 py-2 text-sm hover:bg-white/10 transition text-yellow-400">Action Stage</button>
                                <button onClick={() => { setStatusFilter('none'); setIsFilterOpen(false); }} className="w-full text-left px-4 py-2 text-sm hover:bg-white/10 transition text-green-400">No Flood</button>
                            </div>
                        )}
                    </div>
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
            <KPICards stations={filteredStations} />
        </div>
    );
};

export default Dashboard;
