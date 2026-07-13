import React from 'react';
import type { Station } from '../hooks/useFloodData';
import { Droplet, Thermometer, Wind, CloudRain, Clock, Activity, ExternalLink, Download } from 'lucide-react';

interface StationPanelProps {
    station: Station | null;
    onClose: () => void;
}

const statusColors = {
    'none': 'bg-green-500',
    'action': 'bg-yellow-500',
    'minor': 'bg-orange-500',
    'moderate': 'bg-red-500',
    'major': 'bg-purple-500',
    'offline': 'bg-slate-500'
};

const StationPanel: React.FC<StationPanelProps> = ({ station, onClose }) => {
    if (!station) return null;

    return (
        <div className="w-80 h-full glass border-l border-white/10 flex flex-col z-20 absolute right-0 top-0 overflow-y-auto animate-in slide-in-from-right duration-300 shadow-2xl">
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-slate-900/50">
                <h2 className="font-bold text-lg truncate pr-2">{station.name}</h2>
                <button onClick={onClose} className="text-slate-400 hover:text-white">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </div>
            
            <div className="p-4 flex flex-col gap-6">
                
                {/* Header Info */}
                <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full ${statusColors[station.status]} shadow-[0_0_10px_currentColor]`}></div>
                    <div>
                        <div className="text-xs uppercase tracking-wider text-slate-400">Flood Category</div>
                        <div className="font-semibold capitalize text-lg flex items-center gap-2">
                            {station.waterTrend === 'rising' && <Activity size={16} className="text-red-400" />}
                            {station.waterTrend === 'falling' && <Activity size={16} className="text-green-400 rotate-180" />}
                        </div>
                    </div>
                </div>

                {/* Location Details */}
                <div className="bg-white/5 rounded-lg p-3 text-sm">
                    <div className="grid grid-cols-2 gap-y-2">
                        <div className="text-slate-400">Station ID</div>
                        <div className="font-medium">{station.id}</div>
                        <div className="text-slate-400">River</div>
                        <div className="font-medium truncate">{station.river}</div>
                        <div className="text-slate-400">County</div>
                        <div className="font-medium">N/A</div>
                        <div className="text-slate-400">State</div>
                        <div className="font-medium">N/A</div>
                    </div>
                </div>

                {/* Core Metrics */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="glass p-3 rounded-lg border border-white/10">
                        <div className="flex items-center gap-2 text-blue-400 mb-1">
                            <Droplet size={16} />
                            <span className="text-xs font-semibold">Water Level</span>
                        </div>
                        <div className="text-2xl font-bold">{station.currentLevel.toFixed(2)}<span className="text-sm font-normal text-slate-400 ml-1">ft</span></div>
                        <div className="text-xs text-slate-400 mt-1">Flood Stage: N/A ft</div>
                    </div>
                    <div className="glass p-3 rounded-lg border border-white/10">
                        <div className="flex items-center gap-2 text-cyan-400 mb-1">
                            <Wind size={16} />
                            <span className="text-xs font-semibold">Flow Rate</span>
                        </div>
                        <div className="text-2xl font-bold">0<span className="text-sm font-normal text-slate-400 ml-1">cfs</span></div>
                    </div>
                </div>

                {/* Environmental */}
                <div>
                    <h3 className="text-xs uppercase font-semibold text-slate-400 mb-3 border-b border-white/10 pb-1">Environmental Data</h3>
                    <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="bg-white/5 p-2 rounded">
                            <Thermometer size={16} className="mx-auto text-orange-400 mb-1" />
                            <div className="font-medium">N/A</div>
                        </div>
                        <div className="bg-white/5 p-2 rounded">
                            <Droplet size={16} className="mx-auto text-blue-400 mb-1" />
                            <div className="font-medium">N/A</div>
                        </div>
                        <div className="bg-white/5 p-2 rounded">
                            <CloudRain size={16} className="mx-auto text-indigo-400 mb-1" />
                            <div className="font-medium">N/A</div>
                        </div>
                    </div>
                </div>

                {/* Last Updated */}
                <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Clock size={14} />
                    Last Updated: {new Date(station.lastUpdated).toLocaleTimeString()}
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 mt-2 border-t border-white/10 pt-4">
                    <button className="w-full bg-blue-600 hover:bg-blue-700 transition py-2 rounded flex items-center justify-center gap-2 text-sm font-medium">
                        <Activity size={16} /> View Historical Graph
                    </button>
                    <div className="flex gap-2">
                        <button className="flex-1 bg-white/10 hover:bg-white/20 transition py-2 rounded flex items-center justify-center gap-2 text-xs">
                            <Download size={14} /> Export
                        </button>
                        <button className="flex-1 bg-white/10 hover:bg-white/20 transition py-2 rounded flex items-center justify-center gap-2 text-xs">
                            <ExternalLink size={14} /> NOAA
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default StationPanel;
