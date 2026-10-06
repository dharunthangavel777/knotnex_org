import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getUserAvatar } from '../data/initialData';

export default function EventPassesView() {
  const {
    registrations,
    openModal,
    setSelectedPass,
    checkInAttendee,
    showToast
  } = useApp();

  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const totalIssued = registrations.length;
  const checkedIn = registrations.filter(r => r.status === 'used').length;
  const pending = registrations.filter(r => r.status === 'valid').length;
  const expired = registrations.filter(r => r.status === 'expired').length;

  const filtered = registrations.filter(r => {
    if (filter === 'valid' && r.status !== 'valid') return false;
    if (filter === 'used' && r.status !== 'used') return false;
    if (filter === 'expired' && r.status !== 'expired') return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      const match = (r.name || r.attendeeName || '').toLowerCase().includes(q) ||
        (r.ticketCode || '').toLowerCase().includes(q) ||
        (r.eventName || '').toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  return (
    <section className="app-view active" id="viewEventPasses">
      <header className="content-header">
        <div className="header-title-group">
          <div className="header-icon-box">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="6" width="20" height="12" rx="2" />
              <path d="M6 12h.01M18 12h.01" />
              <line x1="10" y1="12" x2="14" y2="12" />
            </svg>
          </div>
          <div className="header-text-group">
            <h1 className="page-title">Event Passes</h1>
            <p className="page-subtitle">Issue, validate, and manage attendee entry passes, VIP credentials, and support requests.</p>
          </div>
        </div>
        <div className="header-actions">
          <button
            className="btn-secondary"
            id="btnExportEventPassesCsv"
            onClick={() => showToast('Exporting attendee passes roster as CSV...', 'info')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span>Export CSV</span>
          </button>
          <button
            className="btn-primary"
            id="btnOpenIssueEventPassModal"
            onClick={() => openModal('modalIssueTicket')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            <span>Issue Pass</span>
          </button>
        </div>
      </header>

      {/* KPI Cards */}
      <div className="module-stat-grid">
        <div className="module-stat-card">
          <div className="module-stat-card-top">
            <div className="module-stat-icon-wrap emerald">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="6" width="20" height="12" rx="2" /><path d="M6 12h.01M18 12h.01" /><line x1="10" y1="12" x2="14" y2="12" />
              </svg>
            </div>
            <span className="badge-trend-pos">
              <span>+14%</span>
            </span>
          </div>
          <div className="module-stat-info">
            <span className="module-stat-label">Total Issued</span>
            <div className="module-stat-value-row">
              <span className="module-stat-value">{totalIssued}</span>
              <span className="module-stat-unit">Passes</span>
            </div>
            <div className="module-stat-subtext">All confirmed event passes</div>
          </div>
        </div>

        <div className="module-stat-card">
          <div className="module-stat-card-top">
            <div className="module-stat-icon-wrap green">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <span className="badge-trend-pos">
              <span>{Math.round((checkedIn / (totalIssued || 1)) * 100)}%</span>
            </span>
          </div>
          <div className="module-stat-info">
            <span className="module-stat-label">Checked-In / Validated</span>
            <div className="module-stat-value-row">
              <span className="module-stat-value">{checkedIn}</span>
              <span className="module-stat-unit">Attendees</span>
            </div>
            <div className="module-stat-subtext">Scanned via gate access QR readers</div>
          </div>
        </div>

        <div className="module-stat-card">
          <div className="module-stat-card-top">
            <div className="module-stat-icon-wrap amber">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <span className="badge-trend-pos" style={{ background: 'rgba(247,144,9,0.1)', color: '#B54708' }}>
              <span>Pending</span>
            </span>
          </div>
          <div className="module-stat-info">
            <span className="module-stat-label">Pending Gate Entry</span>
            <div className="module-stat-value-row">
              <span className="module-stat-value">{pending}</span>
              <span className="module-stat-unit">Passes</span>
            </div>
            <div className="module-stat-subtext">Registered but not yet scanned</div>
          </div>
        </div>

        <div className="module-stat-card">
          <div className="module-stat-card-top">
            <div className="module-stat-icon-wrap red">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
              </svg>
            </div>
            <span className="badge-trend-pos" style={{ background: 'rgba(240,68,56,0.1)', color: '#D92D20' }}>
              <span>Alert</span>
            </span>
          </div>
          <div className="module-stat-info">
            <span className="module-stat-label">Expired / Revoked</span>
            <div className="module-stat-value-row">
              <span className="module-stat-value">{expired}</span>
              <span className="module-stat-unit">Passes</span>
            </div>
            <div className="module-stat-subtext">Credentials invalid or cancelled</div>
          </div>
        </div>
      </div>

      {/* Passes Console Card */}
      <div className="sheets-console-card full-screen-width">
        <div className="sheets-console-top-bar">
          <div className="sheets-count-cluster">
            <span className="sheets-count-number">{filtered.length}</span>
            <span className="sheets-count-label">Issued Credentials</span>
          </div>

          <div className="sheets-status-filter-pills">
            <button className={`sheets-filter-pill-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>
              All Passes ({registrations.length})
            </button>
            <button className={`sheets-filter-pill-btn ${filter === 'valid' ? 'active' : ''}`} onClick={() => setFilter('valid')}>
              Valid ({pending})
            </button>
            <button className={`sheets-filter-pill-btn ${filter === 'used' ? 'active' : ''}`} onClick={() => setFilter('used')}>
              Checked-in ({checkedIn})
            </button>
            <button className={`sheets-filter-pill-btn ${filter === 'expired' ? 'active' : ''}`} onClick={() => setFilter('expired')}>
              Expired ({expired})
            </button>
          </div>

          <div className="sheets-console-actions">
            <div className="sheets-search-wrapper">
              <svg className="sheets-search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                className="sheets-search-input-field"
                placeholder="Search pass ID, attendee, email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  type="button"
                  className="search-clear-btn"
                  style={{ display: 'inline-flex' }}
                  onClick={() => setSearchTerm('')}
                >
                  &times;
                </button>
              )}
            </div>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="recent-products-table">
            <colgroup>
              <col style={{ width: '48px' }} />
              <col style={{ width: '22%' }} />
              <col style={{ width: '16%' }} />
              <col style={{ width: '22%' }} />
              <col style={{ width: '14%' }} />
              <col style={{ width: '12%' }} />
              <col style={{ width: '14%' }} />
            </colgroup>
            <thead>
              <tr>
                <th className="col-center" style={{ width: '48px', color: 'var(--neutral-400)', fontSize: '11px' }}>#</th>
                <th>Attendee</th>
                <th>Pass Code</th>
                <th>Event</th>
                <th>Tier</th>
                <th>Status</th>
                <th style={{ textAlign: 'right', paddingRight: '16px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r, idx) => (
                <tr key={r.id || idx}>
                  <td className="col-center" style={{ color: 'var(--neutral-400)', fontWeight: 600, fontSize: '12px' }}>
                    {(idx + 1).toString().padStart(2, '0')}
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <img
                        src={getUserAvatar(r, idx)}
                        alt=""
                        style={{ width: '34px', height: '34px', borderRadius: '50%', objectFit: 'cover' }}
                      />
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '13px', color: 'var(--text-primary)' }}>
                          {r.name || r.attendeeName}
                        </div>
                        <div style={{ fontSize: '11.5px', color: 'var(--text-tertiary)' }}>
                          {r.email || 'attendee@knotnex.org'}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span style={{ fontFamily: 'monospace', fontWeight: 600, fontSize: '12px', background: '#F2F4F7', padding: '3px 7px', borderRadius: '6px' }}>
                      {r.ticketCode || `#KNT-${8400 + idx}`}
                    </span>
                  </td>
                  <td style={{ fontSize: '13px', color: 'var(--text-primary)', fontWeight: 500 }}>
                    {r.eventName || 'Annual Youth Tech Summit 2026'}
                  </td>
                  <td>
                    <span className="status-badge-minimal" style={{ background: '#F4F3FF', color: '#5925DC', fontSize: '11px', padding: '2px 8px', borderRadius: '9999px', fontWeight: 600 }}>
                      {r.tier || 'General Access'}
                    </span>
                  </td>
                  <td>
                    <span
                      className="status-badge"
                      style={{
                        background: r.status === 'used' ? '#ECFDF3' : (r.status === 'valid' ? '#EFF8FF' : '#FEF3F2'),
                        color: r.status === 'used' ? '#12B76A' : (r.status === 'valid' ? '#175CD3' : '#D92D20'),
                        fontSize: '11px',
                        padding: '2px 8px',
                        borderRadius: '9999px'
                      }}
                    >
                      {r.status === 'used' ? '● Checked-in' : (r.status === 'valid' ? '● Active Pass' : '● Expired')}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right', paddingRight: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px' }}>
                      <button
                        className="btn-secondary"
                        style={{ height: '30px', padding: '0 8px', fontSize: '12px' }}
                        onClick={() => openModal('modalViewTicketPass', r)}
                      >
                        View Pass
                      </button>
                      {r.status === 'valid' && (
                        <button
                          className="btn-primary"
                          style={{ height: '30px', padding: '0 8px', fontSize: '11px' }}
                          title="Simulate Turnstile Check-in"
                          onClick={() => checkInAttendee(r.ticketCode || r.id)}
                        >
                          Check-in
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
