import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import SearchBar from '../common/SearchBar';

export default function Header() {
  const {
    navigateTo,
    searchQuery,
    setSearchQuery,
    topNotifications,
    activeNotifFilter,
    setActiveNotifFilter,
    isNotifOpen,
    setIsNotifOpen,
    markAllNotifsRead,
    clearAllNotifs,
    isMobileSidebarOpen,
    setIsMobileSidebarOpen
  } = useApp();

  const [createDropdownOpen, setCreateDropdownOpen] = useState(false);
  const notifRef = useRef(null);
  const createRef = useRef(null);

  // Close menus on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setIsNotifOpen(false);
      }
      if (createRef.current && !createRef.current.contains(e.target)) {
        setCreateDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setIsNotifOpen]);

  const unreadCount = topNotifications.filter(n => n.unread).length;

  const filteredNotifications = topNotifications.filter(n => {
    if (activeNotifFilter === 'all') return true;
    return n.type === activeNotifFilter;
  });

  return (
    <header className="appbar-header" id="appHeader">
      {/* Mobile Drawer Trigger (Mobile Only) */}
      <button
        className="appbar-mobile-menu-btn"
        id="btnMobileMenuToggle"
        title="Toggle Menu"
        aria-label="Toggle Navigation Menu"
        onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      {/* Center: Reusable Search Bar */}
      <div className="appbar-center-search">
        <SearchBar
          id="globalTopSearch"
          placeholder="Search events, jobs, schemes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          width="420px"
        />
      </div>

      {/* Right: Actions Cluster matching screenshot */}
      <div className="appbar-right-actions">
        {/* + Create ⌄ Button */}
        <div className="appbar-dropdown-anchor" ref={createRef}>
          <button
            className="appbar-create-btn"
            id="btnTopHeaderCreate"
            title="Create New"
            onClick={() => setCreateDropdownOpen(!createDropdownOpen)}
          >
            <span style={{ fontSize: '15px', fontWeight: 500, marginRight: '2px' }}>+</span>
            <span>Create</span>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginLeft: '4px' }}>
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {createDropdownOpen && (
            <div className="appbar-create-menu-dropdown">
              <button
                className="appbar-menu-row"
                onClick={() => {
                  setCreateDropdownOpen(false);
                  navigateTo('createEvent');
                }}
              >
                <span className="material-symbols-outlined menu-icon-purple">event</span>
                <span>New Event</span>
              </button>
              <button
                className="appbar-menu-row"
                onClick={() => {
                  setCreateDropdownOpen(false);
                  navigateTo('createOpportunity');
                }}
              >
                <span className="material-symbols-outlined menu-icon-purple">work</span>
                <span>New Opportunity</span>
              </button>
              <button
                className="appbar-menu-row"
                onClick={() => {
                  setCreateDropdownOpen(false);
                  navigateTo('createScheme');
                }}
              >
                <span className="material-symbols-outlined menu-icon-purple">account_balance</span>
                <span>New Grant Scheme</span>
              </button>
            </div>
          )}
        </div>

        {/* Circular Notification Bell Button */}
        <div className="appbar-dropdown-anchor" id="topNotificationsWrapper" ref={notifRef}>
          <button
            className="appbar-circle-bell-btn"
            title="Notifications"
            id="btnTopNotifications"
            aria-haspopup="true"
            aria-expanded={isNotifOpen}
            onClick={() => setIsNotifOpen(!isNotifOpen)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            {unreadCount > 0 && <span className="appbar-bell-dot" id="topNotifDot" />}
          </button>

          {isNotifOpen && (
            <div className="notifications-dropdown-panel" id="topNotificationsPanel" style={{ display: 'flex' }}>
              <div className="notif-header">
                <div className="notif-header-title-wrap">
                  <span className="notif-header-title">Notifications</span>
                  <span className="notif-unread-count-badge" id="notifUnreadCountBadge">
                    {unreadCount > 0 ? `${unreadCount} New` : '0 New'}
                  </span>
                </div>
                <button className="notif-mark-read-btn" id="btnMarkAllNotifsRead" onClick={markAllNotifsRead}>
                  Mark all read
                </button>
              </div>

              <div className="notif-filter-tabs">
                <button
                  className={`notif-filter-tab-btn ${activeNotifFilter === 'all' ? 'active' : ''}`}
                  onClick={() => setActiveNotifFilter('all')}
                >
                  All ({topNotifications.length})
                </button>
                <button
                  className={`notif-filter-tab-btn ${activeNotifFilter === 'txn' ? 'active' : ''}`}
                  onClick={() => setActiveNotifFilter('txn')}
                >
                  Transactions
                </button>
                <button
                  className={`notif-filter-tab-btn ${activeNotifFilter === 'gate' ? 'active' : ''}`}
                  onClick={() => setActiveNotifFilter('gate')}
                >
                  Gate Check-in
                </button>
              </div>

              <div className="notif-list-body" id="notifListBody">
                {filteredNotifications.length === 0 ? (
                  <div style={{ padding: '24px', textAlign: 'center', color: '#6B7280', fontSize: '13px' }}>
                    No notifications
                  </div>
                ) : (
                  filteredNotifications.map(n => (
                    <div key={n.id} className={`notif-item ${n.unread ? 'unread' : ''}`}>
                      <div className="notif-item-icon">
                        <span className="material-symbols-outlined" style={{ fontSize: '18px', color: n.type === 'txn' ? '#12B76A' : '#6336EB' }}>
                          {n.type === 'txn' ? 'payments' : 'qr_code_scanner'}
                        </span>
                      </div>
                      <div className="notif-item-content">
                        <div className="notif-item-title">{n.title}</div>
                        <div className="notif-item-msg">{n.msg}</div>
                        <div className="notif-item-time">{n.time}</div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="notif-footer">
                <span style={{ color: '#6B7280' }}>Live Gateway Sync</span>
                <a href="#clear" onClick={(e) => { e.preventDefault(); clearAllNotifs(); }} id="btnClearAllNotifs">
                  Clear all
                </a>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Badge: Purple circle avatar with "R", Name, Email & Chevron */}
        <div
          className="appbar-profile-badge"
          id="headerUserProfile"
          onClick={() => navigateTo('orgProfile')}
          title="Organization Profile"
        >
          <div className="appbar-avatar-circle">
            R
          </div>
          <div className="appbar-profile-details">
            <span className="appbar-profile-name">Ravi prasanth</span>
            <span className="appbar-profile-email">ravi@knotnex</span>
          </div>
          <svg className="appbar-profile-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>
    </header>
  );
}
