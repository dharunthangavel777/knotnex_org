import React, { useState, useRef, useEffect } from 'react';
import NotificationsDropdown from './NotificationsDropdown';

export default function Header({
  activeView,
  onNavigate,
  searchQuery,
  setSearchQuery,
  mobileMenuOpen,
  setMobileMenuOpen,
  notifications,
  setNotifications,
  onToggleLoginScreen,
  onOpenModal
}) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [createDropdownOpen, setCreateDropdownOpen] = useState(false);
  const notifRef = useRef(null);
  const createRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setNotifOpen(false);
      }
      if (createRef.current && !createRef.current.contains(event.target)) {
        setCreateDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getBreadcrumbAndTitle = () => {
    switch (activeView) {
      case 'dashboard':
        return { breadcrumb: 'Overview', title: 'Commerce Command Center' };
      case 'events':
        return { breadcrumb: 'Events & Programs', title: 'Event Operations & Management' };
      case 'eventPasses':
        return { breadcrumb: 'Gate & Passes', title: 'Gate Check-In & Access Passes' };
      case 'tickets':
        return { breadcrumb: 'Support & Tickets', title: 'Attendee Resolutions & Audit' };
      case 'createEvent':
        return { breadcrumb: 'Events / Create', title: 'Publish New Event' };
      case 'careers':
        return { breadcrumb: 'Careers & Team', title: 'Talent Acquisition & Postings' };
      case 'applications':
        return { breadcrumb: 'Careers / Applicants', title: 'Candidate Pipeline & Reviews' };
      case 'schemes':
        return { breadcrumb: 'Grants & Subsidies', title: 'Scheme Programs & Allocations' };
      case 'createScheme':
        return { breadcrumb: 'Schemes / Create', title: 'Launch New Scheme Program' };
      case 'manageSchemes':
        return { breadcrumb: 'Schemes / Submissions', title: 'Scheme Applications & Audit' };
      case 'helpCenter':
        return { breadcrumb: 'Help & Knowledge Base', title: 'Administrator Help Center' };
      case 'settings':
        return { breadcrumb: 'Configuration', title: 'Organization Settings' };
      default:
        return { breadcrumb: 'Overview', title: 'Commerce Command Center' };
    }
  };

  const { breadcrumb, title } = getBreadcrumbAndTitle();
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="knotnex-header" id="appHeader">
      <div className="knotnex-header-left">
        <button
          className="btn-mobile-menu-toggle"
          id="btnMobileMenuToggle"
          title="Toggle Navigation Menu"
          aria-label="Toggle Navigation Menu"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        <div className="knotnex-header-title-cluster">
          <div className="header-top-breadcrumb">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
            <span id="topBreadcrumbText">{breadcrumb}</span>
          </div>
          <h1 className="knotnex-page-heading" id="currentPageTitle">{title}</h1>
        </div>
        <div className="knotnex-search-box">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            placeholder="Search events, jobs, schemes..."
            id="globalTopSearch"
            autoComplete="off"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <kbd className="search-kbd-badge"><span className="kbd-key-symbol">⌘</span>K</kbd>
          {searchQuery && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
              style={{ display: 'inline-flex' }}
            >
              &times;
            </button>
          )}
        </div>
      </div>

      <div className="knotnex-header-right">
        {/* Confidence OS Primary CTA: + Create ⌄ Dropdown */}
        <div style={{ position: 'relative' }} ref={createRef}>
          <button
            className={`btn-top-primary-create ${createDropdownOpen ? 'active' : ''}`}
            id="btnTopHeaderCreate"
            title="Create New Event, Career, or Scheme"
            aria-expanded={createDropdownOpen}
            onClick={() => setCreateDropdownOpen(!createDropdownOpen)}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            <span>Create</span>
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              style={{
                transform: createDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s ease'
              }}
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>

          {createDropdownOpen && (
            <div className="create-dropdown-menu" id="createHeaderDropdown">
              <div
                className="create-dropdown-item"
                onClick={() => {
                  setCreateDropdownOpen(false);
                  onNavigate('createEvent');
                }}
              >
                <div className="create-item-text">
                  <span className="create-item-title">Event</span>
                  <span className="create-item-desc">Publish new event &amp; tickets</span>
                </div>
              </div>

              <div
                className="create-dropdown-item"
                onClick={() => {
                  setCreateDropdownOpen(false);
                  onNavigate('careers', 'all-careers');
                  if (onOpenModal) onOpenModal('createOpportunity');
                }}
              >
                <div className="create-item-text">
                  <span className="create-item-title">Career</span>
                  <span className="create-item-desc">Post new job opportunity</span>
                </div>
              </div>

              <div
                className="create-dropdown-item"
                onClick={() => {
                  setCreateDropdownOpen(false);
                  onNavigate('createScheme');
                }}
              >
                <div className="create-item-text">
                  <span className="create-item-title">Scheme</span>
                  <span className="create-item-desc">Launch new grant program</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Notifications Dropdown */}
        <div style={{ position: 'relative' }} ref={notifRef}>
          <button
            className="circle-action-btn"
            title="Notifications"
            id="btnTopNotifications"
            aria-haspopup="true"
            aria-expanded={notifOpen}
            onClick={() => setNotifOpen(!notifOpen)}
          >
            <span className="material-symbols-outlined notif-material-icon">notifications</span>
            {unreadCount > 0 && <span className="circle-dot-brand" id="topNotifDot"></span>}
          </button>

          {notifOpen && (
            <NotificationsDropdown
              notifications={notifications}
              setNotifications={setNotifications}
              onClose={() => setNotifOpen(false)}
            />
          )}
        </div>

        <div
          className="user-profile-header"
          id="headerUserProfile"
          style={{ cursor: 'pointer' }}
          onClick={onToggleLoginScreen}
        >
          <div className="user-avatar-header-wrap">
            <img src="assets/avatars/avatar-2.jpg" onError={(e) => { e.target.onerror=null; e.target.src='assets/avatar.jpg'; }} alt="Ravi prasanth" className="user-avatar-header" />
            <span className="user-online-dot-header"></span>
          </div>
          <div className="user-info-header">
            <span className="user-name-header">Ravi prasanth</span>
            <span className="user-email-header">ravi@knotnex</span>
          </div>
        </div>
      </div>
    </header>
  );
}
