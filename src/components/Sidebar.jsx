import React, { useState } from 'react';

export default function Sidebar({
  activeView,
  onNavigate,
  sidebarCollapsed,
  setSidebarCollapsed,
  mobileMenuOpen,
  setMobileMenuOpen,
  onOpenModal
}) {
  const [openSubmenus, setOpenSubmenus] = useState({
    events: ['events', 'eventPasses', 'tickets', 'createEvent'].includes(activeView),
    careers: ['careers', 'applications'].includes(activeView),
    schemes: ['schemes', 'createScheme', 'manageSchemes'].includes(activeView)
  });

  const toggleSubmenu = (menuKey) => {
    setOpenSubmenus(prev => ({ ...prev, [menuKey]: !prev[menuKey] }));
  };

  const handleNavClick = (view, defaultSubAction = null, menuKey = null) => {
    if (menuKey) {
      if (!openSubmenus[menuKey]) {
        toggleSubmenu(menuKey);
      }
    }
    if (defaultSubAction) {
      onNavigate(view, defaultSubAction);
    } else {
      onNavigate(view);
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <aside
        className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''} ${mobileMenuOpen ? 'mobile-open' : ''}`}
        id="mainSidebar"
      >
        <div>
          <div className="sidebar-header">
            <div className="brand-top-row">
              <div className="brand-wrapper" onClick={() => handleNavClick('dashboard')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                <img
                  src="assets/logo/logo-knotnex-purple-with-text.png"
                  onError={(e) => { e.target.onerror = null; e.target.src = 'assets/logo/logo-knotnex-purple-with-text.svg'; }}
                  alt="knotnex"
                  className="brand-logo-full"
                  style={{ height: 38, maxWidth: 170, objectFit: 'contain' }}
                />
                <img
                  src="assets/logo/knotnex-icon.png"
                  onError={(e) => { e.target.onerror = null; e.target.src = 'assets/logo/app-icon.png'; }}
                  alt="knotnex"
                  className="brand-logo-icon-collapsed"
                  style={{ width: 36, height: 36, borderRadius: 10, objectFit: 'contain', display: 'none' }}
                />
              </div>
              <button
                className="btn-collapse-sidebar"
                id="btnCollapseSidebar"
                title={sidebarCollapsed ? "Expand Menu" : "Collapse Menu"}
                aria-label={sidebarCollapsed ? "Expand Menu" : "Collapse Menu"}
                onClick={(e) => {
                  e.stopPropagation();
                  setSidebarCollapsed(!sidebarCollapsed);
                }}
              >
                {sidebarCollapsed ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                )}
              </button>
            </div>
          </div>

          <nav className="sidebar-nav">
            <div className="nav-group">
              <span className="nav-group-title">Main menu</span>
              <div
                className={`nav-item ${activeView === 'dashboard' ? 'active' : ''}`}
                onClick={() => handleNavClick('dashboard')}
              >
                <span className="nav-item-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                </span>
                <span className="nav-item-label">Home</span>
              </div>
            </div>

            <div className="nav-group">
              <span className="nav-group-title">Managements</span>

              {/* Events Submenu */}
              <div className={`nav-item-has-submenu ${openSubmenus.events ? 'open' : ''}`}>
                <div
                  className={`nav-item ${['events', 'eventPasses', 'tickets', 'createEvent'].includes(activeView) ? 'active open-submenu' : ''}`}
                  onClick={() => {
                    toggleSubmenu('events');
                    if (activeView !== 'events' && activeView !== 'eventPasses' && activeView !== 'tickets' && activeView !== 'createEvent') {
                      onNavigate('events', 'manage-events');
                    }
                  }}
                >
                  <span className="nav-item-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="3"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                      <path d="M9 16l2 2 4-4"></path>
                    </svg>
                  </span>
                  <span className="nav-item-label">Events</span>
                  <span className="nav-item-arrow" onClick={(e) => { e.stopPropagation(); toggleSubmenu('events'); }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </span>
                </div>
                <div className="nav-submenu-list">
                  <div className={`submenu-link ${activeView === 'events' ? 'active' : ''}`} onClick={() => handleNavClick('events', 'manage-events')}>Manage events</div>
                  <div className={`submenu-link ${activeView === 'eventPasses' ? 'active' : ''}`} onClick={() => handleNavClick('eventPasses', 'event-passes')}>Event Passes</div>
                  <div className={`submenu-link ${activeView === 'tickets' ? 'active' : ''}`} onClick={() => handleNavClick('tickets', 'tickets-issues')}>Tickets &amp; Issues</div>
                  <div className={`submenu-link ${activeView === 'createEvent' ? 'active' : ''}`} onClick={() => handleNavClick('createEvent')}>Create event</div>
                </div>
              </div>

              {/* Careers Submenu */}
              <div className={`nav-item-has-submenu ${openSubmenus.careers ? 'open' : ''}`}>
                <div
                  className={`nav-item ${['careers', 'applications'].includes(activeView) ? 'active open-submenu' : ''}`}
                  onClick={() => {
                    toggleSubmenu('careers');
                    if (activeView !== 'careers' && activeView !== 'applications') {
                      onNavigate('careers', 'all-careers');
                    }
                  }}
                >
                  <span className="nav-item-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                    </svg>
                  </span>
                  <span className="nav-item-label">Careers</span>
                  <span className="nav-item-arrow" onClick={(e) => { e.stopPropagation(); toggleSubmenu('careers'); }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </span>
                </div>
                <div className="nav-submenu-list">
                  <div className={`submenu-link ${activeView === 'careers' ? 'active' : ''}`} onClick={() => handleNavClick('careers', 'all-careers')}>All careers</div>
                  <div className="submenu-link" onClick={() => { onOpenModal('createOpportunity'); setMobileMenuOpen(false); }}>Create opportunity</div>
                  <div className={`submenu-link ${activeView === 'applications' ? 'active' : ''}`} onClick={() => handleNavClick('careers', 'applications')}>Applications</div>
                </div>
              </div>

              {/* Schemes Submenu */}
              <div className={`nav-item-has-submenu ${openSubmenus.schemes ? 'open' : ''}`}>
                <div
                  className={`nav-item ${['schemes', 'createScheme', 'manageSchemes'].includes(activeView) ? 'active open-submenu' : ''}`}
                  onClick={() => {
                    toggleSubmenu('schemes');
                    if (activeView !== 'schemes' && activeView !== 'createScheme' && activeView !== 'manageSchemes') {
                      onNavigate('schemes', 'all-schemes');
                    }
                  }}
                >
                  <span className="nav-item-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
                      <line x1="12" y1="9" x2="12" y2="15"></line>
                      <line x1="9" y1="12" x2="15" y2="12"></line>
                    </svg>
                  </span>
                  <span className="nav-item-label">Schemes</span>
                  <span className="nav-item-arrow" onClick={(e) => { e.stopPropagation(); toggleSubmenu('schemes'); }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </span>
                </div>
                <div className="nav-submenu-list">
                  <div className={`submenu-link ${activeView === 'schemes' ? 'active' : ''}`} onClick={() => handleNavClick('schemes', 'all-schemes')}>All schemes</div>
                  <div className={`submenu-link ${activeView === 'createScheme' ? 'active' : ''}`} onClick={() => handleNavClick('createScheme')}>Create scheme</div>
                  <div className={`submenu-link ${activeView === 'manageSchemes' ? 'active' : ''}`} onClick={() => handleNavClick('schemes', 'manage-schemes')}>Manage schemes</div>
                </div>
              </div>
            </div>

            <div className="nav-group">
              <span className="nav-group-title">Help & Support</span>
              <div
                className={`nav-item ${activeView === 'helpCenter' ? 'active' : ''}`}
                onClick={() => handleNavClick('helpCenter')}
              >
                <span className="nav-item-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                </span>
                <span className="nav-item-label">Help Center</span>
              </div>

              <div
                className={`nav-item ${activeView === 'settings' ? 'active' : ''}`}
                onClick={() => handleNavClick('settings')}
              >
                <span className="nav-item-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="3"></circle>
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                  </svg>
                </span>
                <span className="nav-item-label">Settings</span>
              </div>
            </div>
          </nav>
        </div>

        <div className="sidebar-support-box" id="sidebarSupportBox">
          <div className="support-box-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
              <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
            </svg>
          </div>
          <div className="support-box-title">Need support?</div>
          <div className="support-box-desc">Contact our support team for any technical issue</div>
          <button className="btn-support-expert" onClick={() => handleNavClick('helpCenter')}>
            <span>Call the Expert</span>
          </button>
        </div>
      </aside>

      <div
        className={`sidebar-backdrop ${mobileMenuOpen ? 'active' : ''}`}
        aria-hidden="true"
        onClick={() => setMobileMenuOpen(false)}
      ></div>
    </>
  );
}
