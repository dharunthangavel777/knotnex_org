import React, { useState } from 'react';
import {
  Calendar,
  Users,
  FileText,
  Wrench,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  LogOut,
} from 'lucide-react';
import knotnexLogoPurple from '../assets/logo/logo-knotnex-purple.svg';
import type { SidebarSection } from '../types';

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  activeSection: SidebarSection;
  onSelectSection: (section: SidebarSection) => void;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  collapsed,
  onToggleCollapse,
  activeSection,
  onSelectSection,
  onLogout,
}) => {
  const [platformOpen, setPlatformOpen] = useState(true);

  return (
    <aside className={`sidebar-container ${collapsed ? 'collapsed' : ''}`}>
      {/* 1. Sidebar Brand Header (Logo + knotnex + ORGANIZATION) */}
      <div className="sidebar-header">
        <div className="brand-wrapper" onClick={() => onSelectSection('event-manage')}>
          <div className="brand-logo-container">
            <img
              src={knotnexLogoPurple}
              alt="Knotnex Logo"
              className="brand-logo-svg"
            />
          </div>

          {!collapsed && (
            <div className="brand-text-column">
              <span className="brand-title">knotnex</span>
              <span className="brand-subtitle">ORGANIZATION</span>
            </div>
          )}
        </div>

        {/* Circular Collapse Toggle Button on Border */}
        <button
          className="sidebar-collapse-btn"
          onClick={onToggleCollapse}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <ChevronLeft size={15} className={`collapse-chevron ${collapsed ? 'rotated' : ''}`} />
        </button>
      </div>

      {/* 2. Navigation Menu */}
      <div className="sidebar-menu-scroll">
        {/* Category 1: PLATFORM & EVENTS */}
        <div className="nav-section-block">
          <button
            className={`nav-section-header ${activeSection.startsWith('event') || activeSection === 'career' || activeSection === 'sheem-hub' ? 'active-group' : ''}`}
            onClick={() => {
              if (collapsed) {
                onSelectSection('event-manage');
              } else {
                setPlatformOpen(!platformOpen);
              }
            }}
            title="PLATFORM & EVENTS"
          >
            <div className="nav-header-left">
              <Calendar size={17} className="nav-section-icon" />
              {!collapsed && <span className="nav-section-title">PLATFORM & EVENTS</span>}
            </div>
            {!collapsed && (
              <span className="nav-chevron-icon">
                {platformOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              </span>
            )}
          </button>

          {/* Submenu for Platform & Events */}
          {(!collapsed && platformOpen) && (
            <div className="nav-submenu-group">
              {/* Event Manage */}
              <button
                className={`nav-submenu-item ${activeSection === 'event-manage' ? 'active' : ''}`}
                onClick={() => onSelectSection('event-manage')}
              >
                <span className="submenu-text">Event Manage</span>
                <span className="badge-count-red">1</span>
              </button>

              {/* Career */}
              <button
                className={`nav-submenu-item ${activeSection === 'career' ? 'active' : ''}`}
                onClick={() => onSelectSection('career')}
              >
                <span className="submenu-text">Career</span>
              </button>

              {/* Sheem Hub */}
              <button
                className={`nav-submenu-item ${activeSection === 'sheem-hub' ? 'active' : ''}`}
                onClick={() => onSelectSection('sheem-hub')}
              >
                <span className="submenu-text">Sheem Hub</span>
              </button>
            </div>
          )}
        </div>

        {/* Category 2: ACCOUNT MANAGEMENT */}
        <div className="nav-section-block">
          <button
            className={`nav-section-header single ${activeSection === 'account-management' ? 'active-group' : ''}`}
            onClick={() => onSelectSection('account-management')}
            title="ACCOUNT MANAGEMENT"
          >
            <div className="nav-header-left">
              <Users size={17} className="nav-section-icon" />
              {!collapsed && <span className="nav-section-title">ACCOUNT MANAGEMENT</span>}
            </div>
            {!collapsed && (
              <span className="nav-chevron-icon">
                <ChevronRight size={14} />
              </span>
            )}
          </button>
        </div>

        {/* Category 3: FEED & MODERATION */}
        <div className="nav-section-block">
          <button
            className={`nav-section-header single ${activeSection === 'feed-moderation' ? 'active-group' : ''}`}
            onClick={() => onSelectSection('feed-moderation')}
            title="FEED & MODERATION"
          >
            <div className="nav-header-left">
              <FileText size={17} className="nav-section-icon" />
              {!collapsed && <span className="nav-section-title">FEED & MODERATION</span>}
            </div>
            {!collapsed && (
              <span className="nav-chevron-icon">
                <ChevronRight size={14} />
              </span>
            )}
          </button>
        </div>

        {/* Category 4: DIAGNOSTICS & TICKETS */}
        <div className="nav-section-block">
          <button
            className={`nav-section-header single ${activeSection === 'diagnostics-tickets' ? 'active-group' : ''}`}
            onClick={() => onSelectSection('diagnostics-tickets')}
            title="DIAGNOSTICS & TICKETS"
          >
            <div className="nav-header-left">
              <Wrench size={17} className="nav-section-icon" />
              {!collapsed && <span className="nav-section-title">DIAGNOSTICS & TICKETS</span>}
            </div>
            <div className="nav-header-right-badges">
              <span className="badge-count-red-pill">1</span>
              {!collapsed && (
                <span className="nav-chevron-icon">
                  <ChevronRight size={14} />
                </span>
              )}
            </div>
          </button>
        </div>
      </div>

      {/* 3. Bottom Logout Button */}
      <div className="sidebar-footer">
        <button
          className="logout-action-btn"
          onClick={onLogout}
          title="Logout"
        >
          <LogOut size={16} className="logout-icon" />
          {!collapsed && <span className="logout-label">Logout</span>}
        </button>
      </div>
    </aside>
  );
};
