import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format, subDays } from 'date-fns';

const Analytics: React.FC = () => {
    const [startDate, setStartDate] = useState<Date>(subDays(new Date(), 7));
    const [endDate, setEndDate] = useState<Date>(new Date());
    const [trendData, setTrendData] = useState<any[]>([]);
    const [distributionData, setDistributionData] = useState<any[]>([]);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const token = localStorage.getItem('token');
                const headers = { 'Authorization': `Bearer ${token}` };

                const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
                const trendRes = await fetch(`${API_URL}/api/analytics/historical?startDate=${format(startDate, 'yyyy-MM-dd')}&endDate=${format(endDate, 'yyyy-MM-dd')}`, { headers });
                const distRes = await fetch(`${API_URL}/api/analytics/distribution`, { headers });

                if (trendRes.ok) setTrendData(await trendRes.json());
                if (distRes.ok) setDistributionData(await distRes.json());
            } catch (err) {
                console.error("Failed to fetch analytics", err);
            }
        };

        fetchAnalytics();
    }, [startDate, endDate]);

    return (
        <div className="p-6 h-full overflow-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <h1 className="text-2xl font-bold">Flood Analytics & Insights</h1>
                
                <div className="flex items-center gap-4 bg-slate-800 p-2 rounded-lg border border-slate-700">
                    <div className="text-slate-400 text-sm">Date Range:</div>
                    <DatePicker 
                        selected={startDate} 
                        onChange={(date: Date | null) => date && setStartDate(date)} 
                        selectsStart 
                        startDate={startDate} 
                        endDate={endDate} 
                        className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-sm text-slate-200 focus:outline-none focus:border-blue-500 w-28"
                    />
                    <span className="text-slate-500">-</span>
                    <DatePicker 
                        selected={endDate} 
                        onChange={(date: Date | null) => date && setEndDate(date)} 
                        selectsEnd 
                        startDate={startDate} 
                        endDate={endDate} 
                        minDate={startDate}
                        className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-sm text-slate-200 focus:outline-none focus:border-blue-500 w-28"
                    />
                </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                
                {/* Chart 1: Water Level Trends */}
                <div className="glass p-5 rounded-xl border border-white/10 xl:col-span-2 shadow-lg">
                    <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Water Level Trends (ft)</h2>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={trendData}>
                                <defs>
                                    <linearGradient id="colorKansas" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff15" vertical={false} />
                                <XAxis dataKey="name" stroke="#64748b" tick={{fill: '#94a3b8'}} axisLine={false} tickLine={false} />
                                <YAxis stroke="#64748b" tick={{fill: '#94a3b8'}} axisLine={false} tickLine={false} />
                                <Tooltip contentStyle={{backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px'}} />
                                <Legend />
                                <Area type="monotone" dataKey="kansas" name="Kansas River" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorKansas)" />
                                <Area type="monotone" dataKey="neosho" name="Neosho River" stroke="#a855f7" strokeWidth={3} fillOpacity={0.1} fill="#a855f7" />
                                <Area type="monotone" dataKey="arkansas" name="Arkansas River" stroke="#10b981" strokeWidth={3} fillOpacity={0.1} fill="#10b981" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Chart 2: Flood Distribution */}
                <div className="glass p-5 rounded-xl border border-white/10 shadow-lg">
                    <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Station Flood Distribution</h2>
                    <div className="h-[300px] w-full relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={distributionData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={70}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {distributionData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px'}} />
                                <Legend layout="vertical" verticalAlign="middle" align="right" />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
