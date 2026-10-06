import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getUserAvatar } from '../data/initialData';

export default function TicketsView() {
  const { tickets, updateTicketStatus, openModal, showToast } = useApp();

  const [tabFilter, setTabFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = tickets.filter(t => {
    if (tabFilter !== 'all') {
      const cat = (t.category || t.issueType || '').toLowerCase();
      if (tabFilter === 'payment' && !cat.includes('payment') && !cat.includes('gateway')) return false;
      if (tabFilter === 'refund' && !cat.includes('refund')) return false;
      if (tabFilter === 'pass' && !cat.includes('pass') && !cat.includes('gate')) return false;
      if (tabFilter === 'inquiry' && !cat.includes('inquiry') && !cat.includes('general')) return false;
    }
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      const userName = typeof t.user === 'object' ? (t.user.name || '') : (t.user || t.attendee || '');
      const match = (t.id || '').toLowerCase().includes(q) ||
        userName.toLowerCase().includes(q) ||
        (t.eventName || '').toLowerCase().includes(q) ||
        (t.desc || t.details || '').toLowerCase().includes(q) ||
        (t.txnId || '').toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  return (
    <section className="app-view active" id="viewTickets">
      <header className="content-header">
        <div className="header-title-group">
          <div className="header-icon-box">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
          </div>
          <div className="header-text-group">
            <h1 className="page-title">Tickets &amp; Issues</h1>
            <p className="page-subtitle">Informational log of attendee-reported issues, booking queries, and refund requests.</p>
          </div>
        </div>
        <div className="header-actions">
          <button
            className="btn-secondary"
            id="btnExportTicketsCsv"
            title="Export tickets audit log as CSV"
            onClick={() => showToast('Exporting support tickets audit log as CSV...', 'info')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span>Export Audit Log</span>
          </button>
        </div>
      </header>

      <div className="sheets-console-card full-screen-width" id="ticketsTableCard">
        <div className="sheets-console-top-bar">
          <div className="sheets-count-cluster">
            <span className="sheets-count-number" id="ticketsActiveCount">{filtered.length}</span>
            <span className="sheets-count-label">Reported Issues</span>
          </div>

          <div className="sheets-status-filter-pills">
            <button
              className={`sheets-filter-pill-btn ${tabFilter === 'all' ? 'active' : ''}`}
              id="tabTicketsAll"
              onClick={() => setTabFilter('all')}
            >
              All Issues ({tickets.length})
            </button>
            <button
              className={`sheets-filter-pill-btn ${tabFilter === 'payment' ? 'active' : ''}`}
              id="tabTicketsPayment"
              onClick={() => setTabFilter('payment')}
            >
              Payment Issues (2)
            </button>
            <button
              className={`sheets-filter-pill-btn ${tabFilter === 'refund' ? 'active' : ''}`}
              id="tabTicketsRefund"
              onClick={() => setTabFilter('refund')}
            >
              Refund Requests (3)
            </button>
            <button
              className={`sheets-filter-pill-btn ${tabFilter === 'pass' ? 'active' : ''}`}
              id="tabTicketsPass"
              onClick={() => setTabFilter('pass')}
            >
              Pass Issues (1)
            </button>
            <button
              className={`sheets-filter-pill-btn ${tabFilter === 'inquiry' ? 'active' : ''}`}
              id="tabTicketsInquiry"
              onClick={() => setTabFilter('inquiry')}
            >
              Inquiries (2)
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
                placeholder="Search ticket ID, user, txn ref, event..."
                id="ticketsSearchInput"
                autoComplete="off"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  type="button"
                  className="search-clear-btn"
                  id="btnClearTicketsSearch"
                  style={{ display: 'inline-flex' }}
                  onClick={() => setSearchTerm('')}
                >
                  &times;
                </button>
              )}
            </div>
            <button
              className="circle-action-btn"
              id="btnRefreshTicketsTable"
              style={{ width: '38px', height: '38px' }}
              title="Refresh tickets &amp; issues"
              onClick={() => showToast('Support ticket inbox synced with Zendesk & gateway!', 'success')}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" /><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
              </svg>
            </button>
          </div>
        </div>

        <div className="table-responsive-wrapper" style={{ overflowX: 'auto' }}>
          <table className="recent-products-table" id="ticketsTable">
            <colgroup>
              <col style={{ width: '44px' }} />
              <col style={{ width: '13%' }} />
              <col style={{ width: '17%' }} />
              <col style={{ width: '15%' }} />
              <col style={{ width: '20%' }} />
              <col style={{ width: '9%' }} />
              <col style={{ width: '11%' }} />
              <col style={{ width: '15%' }} />
            </colgroup>
            <thead>
              <tr>
                <th className="col-center" style={{ width: '44px', color: 'var(--neutral-400)', fontSize: '11px' }}>#</th>
                <th>Ticket &amp; Priority</th>
                <th>Raised By (User)</th>
                <th>Category &amp; Event</th>
                <th>Issue Description &amp; Txn</th>
                <th>Amount</th>
                <th>Status</th>
                <th className="col-right" style={{ paddingRight: '18px' }}>Action</th>
              </tr>
            </thead>
            <tbody id="ticketsTableBody">
              {filtered.map((t, idx) => (
                <tr key={t.id || idx}>
                  <td className="col-center" style={{ color: 'var(--neutral-400)', fontWeight: 600, fontSize: '12px' }}>
                    {(idx + 1).toString().padStart(2, '0')}
                  </td>
                  <td>
                    <div>
                      <span style={{ fontFamily: 'monospace', fontWeight: 600, fontSize: '12px', background: '#F2F4F7', padding: '2px 6px', borderRadius: '4px' }}>
                        {t.id}
                      </span>
                      <div style={{ marginTop: '4px' }}>
                        <span
                          className="status-badge-minimal"
                          style={{
                            background: t.priority === 'High' ? '#FEF3F2' : (t.priority === 'Medium' ? '#FFFBEB' : '#F0FDF4'),
                            color: t.priority === 'High' ? '#D92D20' : (t.priority === 'Medium' ? '#B54708' : '#16A34A'),
                            fontSize: '10.5px',
                            padding: '1px 6px',
                            borderRadius: '9999px',
                            fontWeight: 600
                          }}
                        >
                          {t.priority || 'Normal'}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <img
                        src={getUserAvatar(t, idx)}
                        alt=""
                        style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }}
                      />
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '13px', color: 'var(--text-primary)' }}>
                          {typeof t.user === 'object' ? t.user.name : (t.user || t.attendee || 'Attendee')}
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>
                          {t.time || '10m ago'}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600, fontSize: '12.5px', color: 'var(--text-primary)' }}>
                      {t.category || t.issueType || 'General'}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '2px' }}>
                      {t.eventName || 'Annual Youth Tech Summit 2026'}
                    </div>
                  </td>
                  <td>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.3 }}>
                      {t.desc || t.details || 'Registration pass confirmation email not received'}
                    </div>
                    {t.txnId && (
                      <div style={{ fontFamily: 'monospace', fontSize: '10.5px', color: 'var(--neutral-400)', marginTop: '2px' }}>
                        Ref: {t.txnId}
                      </div>
                    )}
                  </td>
                  <td style={{ fontSize: '12.5px', fontWeight: 600, color: '#111827' }}>
                    {t.amount || '—'}
                  </td>
                  <td>
                    <select
                      className="form-select"
                      style={{ height: '30px', fontSize: '11.5px', padding: '0 8px', borderRadius: '6px' }}
                      value={t.status || 'Open'}
                      onChange={(e) => updateTicketStatus(t.id, e.target.value)}
                    >
                      <option value="Open">Open</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                  </td>
                  <td className="col-right" style={{ paddingRight: '18px' }}>
                    <button
                      className="btn-secondary"
                      style={{ height: '30px', padding: '0 10px', fontSize: '11.5px' }}
                      onClick={() => openModal('modalTicketIssueDetails', t)}
                    >
                      Audit Log
                    </button>
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
