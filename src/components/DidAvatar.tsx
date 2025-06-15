import React, { useEffect, useId } from 'react';
import { cn } from '@/lib/utils';

const D_ID_CLIENT_KEY = "Z29vZ2xlLW9hdXRoMnwxMTcyNTE3Njg5MDA0MjIzMjcxNjA6SlNNYjhERkg0ZUdtdGtWU2x2OUV1";
const D_ID_AGENT_ID = "agt_Mkg6uSug";

interface DidAvatarProps {
    isSpeaking?: boolean;
}

const DidAvatar = ({ isSpeaking }: DidAvatarProps) => {
    const uniqueId = useId();
    const containerId = `did-agent-container-${uniqueId}`;

    useEffect(() => {
        // The D-ID script manages a single agent instance.
        // To ensure it works correctly with SPA navigation, we'll remove any
        // existing agent and script before creating a new one for this component.
        const existingScript = document.querySelector('script[data-name="did-agent"]');
        if (existingScript) existingScript.remove();
        
        const agentElement = document.querySelector('did-agent');
        if (agentElement) agentElement.remove();

        // Create and append the new script for the current component instance
        const script = document.createElement('script');
        script.type = 'module';
        script.src = 'https://agent.d-id.com/v1/index.js';
        script.dataset.name = 'did-agent';
        script.dataset.containerId = containerId;
        script.dataset.clientKey = D_ID_CLIENT_KEY;
        script.dataset.agentId = D_ID_AGENT_ID;
        // script.dataset.monitor = 'true'; // Removed: this debug tool can cause visual conflicts.

        document.head.appendChild(script);

        return () => {
            // Cleanup on unmount
            // It's important to remove the script and agent to prevent issues on other pages.
            const scriptOnPage = document.querySelector('script[data-name="did-agent"]');
            if (scriptOnPage) scriptOnPage.remove();
            
            const agentOnPage = document.querySelector('did-agent');
            if (agentOnPage) agentOnPage.remove();
        };
    }, [containerId]);

    return (
        <div 
            id={containerId} 
            className={cn(
                "relative w-64 h-64 mx-auto border-4 border-hardcore-pink rounded-full shadow-2xl shadow-hardcore-pink/30 overflow-hidden transition-all duration-300",
                isSpeaking && "border-green-400 shadow-green-400/50 scale-105"
            )} 
            aria-label="D-ID Agent Container"
        />
    );
};

export default DidAvatar;
