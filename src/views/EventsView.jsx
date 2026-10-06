import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getEventPoster } from '../data/initialData';

export default function EventsView() {
  const {
    events,
    navigateTo,
    selectEvent,
    showToast
  } = useApp();

  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const parseTicketPrice = (price) => {
    if (typeof price === 'number') return price;
    if (!price) return 550;
    const num = parseInt(String(price).replace(/[^0-9]/g, ''), 10);
    return isNaN(num) ? 550 : num;
  };

  // Compute KPI totals
  const totalRegistered = events.reduce((sum, e) => sum + (Number(e.registered) || 0), 0);
  const totalCapacity = events.reduce((sum, e) => sum + (Number(e.capacity) || 0), 0);
  const totalRevenue = events.reduce((sum, e) => sum + ((Number(e.registered) || 0) * parseTicketPrice(e.ticketPrice)), 0);

  const filteredEvents = events.filter(e => {
    if (filter !== 'all' && e.status !== filter) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      const match = e.name.toLowerCase().includes(q) ||
        (e.location && e.location.toLowerCase().includes(q)) ||
        (e.category && e.category.toLowerCase().includes(q));
      if (!match) return false;
    }
    return true;
  });

  return (
    <section className="app-view active" id="viewEvents">
      <header className="content-header">
        <div className="header-title-group">
          <div className="header-icon-box">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="3" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
              <path d="M9 16l2 2 4-4" />
            </svg>
          </div>
          <div className="header-text-group">
            <h1 className="page-title" id="eventsViewTitle">Events Management</h1>
            <p className="page-subtitle" id="eventsViewSubtitle">Create, monitor, and manage organizational conferences, hackathons, and workshops.</p>
          </div>
        </div>
        <div className="header-actions">
          <button className="btn-primary" id="btnOpenCreateEventModal" onClick={() => navigateTo('createEvent')}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            <span>Create Event</span>
          </button>
        </div>
      </header>

      {/* Module Stat Grid */}
      <div className="module-stat-grid">
        <div className="module-stat-card" id="cardEvTotalReg" title="View attendee registrations">
          <div className="module-stat-card-top">
            <div className="module-stat-icon-wrap emerald">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <span className="badge-trend-pos">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="18 15 12 9 6 15" /></svg>
              <span>+14.8%</span>
            </span>
          </div>
          <div className="module-stat-info">
            <span className="module-stat-label">Total Registrations</span>
            <div className="module-stat-value-row">
              <span className="module-stat-value" id="evMetricTotalRegistrations">{totalRegistered.toLocaleString()}</span>
              <span className="module-stat-unit">Attendees</span>
            </div>
            <div className="module-stat-subtext">Across {events.length} active organizational stages</div>
          </div>
        </div>

        <div className="module-stat-card" id="cardEvTotalRevenue" title="Event ticketing & booking revenue">
          <div className="module-stat-card-top">
            <div className="module-stat-icon-wrap green">
              <span style={{ fontSize: '19px', fontWeight: 700, lineHeight: 1 }}>₹</span>
            </div>
            <span className="badge-trend-pos">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="18 15 12 9 6 15"></polyline></svg>
              <span>+8.6%</span>
            </span>
          </div>
          <div className="module-stat-info">
            <span className="module-stat-label">Total Revenue (INR)</span>
            <div className="module-stat-value-row">
              <span className="module-stat-value" id="evMetricTotalRevenue">₹{totalRevenue.toLocaleString('en-IN')}</span>
            </div>
            <div className="module-stat-subtext">Pass sales, sponsor booths &amp; tickets</div>
          </div>
        </div>

        <div className="module-stat-card" id="cardEvTicketsRaised" title="Attendee support requests and tickets">
          <div className="module-stat-card-top">
            <div className="module-stat-icon-wrap blue">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="6" width="20" height="12" rx="2" />
                <path d="M6 12h.01M18 12h.01" />
                <line x1="10" y1="12" x2="14" y2="12" />
              </svg>
            </div>
            <span className="badge-trend-pos" style={{ background: 'rgba(99, 54, 235, 0.08)', color: '#6336EB' }}>
              <span>24 In Review</span>
            </span>
          </div>
          <div className="module-stat-info">
            <span className="module-stat-label">Tickets Raised by Users</span>
            <div className="module-stat-value-row">
              <span className="module-stat-value" id="evMetricTicketsRaised">142</span>
              <span className="module-stat-unit">Inquiries</span>
            </div>
            <div className="module-stat-subtext">Gate entry queries &amp; VIP seat bookings</div>
          </div>
        </div>

        <div className="module-stat-card" id="cardEvCheckInTurnout" title="Gate attendance rate">
          <div className="module-stat-card-top">
            <div className="module-stat-icon-wrap amber">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <span className="badge-trend-pos">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="18 15 12 9 6 15" /></svg>
              <span>94.2%</span>
            </span>
          </div>
          <div className="module-stat-info">
            <span className="module-stat-label">Avg. Check-In Turnout</span>
            <div className="module-stat-value-row">
              <span className="module-stat-value" id="evMetricCheckInRate">94.2%</span>
              <span className="module-stat-unit">Rate</span>
            </div>
            <div className="module-stat-subtext">Real-time QR pass scanner verified</div>
          </div>
        </div>
      </div>

      {/* Main Events Console Card */}
      <div className="sheets-console-card full-screen-width" id="eventsTableCard">
        <div className="sheets-console-top-bar">
          <div className="sheets-count-cluster">
            <span className="sheets-count-number" id="eventsActiveCount">{filteredEvents.length}</span>
            <span className="sheets-count-label">Managed Events</span>
          </div>

          <div className="sheets-status-filter-pills">
            <button
              className={`sheets-filter-pill-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All Events ({events.length})
            </button>
            <button
              className={`sheets-filter-pill-btn ${filter === 'upcoming' ? 'active' : ''}`}
              onClick={() => setFilter('upcoming')}
            >
              Upcoming ({events.filter(e => e.status === 'upcoming').length})
            </button>
            <button
              className={`sheets-filter-pill-btn ${filter === 'ongoing' ? 'active' : ''}`}
              onClick={() => setFilter('ongoing')}
            >
              Ongoing ({events.filter(e => e.status === 'ongoing').length})
            </button>
            <button
              className={`sheets-filter-pill-btn ${filter === 'completed' ? 'active' : ''}`}
              onClick={() => setFilter('completed')}
            >
              Completed ({events.filter(e => e.status === 'completed').length})
            </button>
          </div>

          <div className="sheets-console-actions">
            <div className="sheets-search-wrapper">
              <svg className="sheets-search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                className="sheets-search-input-field"
                placeholder="Search events by name, location, category..."
                id="eventsSearchInput"
                autoComplete="off"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  type="button"
                  className="search-clear-btn"
                  id="btnClearEventsSearch"
                  aria-label="Clear search"
                  style={{ display: 'inline-flex' }}
                  onClick={() => setSearchTerm('')}
                >
                  &times;
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Events Table */}
        <div style={{ overflowX: 'auto' }} id="eventsTableWrapper">
            <table className="recent-products-table" id="eventsTable">
              <colgroup>
                <col style={{ width: '48px' }} />
                <col style={{ width: '32%' }} />
                <col style={{ width: '13%' }} />
                <col style={{ width: '16%' }} />
                <col style={{ width: '15%' }} />
                <col style={{ width: '12%' }} />
                <col style={{ width: '12%' }} />
              </colgroup>
              <thead>
                <tr>
                  <th className="col-center" style={{ width: '48px', minWidth: '48px', maxWidth: '48px', textAlign: 'center', color: 'var(--neutral-400)', fontSize: '11px', padding: '12px 0' }}>#</th>
                  <th>Event &amp; Venue</th>
                  <th>Category</th>
                  <th>Registrations</th>
                  <th>Date / Schedule</th>
                  <th>Status</th>
                  <th className="col-right">Action</th>
                </tr>
              </thead>
              <tbody id="eventsTableBody">
                {filteredEvents.map((ev, idx) => {
                  const pct = Math.min(100, Math.round(((ev.registered || 0) / (ev.capacity || 1)) * 100));
                  return (
                    <tr key={ev.id} style={{ cursor: 'pointer' }} onClick={() => selectEvent(ev.id)}>
                      <td className="col-center" style={{ textAlign: 'center', color: 'var(--neutral-400)', fontWeight: 600, fontSize: '12px' }}>
                        {(idx + 1).toString().padStart(2, '0')}
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <img
                            src={getEventPoster(ev)}
                            alt=""
                            style={{ width: '44px', height: '44px', borderRadius: '10px', objectFit: 'cover', border: '1px solid #ECECEC' }}
                          />
                          <div>
                            <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '14px' }}>
                              {ev.name}
                            </div>
                            <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginTop: '2px' }}>
                              {ev.location}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="status-badge-minimal" style={{ background: '#EEF4FF', color: '#3538CD', border: 'none', padding: '3px 9px', borderRadius: '9999px', fontSize: '11px', fontWeight: 600 }}>
                          {ev.category}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 500 }}>
                            <span>{ev.registered} / {ev.capacity}</span>
                            <span style={{ color: 'var(--text-tertiary)' }}>{pct}%</span>
                          </div>
                          <div style={{ width: '100%', height: '5px', background: '#F2F4F7', borderRadius: '9999px', overflow: 'hidden' }}>
                            <div style={{ width: `${pct}%`, height: '100%', background: 'var(--knotnex-primary)', borderRadius: '9999px' }} />
                          </div>
                        </div>
                      </td>
                      <td style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>
                        {ev.date}
                      </td>
                      <td>
                        <span
                          className="status-badge"
                          style={{
                            background: ev.status === 'upcoming' ? '#ECFDF3' : (ev.status === 'ongoing' ? '#FFFBEB' : '#F2F4F7'),
                            color: ev.status === 'upcoming' ? '#12B76A' : (ev.status === 'ongoing' ? '#B54708' : '#475467'),
                            fontSize: '11px',
                            padding: '2px 8px',
                            borderRadius: '9999px',
                            textTransform: 'capitalize'
                          }}
                        >
                          ● {ev.status}
                        </span>
                      </td>
                      <td className="col-right" onClick={(e) => e.stopPropagation()}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                          <button
                            className="btn-secondary"
                            style={{ height: '32px', padding: '0 14px', fontSize: '12px', fontWeight: 600 }}
                            onClick={() => selectEvent(ev.id)}
                          >
                            View
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    );
  }
