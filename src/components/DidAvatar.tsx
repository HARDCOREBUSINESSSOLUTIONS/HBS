
import React, { useEffect } from 'react';

// Using the key and agent ID from the script snippet you provided.
const D_ID_CLIENT_KEY = "Z29vZ2xlLW9hdXRoMnwxMTcyNTE3Njg5MDA0MjIzMjcxNjA6SlNNYjhERkg0ZUdtdGtWU2x2OUV1";
const D_ID_AGENT_ID = "agt_Mkg6uSug";

const DidAvatar = () => {
    useEffect(() => {
        // Prevent adding multiple scripts if the component re-renders.
        if (document.querySelector('script[data-name="did-agent"]')) {
            return;
        }

        const script = document.createElement('script');
        script.type = 'module';
        script.src = 'https://agent.d-id.com/v1/index.js';
        script.dataset.name = 'did-agent';
        script.dataset.mode = 'fabio'; // This likely creates a floating avatar
        script.dataset.clientKey = D_ID_CLIENT_KEY;
        script.dataset.agentId = D_ID_AGENT_ID;
        script.dataset.monitor = 'true';

        document.body.appendChild(script);

        return () => {
            // Clean up by removing the script and the agent element when the component is unmounted.
            const existingScript = document.querySelector('script[data-name="did-agent"]');
            if (existingScript) {
                document.body.removeChild(existingScript);
            }
            const agentElement = document.querySelector('did-agent');
            if (agentElement) {
                agentElement.remove();
            }
        };
    }, []);

    // The script will likely inject a floating avatar, but we'll return a placeholder 
    // to maintain the page layout where the avatar was.
    return <div className="relative w-64 h-64 mx-auto" aria-label="D-ID Agent Container"></div>;
};

export default DidAvatar;
