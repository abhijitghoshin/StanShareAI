/**
 * StanShareAIData API Client
 * 
 * Provides methods to interact with the Python backend API
 * for SEC EDGAR fund data extraction and quality management
 */

class StanShareAPIClient {
  /**
   * Initialize the API client
   * @param {string} baseURL - Base URL of the backend API (default: http://localhost:8080)
   */
  constructor(baseURL = 'http://localhost:8080') {
    this.baseURL = baseURL;
    this.extractionBatchId = null;
    this.pollingInterval = null;
  }

  /**
   * Check API health status
   * @returns {Promise<Object>} Health status response
   */
  async checkHealth() {
    try {
      const response = await fetch(`${this.baseURL}/health`);
      if (!response.ok) {
        throw new Error(`Health check failed: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Health check error:', error);
      throw error;
    }
  }

  /**
   * Start a new fund extraction from SEC EDGAR
   * @param {number} count - Number of funds to extract (1-1000)
   * @param {string} fundType - SEC form type (default: "40-34F2")
   * @param {string} batchName - Custom batch name
   * @returns {Promise<Object>} Extraction response with batch ID
   */
  async startExtraction(count = 50, fundType = '40-34F2', batchName = null) {
    try {
      const payload = {
        count: Math.min(Math.max(count, 1), 1000), // Validate count between 1-1000
        fund_type: fundType,
      };

      if (batchName) {
        payload.batch_name = batchName;
      }

      const response = await fetch(`${this.baseURL}/api/extract`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || `Extraction failed: ${response.status}`);
      }

      const data = await response.json();
      this.extractionBatchId = data.batch_id;
      return data;
    } catch (error) {
      console.error('Extraction start error:', error);
      throw error;
    }
  }

  /**
   * Get the status of an extraction batch
   * @param {string} batchId - Batch ID to check
   * @returns {Promise<Object>} Extraction status
   */
  async getExtractionStatus(batchId) {
    try {
      const response = await fetch(`${this.baseURL}/api/extraction-status/${batchId}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Batch not found');
        }
        throw new Error(`Status check failed: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Status check error:', error);
      throw error;
    }
  }

  /**
   * Poll extraction status until completion
   * @param {string} batchId - Batch ID to poll
   * @param {Function} onProgress - Callback function for progress updates
   * @param {number} pollInterval - Time between polls in milliseconds (default: 2000)
   * @returns {Promise<Object>} Final status when complete
   */
  async pollExtractionStatus(batchId, onProgress = null, pollInterval = 2000) {
    return new Promise((resolve, reject) => {
      this.pollingInterval = setInterval(async () => {
        try {
          const status = await this.getExtractionStatus(batchId);

          // Call progress callback if provided
          if (onProgress) {
            onProgress(status);
          }

          // Check if extraction is complete
          if (status.status === 'completed' || status.status === 'failed') {
            clearInterval(this.pollingInterval);
            resolve(status);
          }
        } catch (error) {
          clearInterval(this.pollingInterval);
          reject(error);
        }
      }, pollInterval);
    });
  }

  /**
   * Stop polling extraction status
   */
  stopPolling() {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
      this.pollingInterval = null;
    }
  }

  /**
   * Retrieve extracted funds from database
   * @param {number} limit - Number of records (default: 50, max: 500)
   * @param {number} offset - Pagination offset (default: 0)
   * @param {string} fundType - Filter by fund type (optional)
   * @returns {Promise<Object>} Paginated funds list
   */
  async getFunds(limit = 50, offset = 0, fundType = null) {
    try {
      let url = `${this.baseURL}/api/funds?limit=${limit}&offset=${offset}`;
      
      if (fundType) {
        url += `&fund_type=${fundType}`;
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Funds retrieval failed: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Funds retrieval error:', error);
      throw error;
    }
  }

  /**
   * Get data quality annotations
   * @param {string} batchId - Filter by extraction batch (optional)
   * @param {number} limit - Number of records (default: 50)
   * @returns {Promise<Object>} Annotations list
   */
  async getAnnotations(batchId = null, limit = 50) {
    try {
      let url = `${this.baseURL}/api/annotations?limit=${limit}`;

      if (batchId) {
        url += `&batch_id=${batchId}`;
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Annotations retrieval failed: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Annotations retrieval error:', error);
      throw error;
    }
  }

  /**
   * Get quality metrics for a batch
   * @param {string} batchId - Batch ID
   * @returns {Promise<Object>} Quality metrics
   */
  async getQualityMetrics(batchId) {
    try {
      const response = await fetch(`${this.baseURL}/api/quality-metrics/${batchId}`);

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Metrics not found for batch');
        }
        throw new Error(`Metrics retrieval failed: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Metrics retrieval error:', error);
      throw error;
    }
  }

  /**
   * Format a number as currency
   * @param {number} amount - Amount to format
   * @returns {string} Formatted currency string
   */
  static formatCurrency(amount) {
    if (!amount) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }

  /**
   * Format a date string
   * @param {string} dateString - ISO date string
   * @returns {string} Formatted date
   */
  static formatDate(dateString) {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString();
  }

  /**
   * Get status badge color
   * @param {string} status - Status string
   * @returns {string} CSS class for status badge
   */
  static getStatusColor(status) {
    const colors = {
      completed: 'bg-green-500',
      processing: 'bg-blue-500',
      pending: 'bg-yellow-500',
      failed: 'bg-red-500',
    };
    return colors[status] || 'bg-gray-500';
  }

  /**
   * Get quality score color
   * @param {number} score - Quality score (0-100)
   * @returns {string} CSS class for score badge
   */
  static getScoreColor(score) {
    if (score >= 90) return 'bg-green-500';
    if (score >= 70) return 'bg-yellow-500';
    if (score >= 50) return 'bg-orange-500';
    return 'bg-red-500';
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = StanShareAPIClient;
}
