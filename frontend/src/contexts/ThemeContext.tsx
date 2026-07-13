import React, { createContext, useContext, useState, useEffect } from 'react';

type ThemeMode = 'dark' | 'light' | 'system';

interface ThemeContextType {
    theme: ThemeMode;
    setTheme: (theme: ThemeMode) => void;
    notificationsEnabled: boolean;
    setNotificationsEnabled: (enabled: boolean) => void;
    refreshInterval: number;
    setRefreshInterval: (interval: number) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<ThemeMode>(() => {
        return (localStorage.getItem('theme') as ThemeMode) || 'dark';
    });
    
    const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(() => {
        return localStorage.getItem('notificationsEnabled') !== 'false';
    });

    const [refreshInterval, setRefreshInterval] = useState<number>(() => {
        return parseInt(localStorage.getItem('refreshInterval') || '60000', 10);
    });

    useEffect(() => {
        localStorage.setItem('theme', theme);
        localStorage.setItem('notificationsEnabled', String(notificationsEnabled));
        localStorage.setItem('refreshInterval', String(refreshInterval));
        
        const isDark = 
            theme === 'dark' || 
            (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
            
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme, notificationsEnabled, refreshInterval]);

    return (
        <ThemeContext.Provider value={{
            theme, setTheme,
            notificationsEnabled, setNotificationsEnabled,
            refreshInterval, setRefreshInterval
        }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useSettings = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useSettings must be used within a ThemeProvider');
    }
    return context;
};
