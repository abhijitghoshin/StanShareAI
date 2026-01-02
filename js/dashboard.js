/**
 * Dashboard JavaScript
 * Handles navigation, authentication, and page loading
 */

class DashboardManager {
    constructor() {
        this.currentPage = 'overview';
        this.apiClient = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadUserInfo();
        this.initializeAPIClient();
        this.loadDashboard();
    }

    setupEventListeners() {
        // Navigation items
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target.closest('.nav-item').getAttribute('onclick')) {
                    return; // Let onclick handler take over
                }
            });
        });

        // Close modals on escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
        });
    }

    loadUserInfo() {
        const userName = localStorage.getItem('userName') || 'User';
        const userEmail = localStorage.getItem('userEmail') || 'user@example.com';
        const isGuest = localStorage.getItem('isGuest') === 'true';

        // Update sidebar
        document.getElementById('userName').textContent = isGuest ? 'Guest User' : userName;
        document.getElementById('userEmail').textContent = isGuest ? 'guest@stanshareai.local' : userEmail;

        // Update avatar
        const avatarText = userName.charAt(0).toUpperCase();
        document.getElementById('userAvatar').textContent = avatarText;
        document.getElementById('avatarSmall').textContent = avatarText;
    }

    initializeAPIClient() {
        if (typeof StanShareAPIClient !== 'undefined') {
            const apiUrl = localStorage.getItem('apiUrl') || 'http://localhost:8080';
            this.apiClient = new StanShareAPIClient(apiUrl);
        }
    }

    loadDashboard() {
        this.currentPage = 'overview';
        this.updatePageTitle('Dashboard');
        this.setActiveNavItem('dashboard');

        const contentArea = document.getElementById('contentFrame');
        contentArea.innerHTML = `
            <div class="dashboard-overview">
                <h1>Welcome to StanShareAI Dashboard</h1>
                <p>Manage your SEC EDGAR fund data extraction and quality metrics.</p>
                
                <div class="dashboard-grid">
                    <div class="dashboard-card" onclick="loadPage('extraction.html')">
                        <div class="card-icon">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M12 2v20M2 12h20"></path>
                            </svg>
                        </div>
                        <h3>Extract Funds</h3>
                        <p>Start a new SEC EDGAR fund extraction job with custom parameters.</p>
                        <div class="card-link">Begin Extraction →</div>
                    </div>

                    <div class="dashboard-card" onclick="loadPage('funds.html')">
                        <div class="card-icon">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                            </svg>
                        </div>
                        <h3>Browse Funds</h3>
                        <p>View and filter extracted fund data with advanced pagination.</p>
                        <div class="card-link">View Funds →</div>
                    </div>

                    <div class="dashboard-card" onclick="loadPage('annotations.html')">
                        <div class="card-icon">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                            </svg>
                        </div>
                        <h3>Quality Dashboard</h3>
                        <p>Monitor data quality metrics, issues, and verification status.</p>
                        <div class="card-link">Check Quality →</div>
                    </div>

                    <div class="dashboard-card">
                        <div class="card-icon">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="3" y="3" width="7" height="7"></rect>
                                <rect x="14" y="3" width="7" height="7"></rect>
                                <rect x="14" y="14" width="7" height="7"></rect>
                                <rect x="3" y="14" width="7" height="7"></rect>
                            </svg>
                        </div>
                        <h3>Quick Stats</h3>
                        <p>View recent extraction jobs and overall platform statistics.</p>
                        <div class="card-link">View Stats →</div>
                    </div>
                </div>

                <div class="dashboard-info">
                    <div class="info-box">
                        <h4>🚀 Getting Started</h4>
                        <ul>
                            <li>Navigate to "Extract Funds" to start a new extraction job</li>
                            <li>Use "Browse Funds" to search and filter extracted data</li>
                            <li>Check "Quality Dashboard" to monitor data quality metrics</li>
                        </ul>
                    </div>

                    <div class="info-box">
                        <h4>📊 Recent Activity</h4>
                        <div class="activity-list">
                            <div class="activity-item">
                                <span class="status-badge success">Completed</span>
                                <div>
                                    <div class="activity-title">40-34F2 Extraction</div>
                                    <div class="activity-time">2 hours ago</div>
                                </div>
                            </div>
                            <div class="activity-item">
                                <span class="status-badge warning">Processing</span>
                                <div>
                                    <div class="activity-title">40-F Fund Search</div>
                                    <div class="activity-time">15 minutes ago</div>
                                </div>
                            </div>
                            <div class="activity-item">
                                <span class="status-badge info">Queued</span>
                                <div>
                                    <div class="activity-title">Quality Metrics Update</div>
                                    <div class="activity-time">Just now</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>
                .dashboard-overview h1 {
                    font-size: 28px;
                    font-weight: 600;
                    margin-bottom: 8px;
                    background: linear-gradient(135deg, #06b6d4, #3b82f6);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                .dashboard-overview > p {
                    color: #94a3b8;
                    margin-bottom: 30px;
                    font-size: 15px;
                }

                .dashboard-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: 20px;
                    margin-bottom: 30px;
                }

                .dashboard-card {
                    background: rgba(30, 41, 59, 0.5);
                    border: 1px solid rgba(6, 182, 212, 0.1);
                    border-radius: 12px;
                    padding: 24px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .dashboard-card:hover {
                    border-color: rgba(6, 182, 212, 0.3);
                    background: rgba(30, 41, 59, 0.8);
                    transform: translateY(-4px);
                    box-shadow: 0 10px 30px rgba(6, 182, 212, 0.1);
                }

                .card-icon {
                    width: 48px;
                    height: 48px;
                    background: rgba(6, 182, 212, 0.1);
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 16px;
                    color: #06b6d4;
                }

                .dashboard-card h3 {
                    font-size: 16px;
                    font-weight: 600;
                    margin-bottom: 8px;
                    color: #e0e7ff;
                }

                .dashboard-card p {
                    font-size: 13px;
                    color: #94a3b8;
                    margin-bottom: 12px;
                    line-height: 1.5;
                }

                .card-link {
                    font-size: 13px;
                    color: #06b6d4;
                    font-weight: 600;
                    transition: all 0.3s ease;
                }

                .dashboard-card:hover .card-link {
                    transform: translateX(4px);
                }

                .dashboard-info {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
                    gap: 20px;
                }

                .info-box {
                    background: rgba(30, 41, 59, 0.5);
                    border: 1px solid rgba(6, 182, 212, 0.1);
                    border-radius: 12px;
                    padding: 20px;
                }

                .info-box h4 {
                    font-size: 14px;
                    font-weight: 600;
                    margin-bottom: 12px;
                    color: #e0e7ff;
                }

                .info-box ul {
                    list-style: none;
                    padding: 0;
                }

                .info-box li {
                    font-size: 13px;
                    color: #94a3b8;
                    margin-bottom: 8px;
                    padding-left: 20px;
                    position: relative;
                }

                .info-box li:before {
                    content: '→';
                    position: absolute;
                    left: 0;
                    color: #06b6d4;
                    font-weight: 600;
                }

                .activity-list {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }

                .activity-item {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 12px;
                    background: rgba(6, 182, 212, 0.05);
                    border-radius: 8px;
                }

                .status-badge {
                    font-size: 11px;
                    font-weight: 600;
                    padding: 4px 8px;
                    border-radius: 4px;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    white-space: nowrap;
                }

                .status-badge.success {
                    background: rgba(34, 197, 94, 0.2);
                    color: #86efac;
                }

                .status-badge.warning {
                    background: rgba(251, 146, 60, 0.2);
                    color: #fdba74;
                }

                .status-badge.info {
                    background: rgba(59, 130, 246, 0.2);
                    color: #93c5fd;
                }

                .activity-title {
                    font-size: 13px;
                    font-weight: 600;
                    color: #e0e7ff;
                }

                .activity-time {
                    font-size: 11px;
                    color: #64748b;
                    margin-top: 2px;
                }

                @media (max-width: 768px) {
                    .dashboard-grid {
                        grid-template-columns: 1fr;
                    }

                    .dashboard-info {
                        grid-template-columns: 1fr;
                    }
                }
            </style>
        `;
    }

    updatePageTitle(title) {
        document.getElementById('pageTitle').textContent = title;
    }

    setActiveNavItem(page) {
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });

        const activeItem = document.querySelector(`[onclick*="${page}"]`);
        if (activeItem) {
            activeItem.classList.add('active');
        }
    }

    toggleSidebar() {
        document.querySelector('.sidebar').classList.toggle('active');
    }

    closeAllModals() {
        document.querySelectorAll('.modal.active').forEach(modal => {
            modal.classList.remove('active');
        });
    }

    logout() {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userName');
        localStorage.removeItem('loginProvider');
        localStorage.removeItem('loginTime');
        localStorage.removeItem('isGuest');

        window.location.href = 'login.html';
    }
}

// Global instances
let dashboardManager = null;

// Initialize on load
window.addEventListener('load', () => {
    dashboardManager = new DashboardManager();
});

// Global functions for onclick handlers
function loadDashboard() {
    if (dashboardManager) {
        dashboardManager.loadDashboard();
    }
}

function loadPage(pageName) {
    const contentFrame = document.getElementById('contentFrame');
    
    // Update page title
    const pageTitle = {
        'extraction.html': 'Extract Funds',
        'funds.html': 'Browse Funds',
        'annotations.html': 'Quality Dashboard'
    };
    
    if (dashboardManager) {
        dashboardManager.updatePageTitle(pageTitle[pageName] || 'Dashboard');
    }

    // Load the page
    fetch(pageName)
        .then(response => response.text())
        .then(html => {
            // Extract the body content only
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const bodyContent = doc.body.innerHTML;
            contentFrame.innerHTML = bodyContent;

            // Re-run any scripts
            const scripts = doc.querySelectorAll('script');
            scripts.forEach(script => {
                if (script.src) {
                    const newScript = document.createElement('script');
                    newScript.src = script.src;
                    document.head.appendChild(newScript);
                } else {
                    eval(script.textContent);
                }
            });
        })
        .catch(error => {
            contentFrame.innerHTML = `
                <div style="padding: 20px; color: #ef4444;">
                    <h3>Error loading page</h3>
                    <p>${error.message}</p>
                </div>
            `;
        });
}

function toggleSidebar() {
    if (dashboardManager) {
        dashboardManager.toggleSidebar();
    }
}

function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        if (dashboardManager) {
            dashboardManager.logout();
        }
    }
}

function showSettings() {
    const modal = document.getElementById('settingsModal');
    if (modal) {
        modal.classList.add('active');
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
    }
}

function handleNotifications() {
    alert('No new notifications at this time.');
}

function handleProfile() {
    const userName = localStorage.getItem('userName') || 'User';
    alert(`Logged in as: ${userName}`);
}
