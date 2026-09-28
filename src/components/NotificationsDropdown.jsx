import React, { useState } from 'react';

export default function NotificationsDropdown({ notifications, setNotifications, onClose }) {
  const [notifFilter, setNotifFilter] = useState('all');

  const unreadCount = notifications.filter(n => !n.read).length;

  const filteredNotifs = notifications.filter(n => {
    if (notifFilter === 'all') return true;
    return n.category === notifFilter;
  });

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <div className="notifications-dropdown-panel" id="topNotificationsPanel" style={{ display: 'block' }}>
      <div className="notif-header">
        <div className="notif-header-title-wrap">
          <span className="notif-header-title">Notifications</span>
          <span className="notif-unread-count-badge" id="notifUnreadCountBadge">
            {unreadCount} New
          </span>
        </div>
        <button className="notif-mark-read-btn" onClick={markAllRead}>
          Mark all read
        </button>
      </div>

      <div className="notif-filter-tabs">
        <button
          className={`notif-filter-tab-btn ${notifFilter === 'all' ? 'active' : ''}`}
          onClick={() => setNotifFilter('all')}
        >
          All ({notifications.length})
        </button>
        <button
          className={`notif-filter-tab-btn ${notifFilter === 'txn' ? 'active' : ''}`}
          onClick={() => setNotifFilter('txn')}
        >
          Transactions
        </button>
        <button
          className={`notif-filter-tab-btn ${notifFilter === 'gate' ? 'active' : ''}`}
          onClick={() => setNotifFilter('gate')}
        >
          Gate Check-in
        </button>
      </div>

      <div className="notif-list-body" id="notifListBody">
        {filteredNotifs.length === 0 ? (
          <div style={{ padding: '24px', textAlign: 'center', color: 'var(--neutral-400)', fontSize: '13px' }}>
            No notifications in this filter
          </div>
        ) : (
          filteredNotifs.map(n => (
            <div key={n.id} className={`notif-item ${!n.read ? 'unread' : ''}`}>
              <div className="notif-item-icon">
                <span className="material-symbols-outlined">{n.icon}</span>
              </div>
              <div className="notif-item-content">
                <div className="notif-item-title">{n.title}</div>
                <div className="notif-item-desc">{n.desc}</div>
                <div className="notif-item-time">{n.time}</div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="notif-footer">
        <span style={{ color: 'var(--neutral-500)' }}>Live Gateway Sync</span>
        <a href="javascript:void(0)" onClick={clearAll}>
          Clear all
        </a>
      </div>
    </div>
  );
}
