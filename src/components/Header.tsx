import React, { useState, useRef, useEffect } from 'react';
import {
  Bell,
  Search,
  User,
  Settings,
  LogOut,
  ShieldCheck,
} from 'lucide-react';
import type { NotificationItem } from '../types';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  notifications: NotificationItem[];
  onMarkNotificationsRead: () => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  notifications,
  onMarkNotificationsRead,
  onLogout,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const notifDropdownRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        notifDropdownRef.current &&
        !notifDropdownRef.current.contains(e.target as Node)
      ) {
        setShowNotifications(false);
      }
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(e.target as Node)
      ) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="header-top-container">
      {/* 1. Centered / Main Global Search Bar */}
      <div className="header-search-column">
        <div className="header-search-bar">
          <Search size={16} className="search-lens-icon" />
          <input
            type="text"
            placeholder="Search events, users, tickets, logs..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="search-input-field"
          />
        </div>
      </div>

      {/* 2. Right Controls: Bell + User Profile */}
      <div className="header-controls-right">
        {/* Notification Bell with Purple Badge */}
        <div className="header-dropdown-wrap" ref={notifDropdownRef}>
          <button
            className="btn-bell-notification"
            onClick={() => {
              setShowNotifications(!showNotifications);
              if (!showNotifications) onMarkNotificationsRead();
            }}
            title="Notifications"
          >
            <Bell size={19} className="bell-icon" />
            {unreadCount > 0 && <span className="bell-purple-badge-dot"></span>}
          </button>

          {showNotifications && (
            <div className="dropdown-panel notifications-panel animate-scale-in">
              <div className="panel-header-row">
                <span className="panel-title">Notifications</span>
                <span className="panel-sub-badge">{notifications.length} alerts</span>
              </div>
              <div className="notification-items-list">
                {notifications.map((item) => (
                  <div key={item.id} className={`notification-row ${item.read ? 'read' : 'unread'}`}>
                    <div className="notif-indicator-circle"></div>
                    <div className="notif-text-wrap">
                      <div className="notif-title-line">{item.title}</div>
                      <div className="notif-desc-line">{item.description}</div>
                      <div className="notif-time-line">{item.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Pill: Yellow Avatar Circle + Name + Subtitle */}
        <div className="header-dropdown-wrap" ref={profileDropdownRef}>
          <div
            className="user-profile-widget"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <div className="user-avatar-yellow-circle">
              <span className="avatar-letter">R</span>
            </div>
            <div className="user-text-column">
              <div className="user-full-name">Ravi prasanth</div>
              <div className="user-email-handle">ravi@knotnex</div>
            </div>
          </div>

          {showProfileMenu && (
            <div className="dropdown-panel profile-panel animate-scale-in">
              <div className="profile-panel-header">
                <div className="user-avatar-yellow-circle large">
                  <span className="avatar-letter">R</span>
                </div>
                <div>
                  <div className="user-full-name">Ravi prasanth</div>
                  <div className="user-role-tag">Super Administrator</div>
                </div>
              </div>
              <div className="panel-divider"></div>
              <button className="panel-item-btn">
                <User size={15} />
                <span>Admin Profile</span>
              </button>
              <button className="panel-item-btn">
                <ShieldCheck size={15} />
                <span>Security & Permissions</span>
              </button>
              <button className="panel-item-btn">
                <Settings size={15} />
                <span>Workspace Settings</span>
              </button>
              <div className="panel-divider"></div>
              <button className="panel-item-btn text-danger" onClick={onLogout}>
                <LogOut size={15} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
