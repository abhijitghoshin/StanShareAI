/**
 * StanShareAI API Client
 * Utility class for calling backend REST API endpoints
 */

class StanShareAPIClient {
    constructor(baseUrl = 'http://localhost:5000') {
        this.baseUrl = baseUrl;
        this.pollingInterval = null;
    }

    /**
     * Check API health
     */
    async checkHealth() {
        try {
            const response = await fetch(`${this.baseUrl}/api/health`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('Error checking health:', error);
            throw error;
        }
    }

    /**
     * Start a new extraction
     * @param {number} fundCount - Number of funds to extract (1-500)
     * @param {string} formType - Form type (485APOS, 10-K, 10-Q, N-1A, N-PORT)
     * @param {string} batchName - Optional batch name
     */
    async startExtraction(fundCount, formType, batchName = '') {
        try {
            const response = await fetch(`${this.baseUrl}/api/extract`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    fund_count: fundCount,
                    form_type: formType,
                    batch_name: batchName
                })
            });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('Error starting extraction:', error);
            throw error;
        }
    }

    /**
     * Get extraction status
     * @param {string} batchId - Batch ID from startExtraction
     */
    async getExtractionStatus(batchId) {
        try {
            const response = await fetch(`${this.baseUrl}/api/extract/status?batch_id=${batchId}`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('Error getting extraction status:', error);
            throw error;
        }
    }

    /**
     * Poll extraction status until complete
     * @param {string} batchId - Batch ID
     * @param {function} onProgress - Callback for progress updates
     * @param {number} interval - Poll interval in ms (default 2000)
     */
    pollExtractionStatus(batchId, onProgress, interval = 2000) {
        this.pollingInterval = setInterval(async () => {
            try {
                const status = await this.getExtractionStatus(batchId);
                if (onProgress) onProgress(status);
                if (status.status === 'completed' || status.status === 'failed') {
                    this.stopPolling();
                }
            } catch (error) {
                console.error('Error polling status:', error);
            }
        }, interval);
    }

    /**
     * Stop polling
     */
    stopPolling() {
        if (this.pollingInterval) {
            clearInterval(this.pollingInterval);
            this.pollingInterval = null;
        }
    }

    /**
     * Get all funds
     * @param {number} limit - Number of results to return
     * @param {number} offset - Offset for pagination
     */
    async getFunds(limit = 100, offset = 0) {
        try {
            const response = await fetch(`${this.baseUrl}/api/funds?limit=${limit}&offset=${offset}`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching funds:', error);
            throw error;
        }
    }

    /**
     * Get annotations
     * @param {number} limit - Number of results
     * @param {number} offset - Offset for pagination
     */
    async getAnnotations(limit = 100, offset = 0) {
        try {
            const response = await fetch(`${this.baseUrl}/api/annotations?limit=${limit}&offset=${offset}`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching annotations:', error);
            throw error;
        }
    }

    /**
     * Get quality metrics
     */
    async getQualityMetrics() {
        try {
            const response = await fetch(`${this.baseUrl}/api/quality/metrics`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching quality metrics:', error);
            throw error;
        }
    }

    /**
     * Get scheduler status
     */
    async getSchedulerStatus() {
        try {
            const response = await fetch(`${this.baseUrl}/api/scheduler/status`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('Error getting scheduler status:', error);
            throw error;
        }
    }

    /**
     * Start scheduler
     */
    async startScheduler() {
        try {
            const response = await fetch(`${this.baseUrl}/api/scheduler/start`, { method: 'POST' });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('Error starting scheduler:', error);
            throw error;
        }
    }

    /**
     * Stop scheduler
     */
    async stopScheduler() {
        try {
            const response = await fetch(`${this.baseUrl}/api/scheduler/stop`, { method: 'POST' });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('Error stopping scheduler:', error);
            throw error;
        }
    }

    /**
     * Get scheduler jobs
     */
    async getSchedulerJobs() {
        try {
            const response = await fetch(`${this.baseUrl}/api/scheduler/jobs`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('Error getting scheduler jobs:', error);
            throw error;
        }
    }

    /**
     * Run delta detection
     */
    async runDeltaDetection() {
        try {
            const response = await fetch(`${this.baseUrl}/api/delta/detect`, { method: 'POST' });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('Error running delta detection:', error);
            throw error;
        }
    }

    /**
     * Get delta report
     */
    async getDeltaReport() {
        try {
            const response = await fetch(`${this.baseUrl}/api/delta/report`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('Error getting delta report:', error);
            throw error;
        }
    }

    /**
     * Get stale data
     */
    async getStaleData() {
        try {
            const response = await fetch(`${this.baseUrl}/api/delta/stale-data`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('Error getting stale data:', error);
            throw error;
        }
    }

    /**
     * Get quality statistics
     */
    async getQualityStats() {
        try {
            const response = await fetch(`${this.baseUrl}/api/quality/stats`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('Error getting quality stats:', error);
            throw error;
        }
    }

    /**
     * Utility: Format number as currency
     */
    static formatCurrency(value) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(value || 0);
    }

    /**
     * Utility: Format date
     */
    static formatDate(dateString) {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    /**
     * Utility: Get status color class
     */
    static getStatusColor(status) {
        switch (status?.toLowerCase()) {
            case 'completed':
            case 'running':
                return 'text-green-400';
            case 'pending':
                return 'text-yellow-400';
            case 'failed':
            case 'error':
                return 'text-red-400';
            default:
                return 'text-slate-400';
        }
    }

    /**
     * Utility: Get quality score color
     */
    static getScoreColor(score) {
        if (score >= 90) return 'text-green-400 bg-green-400/10';
        if (score >= 70) return 'text-yellow-400 bg-yellow-400/10';
        return 'text-red-400 bg-red-400/10';
    }
}
