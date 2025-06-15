
import React, { useEffect, useRef } from 'react';
import { Client, IConnection } from '@d-id/client-sdk';

// TODO: Move API Key to a secure backend/environment variable
const D_ID_API_KEY = "Z29vZ2xlLW9hdXRoMnwxMTcyNTE3Njg5MDA0MjIzMjcxNjA6SlNNYjhERkg0ZUdtdGtWU2x2OUV1";

const DidAvatar = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const connectionRef = useRef<IConnection | null>(null);

    useEffect(() => {
        const connectToDid = async () => {
            if (!videoRef.current) return;

            try {
                console.log('Attempting to connect to D-ID...');
                const didClient = new Client({ key: D_ID_API_KEY });
                
                const connection = await didClient.connect({
                    // Using a stock avatar for now. We can change this later.
                    source_url: "https://cdn.d-id.com/avatars/fun_creation/chunks/proj_r4HxPSaNEp4aJcvoHl3fr/alan.jpeg"
                });
                connectionRef.current = connection;
                console.log('D-ID connection established.');

                connection.on('stream:ready', stream => {
                    if (videoRef.current) {
                        videoRef.current.srcObject = stream;
                    }
                    console.log('D-ID stream is ready.');
                    
                    connection.speak({
                        type: 'text',
                        input: 'Hardcore Dev Ops agent is online. How can I help you dominate?'
                    });
                });

                connection.on('stream:error', (error) => {
                    console.error('D-ID stream error:', error);
                });

                connection.on('connection:error', (error) => {
                    console.error('D-ID connection error:', error);
                });

            } catch (error) {
                console.error('Failed to initialize D-ID connection:', error);
            }
        };

        connectToDid();

        return () => {
            if (connectionRef.current) {
                console.log('Closing D-ID connection.');
                connectionRef.current.close();
                connectionRef.current = null;
            }
        };
    }, []);

    return (
        <div className="relative w-64 h-64 mx-auto">
            <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-full rounded-full object-cover border-4 border-hardcore-pink shadow-2xl shadow-hardcore-pink/30"
                style={{ transform: 'scaleX(-1)' }} /* Flip video horizontally for a more natural look */
            />
            <div className="absolute inset-0 rounded-full border-4 border-hardcore-pink/50 animate-pulse"></div>
        </div>
    );
};

export default DidAvatar;
