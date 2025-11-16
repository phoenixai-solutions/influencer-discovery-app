// nav-component.js - Reusable Navigation Component for Phoenix Platform

const PhoenixNav = {
  
  // Configuration
  config: {
    brand: 'Influencer Marketing',
    userInitials: 'DC',
    mainPages: [
      { id: 'discovery', label: 'Discover Influencers', url: 'index.html' },
      { id: 'campaigns', label: 'Campaigns', url: 'campaigns.html' },
      { id: 'social-listening', label: 'Social Listening', url: 'social-listening.html' },
      { id: 'share-of-voice', label: 'Share of Voice', url: 'sov-reports.html' }
    ],
    subPages: {
      discovery: [
        { id: 'discovery', label: 'Search', url: 'index.html' },
        { id: 'myinfluencers', label: 'My Influencers', url: 'influencer_list.html' },
      ],
      campaigns: [
        { id: 'overview', label: 'Overview', url: 'campaigns.html' },
        { id: 'create', label: 'Create', url: 'create-campaign.html' },
        { id: 'performance', label: 'Performance', url: 'campaign-performance.html' }
      ]
    }
  },
  
  // Initialize navigation
  init(options = {}) {
    const { currentPage = '', currentSubPage = '' } = options;
    this.render(currentPage, currentSubPage);
  },
  
  // Render navigation HTML
  render(currentPage, currentSubPage) {
    const navHTML = `
      <!-- Main Navigation -->
      <div class="main-nav">
        <div class="main-nav-container">
          <div class="brand">${this.config.brand}</div>
          <div class="nav-links">
            ${this.config.mainPages.map(page => `
              <a href="${page.url}" class="nav-link ${currentPage === page.id ? 'active' : ''}">
                ${page.label}
              </a>
            `).join('')}
          </div>
          <div class="user-badge">${this.config.userInitials}</div>
        </div>
      </div>
      
      ${this.renderSubNav(currentPage, currentSubPage)}
    `;
    
    // Insert into DOM
    const container = document.getElementById('app-navigation');
    if (container) {
      container.innerHTML = navHTML;
    }
  },
  
  // Render sub-navigation if applicable
  renderSubNav(currentPage, currentSubPage) {
    const subPages = this.config.subPages[currentPage];
    
    if (!subPages || subPages.length === 0) {
      return '';
    }
    
    // Get page title
    const mainPage = this.config.mainPages.find(p => p.id === currentPage);
    const pageTitle = mainPage ? mainPage.label : '';
    
    return `
      <!-- Page Title + Sub Navigation -->
      <div class="page-title-section">
        <div class="page-title-container">
          <h1 class="page-title">${pageTitle}</h1>
          <div class="sub-nav">
            ${subPages.map(subPage => `
              <a href="${subPage.url}" class="sub-nav-tab ${currentSubPage === subPage.id ? 'active' : ''}">
                ${subPage.label}
              </a>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  },
  
  // Update configuration (for customization)
  updateConfig(newConfig) {
    this.config = { ...this.config, ...newConfig };
  }
  
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PhoenixNav;
}
