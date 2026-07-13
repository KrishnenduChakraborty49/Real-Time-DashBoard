import React from 'react';
import type { Station } from '../hooks/useFloodData';

interface KPICardsProps {
    stations: Station[];
}

const KPICards: React.FC<KPICardsProps> = ({ stations }) => {
    const counts = {
        total: stations.length,
        none: 0,
        action: 0,
        minor: 0,
        moderate: 0,
        major: 0,
        offline: 0
    };

    stations.forEach(s => {
        counts[s.status]++;
    });

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 mt-4">
            <KpiCard label="Total Sensors" value={counts.total} color="text-blue-400" />
            <KpiCard label="Offline" value={counts.offline} color="text-slate-400" />
            <KpiCard label="No Flood" value={counts.none} color="text-green-500" />
            <KpiCard label="Action Stage" value={counts.action} color="text-yellow-500" />
            <KpiCard label="Minor Flood" value={counts.minor} color="text-orange-500" />
            <KpiCard label="Moderate Flood" value={counts.moderate} color="text-red-500" />
            <KpiCard label="Major Flood" value={counts.major} color="text-purple-500" />
        </div>
    );
};

const KpiCard = ({ label, value, color }: { label: string, value: number, color: string }) => (
    <div className="glass p-3 rounded-xl border border-white/10 flex flex-col items-center justify-center transition-all hover:bg-white/5 cursor-default relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <span className="text-[10px] uppercase tracking-wider text-slate-400 mb-1 z-10">{label}</span>
        {/* Simple animation key changes when value changes to trigger pulse */}
        <span key={value} className={`text-2xl font-bold animate-in zoom-in duration-300 ${color} z-10`}>
            {value}
        </span>
    </div>
);

export default KPICards;
