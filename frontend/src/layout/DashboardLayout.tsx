import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Bell, Map, Activity, LayoutDashboard, Settings, Users, Sun, Moon, Menu, X } from 'lucide-react';
import { useSettings } from '../contexts/ThemeContext';

const DashboardLayout: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const location = useLocation();
    const { theme, setTheme } = useSettings();

    return (
        <div className="flex h-screen w-full bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-100 overflow-hidden font-sans transition-colors duration-200">
            
            {/* Mobile Overlay */}
            {isMobileMenuOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-20 md:hidden" 
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 w-64 glass border-r flex flex-col z-30 transition-transform duration-300 md:relative md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="h-16 flex items-center justify-between px-6 border-b border-slate-200 dark:border-white/10">
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-emerald-600 dark:from-blue-400 dark:to-emerald-400">FloodGuard</span>
                    <button className="md:hidden p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>
                        <X size={20} />
                    </button>
                </div>
                
                <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
                    <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" to="/" active={location.pathname === '/'} onClick={() => setIsMobileMenuOpen(false)} />
                    <NavItem icon={<Map size={20} />} label="Map View" to="/map" active={location.pathname === '/map'} onClick={() => setIsMobileMenuOpen(false)} />
                    <NavItem icon={<Activity size={20} />} label="Analytics" to="/analytics" active={location.pathname === '/analytics'} onClick={() => setIsMobileMenuOpen(false)} />
                    <div className="pt-4 mt-4 border-t border-slate-200 dark:border-white/10">
                        <span className="px-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Admin</span>
                        <NavItem icon={<Users size={20} />} label="Users" to="/users" active={location.pathname === '/users'} onClick={() => setIsMobileMenuOpen(false)} />
                        <NavItem icon={<Settings size={20} />} label="Settings" to="/settings" active={location.pathname === '/settings'} onClick={() => setIsMobileMenuOpen(false)} />
                    </div>
                </nav>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Topbar */}
                <header className="h-16 glass border-b flex items-center justify-between px-4 md:px-6 z-10">
                    <div className="flex items-center gap-3">
                        <button className="md:hidden p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-md hover:bg-slate-200 dark:hover:bg-white/10" onClick={() => setIsMobileMenuOpen(true)}>
                            <Menu size={24} />
                        </button>
                        <div className="hidden sm:flex items-center text-sm text-slate-500 dark:text-slate-400">
                            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 md:space-x-4 relative">
                        {/* Notifications */}
                        <div className="relative">
                            <button 
                                onClick={() => {
                                    setIsNotificationsOpen(!isNotificationsOpen);
                                    setIsProfileOpen(false);
                                }}
                                className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10 transition cursor-pointer relative"
                            >
                                <Bell size={20} />
                                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-slate-900"></span>
                            </button>
                            
                            {/* Notifications Dropdown */}
                            {isNotificationsOpen && (
                                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
                                    <div className="p-3 border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900/50 flex justify-between items-center">
                                        <h3 className="font-semibold text-sm">Notifications</h3>
                                        <span className="text-xs text-blue-500 cursor-pointer hover:underline">Mark all as read</span>
                                    </div>
                                    <div className="max-h-64 overflow-y-auto">
                                        <div className="p-4 border-b border-slate-100 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/5 cursor-pointer transition">
                                            <div className="flex gap-3">
                                                <div className="w-2 h-2 bg-red-500 rounded-full mt-1.5 flex-shrink-0"></div>
                                                <div>
                                                    <p className="text-sm font-medium">Major Flood Warning</p>
                                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Kansas River has exceeded major flood stage.</p>
                                                    <p className="text-[10px] text-slate-400 mt-1">2 mins ago</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-4 hover:bg-slate-50 dark:hover:bg-white/5 cursor-pointer transition">
                                            <div className="flex gap-3">
                                                <div className="w-2 h-2 bg-slate-300 dark:bg-slate-600 rounded-full mt-1.5 flex-shrink-0"></div>
                                                <div>
                                                    <p className="text-sm font-medium">System Update</p>
                                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Dashboard settings have been saved successfully.</p>
                                                    <p className="text-[10px] text-slate-400 mt-1">1 hour ago</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-2 border-t border-slate-200 dark:border-white/10 text-center bg-slate-50 dark:bg-slate-900/50">
                                        <button className="text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition">View All Activity</button>
                                    </div>
                                </div>
                            )}
                        </div>
                        
                        {/* Theme Toggle shortcut */}
                        <button 
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10 transition hidden sm:block cursor-pointer"
                            title="Toggle Theme"
                        >
                            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                        
                        {/* Profile Dropdown */}
                        <div className="relative">
                            <button 
                                onClick={() => {
                                    setIsProfileOpen(!isProfileOpen);
                                    setIsNotificationsOpen(false);
                                }}
                                className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-white shadow-lg cursor-pointer hover:ring-2 hover:ring-blue-500 hover:ring-offset-2 hover:ring-offset-slate-50 dark:hover:ring-offset-slate-900 transition-all"
                            >
                                A
                            </button>
                            
                            {/* Profile Menu Dropdown */}
                            {isProfileOpen && (
                                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
                                    <div className="p-4 border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900/50">
                                        <p className="font-semibold text-sm">Admin User</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">admin@floodguard.gov</p>
                                    </div>
                                    <div className="p-1">
                                        <Link to="/settings" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 rounded-md transition cursor-pointer">
                                            <Settings size={16} /> Preferences
                                        </Link>
                                        <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-md transition cursor-pointer">
                                            <X size={16} /> Sign Out
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main 
                    className="flex-1 overflow-auto relative"
                    onClick={() => {
                        // Close dropdowns when clicking main content
                        setIsNotificationsOpen(false);
                        setIsProfileOpen(false);
                    }}
                >
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

const NavItem = ({ icon, label, to, active = false, onClick }: { icon: React.ReactNode, label: string, to: string, active?: boolean, onClick?: () => void }) => (
    <Link to={to} onClick={onClick} className={`flex items-center px-3 py-2.5 rounded-md transition-colors ${active ? 'bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 font-medium' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'}`}>
        <span className="mr-3">{icon}</span>
        {label}
    </Link>
);

export default DashboardLayout;
