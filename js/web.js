class WebClient {
    constructor() {
        this.defaultTimeout = 60000; // 60 seconds in milliseconds
    }

    async getAsync(requestUri, timeOut = 60) {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), timeOut * 1000);

            const response = await fetch(requestUri, {
                method: 'GET',
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            const content = await response.text();

            if (response.ok && response.status === 200) {
                return JSON.parse(content);
            } else {
                throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
            }
        } catch (ex) {
            if (ex.name === 'AbortError') {
                throw new Error('Request timeout');
            }
            throw ex;
        }
    }

    async getAsyncTyped(requestUri, ModelClass, timeOut = 60) {
        const data = await this.getAsync(requestUri, timeOut);
        
        if (ModelClass && typeof ModelClass === 'function') {
            return Object.assign(new ModelClass(), data);
        }
        
        return data;
    }
}

// Export if using modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WebClient;
}
