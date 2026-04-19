(function() {
    // Configuration options
    const config = window.VisualEditorConfig || {};

    // --- AUTO-DETECT EDITOR URL ---
    const currentScript = document.currentScript || (function() {
        const scripts = document.getElementsByTagName('script');
        return Array.from(scripts).find(s => s.src.includes('editor.js'));
    })();
    
    // Fallback to your confirmed domain if detection fails
    const scriptSrc = currentScript ? currentScript.src : 'https://yourdomain.com/editor.js';
    const basePath = scriptSrc.substring(0, scriptSrc.lastIndexOf('/') + 1);
    
    // Default to index.html at the same location as the script
    const editorUrl = config.editorUrl || (basePath + 'index.html');

    // --- LOCAL ENV CHECK ---
    const urlParams = new URLSearchParams(window.location.search);
    const forceEdit = urlParams.get('edit') === 'true';
    
    const isLocal = window.location.hostname === 'localhost' || 
                    window.location.hostname === '127.0.0.1' || 
                    window.location.hostname === '0.0.0.0' ||
                    window.location.hostname.endsWith('.local') ||
                    window.location.hostname.startsWith('192.168.') ||
                    window.location.hostname.startsWith('10.') ||
                    window.location.hostname.startsWith('172.');
    
    // Only show the button if on localhost, if forced via URL, or if explicitly allowed in config
    if (!isLocal && !config.allowLive && !forceEdit) {
        console.log("Visual Editor: Hidden for security (not a local domain). Add ?edit=true to your URL to show it.");
        return;
    }

    console.log("Visual Editor: Active.");

    const init = () => {
        if (!document.body) return; // Final safety check

        // 1. Create Floating Edit Button
        const btn = document.createElement('button');
        btn.innerHTML = '✏️ Edit Page';
        btn.style.cssText = `
            position: fixed;
            bottom: ${config.buttonPosition?.bottom || '20px'};
            right: ${config.buttonPosition?.right || '20px'};
            padding: 10px 16px;
            background: #F15A2D;
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            z-index: 999999;
            font-family: sans-serif;
            font-weight: 600;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            transition: transform 0.2s ease;
        `;
        btn.onmouseover = () => btn.style.transform = 'scale(1.05)';
        btn.onmouseout = () => btn.style.transform = 'scale(1)';
        
        // 2. Click Handler - Launch Editor Overlay
        btn.onclick = () => {
            if (!document.body) return;

            // Create full-screen overlay
            const overlay = document.createElement('div');
            overlay.style.cssText = `
                position: fixed;
                top: 0; left: 0; width: 100vw; height: 100vh;
                background: rgba(0,0,0,0.9);
                z-index: 1000000;
                display: flex;
                flex-direction: column;
            `;
            
            // Add Close Button
            const closeBtn = document.createElement('button');
            closeBtn.innerHTML = '✕ Close';
            closeBtn.style.cssText = `
                position: absolute; top: 10px; right: 10px;
                background: #EF4444; color: white; border: none;
                padding: 8px 12px; border-radius: 4px; cursor: pointer; z-index: 1000001;
            `;
            closeBtn.onclick = () => {
                if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
            };
            
            // Add Iframe
            const iframe = document.createElement('iframe');
            iframe.style.cssText = `width: 100%; height: 100%; border: none;`;
            
            // Prepare current page data to send to editor
            const currentHTML = document.documentElement.outerHTML;
            
            // Append elements
            overlay.appendChild(closeBtn);
            overlay.appendChild(iframe);
            document.body.appendChild(overlay);
            
            // Initialize editor via iframe and message passing
            iframe.src = editorUrl;
            
            // Wait for iframe to load, then send content
            iframe.onload = () => {
                iframe.contentWindow.postMessage({
                    type: 'INITIAL_LOAD',
                    html: currentHTML
                }, '*');
            };
        };
        
        document.body.appendChild(btn);
    };

    if (document.readyState === 'complete') {
        init();
    } else {
        window.addEventListener('load', init);
    }
    
    // 3. Listen for Save Event from Editor
    window.addEventListener('message', (event) => {
        if (event.data.type === 'SAVE_HTML') {
            const cleanHTML = event.data.html;
            
            // Execute custom onSave callback if provided
            if (typeof config.onSave === 'function') {
                config.onSave(cleanHTML);
            }
            
            // Auto-POST if saveUrl is provided
            if (config.saveUrl) {
                fetch(config.saveUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ html: cleanHTML, path: window.location.pathname })
                }).then(res => {
                    if (res.ok) alert("Page saved successfully!");
                });
            }
        }
    });
})();
