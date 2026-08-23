document.addEventListener('DOMContentLoaded', () => {
    const testApiBtn = document.getElementById('testApiBtn');
    const apiStatus = document.getElementById('apiStatus');
    const statusText = document.getElementById('statusText');
    const apiResponse = document.getElementById('apiResponse');

    // Update status UI
    const updateStatus = (status, text, responseData = "") => {
        apiStatus.className = `status-indicator ${status}`;
        statusText.textContent = text;
        
        if (responseData) {
            apiResponse.textContent = typeof responseData === 'object' 
                ? JSON.stringify(responseData, null, 2) 
                : responseData;
            apiResponse.style.color = status === 'success' ? 'var(--success-color)' : 'var(--error-color)';
        } else {
            apiResponse.textContent = "";
        }
    };

    // Test API Connection
    testApiBtn.addEventListener('click', async () => {
        // Reset state
        updateStatus('waiting', 'Connecting to server...', '...');
        
        // Add loading state to button
        const originalBtnText = testApiBtn.innerHTML;
        testApiBtn.innerHTML = '<span>Connecting...</span><div class="btn-glow"></div>';
        testApiBtn.style.opacity = '0.7';
        testApiBtn.style.pointerEvents = 'none';

        try {
            // Note: Make sure your Node.js backend is running on port 8000
            const response = await fetch('http://localhost:8000/api', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json, text/plain, */*'
                }
            });

            if (response.ok) {
                const data = await response.text();
                updateStatus('success', 'Connected Successfully', data);
            } else {
                updateStatus('error', 'Connection Failed', `Status Code: ${response.status}`);
            }
        } catch (error) {
            updateStatus('error', 'Server Unreachable', 'Make sure your Node.js backend is running and CORS is enabled.\nError: ' + error.message);
        } finally {
            // Restore button state
            setTimeout(() => {
                testApiBtn.innerHTML = originalBtnText;
                testApiBtn.style.opacity = '1';
                testApiBtn.style.pointerEvents = 'auto';
            }, 500);
        }
    });
});
