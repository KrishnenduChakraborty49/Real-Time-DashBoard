import { useState, useEffect } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

export type FloodStatus = 'none' | 'action' | 'minor' | 'moderate' | 'major' | 'offline';

export interface Station {
    id: string;
    name: string;
    river: string;
    lat: number;
    lng: number;
    currentLevel: number;
    waterTrend: 'rising' | 'falling' | 'stable';
    status: FloodStatus;
    lastUpdated: string;
}

export const useFloodData = () => {
    const [stations, setStations] = useState<Station[]>([]);

    useEffect(() => {
        // Setup STOMP client
        const client = new Client({
            webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
            reconnectDelay: 5000,
            onConnect: () => {
                console.log('Connected to WebSocket');
                
                const handleMessage = (message: any) => {
                    if (message.body) {
                        try {
                            const newStations: Station[] = JSON.parse(message.body);
                            // Avoid setting empty array if the server has no data yet
                            if (newStations.length > 0) {
                                setStations(newStations);
                            }
                        } catch (e) {
                            console.error('Error parsing STOMP message', e);
                        }
                    }
                };

                // Listen for live broadcast updates
                client.subscribe('/topic/flood-updates', handleMessage);
                
                // Immediately request the initial snapshot of data
                client.subscribe('/app/flood-updates', handleMessage);
            },
            onStompError: (frame) => {
                console.error('STOMP error', frame);
            }
        });

        client.activate();

        return () => {
            client.deactivate();
        };
    }, []);

    return { stations };
};
