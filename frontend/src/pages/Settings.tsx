import React, { useState } from 'react';
import { useSettings } from '../contexts/ThemeContext';
import toast from 'react-hot-toast';

const Settings: React.FC = () => {
    const { 
        theme, setTheme, 
        notificationsEnabled, setNotificationsEnabled,
        refreshInterval, setRefreshInterval 
    } = useSettings();

    // Local state for the form so it only saves when "Save Changes" is clicked
    const [localTheme, setLocalTheme] = useState(theme);
    const [localNotifications, setLocalNotifications] = useState(notificationsEnabled);
    const [localRefresh, setLocalRefresh] = useState(refreshInterval);

    const handleSave = () => {
        setTheme(localTheme);
        setNotificationsEnabled(localNotifications);
        setRefreshInterval(localRefresh);
        
        toast.success('Settings saved successfully!', {
            style: {
                background: localTheme === 'light' ? '#fff' : '#1e293b',
                color: localTheme === 'light' ? '#0f172a' : '#fff',
            },
        });
    };

    return (
        <div className="p-6 h-full overflow-y-auto">
            <h1 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Settings</h1>
            
            <div className="bg-white dark:bg-white/5 p-6 rounded-xl border border-slate-200 dark:border-white/10 max-w-2xl shadow-sm">
                <p className="text-slate-500 dark:text-slate-400 mb-6">Manage your dashboard configuration and preferences.</p>
                
                <div className="space-y-6">
                    {/* Theme Preference */}
                    <div>
                        <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Theme Preference</label>
                        <select 
                            value={localTheme}
                            onChange={(e) => setLocalTheme(e.target.value as any)}
                            className="bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-white/20 rounded-md p-2.5 text-sm w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                            <option value="dark">Dark Mode</option>
                            <option value="light">Light Mode</option>
                            <option value="system">System Default</option>
                        </select>
                    </div>
                    
                    {/* Refresh Interval */}
                    <div>
                        <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Data Refresh Interval</label>
                        <select 
                            value={localRefresh}
                            onChange={(e) => setLocalRefresh(Number(e.target.value))}
                            className="bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-white/20 rounded-md p-2.5 text-sm w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                            <option value={30000}>30 seconds</option>
                            <option value={60000}>1 minute</option>
                            <option value={300000}>5 minutes</option>
                        </select>
                    </div>
                    
                    {/* Notifications */}
                    <div>
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <div className="relative flex items-center">
                                <input 
                                    type="checkbox" 
                                    checked={localNotifications}
                                    onChange={(e) => setLocalNotifications(e.target.checked)}
                                    className="w-5 h-5 rounded border-slate-300 dark:border-white/20 text-blue-600 focus:ring-blue-500 bg-slate-50 dark:bg-slate-900 cursor-pointer transition-colors"
                                />
                            </div>
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                                Enable Desktop Notifications
                            </span>
                        </label>
                    </div>
                    
                    <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex justify-end">
                        <button 
                            onClick={handleSave}
                            className="bg-blue-600 hover:bg-blue-700 text-white transition-colors py-2 px-6 rounded-md text-sm font-medium shadow-sm flex items-center gap-2"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
