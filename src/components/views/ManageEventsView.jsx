import React, { useState } from 'react';
import { getEventPoster, getUserAvatar } from '../../data/mockData';

export default function ManageEventsView({
  events,
  setEvents,
  registrations,
  setRegistrations,
  onNavigate,
  onOpenModal,
  onEditEvent,
  addToast,
  defaultSubAction
}) {
  const [viewMode, setViewMode] = useState(defaultSubAction === 'registrations' ? 'registrations' : 'events');
  const [searchFilter, setSearchFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredEvents = events.filter(ev => {
    const matchesSearch = ev.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
                          ev.location.toLowerCase().includes(searchFilter.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || ev.category.toLowerCase() === categoryFilter.toLowerCase();
    const matchesStatus = statusFilter === 'all' || ev.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const filteredRegistrations = registrations.filter(r => {
    return r.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
           r.email.toLowerCase().includes(searchFilter.toLowerCase()) ||
           r.regId.toLowerCase().includes(searchFilter.toLowerCase()) ||
           r.event.toLowerCase().includes(searchFilter.toLowerCase());
  });

  const handleDeleteEvent = (id, name) => {
    if (window.confirm(`Are you sure you want to delete event "${name}"?`)) {
      setEvents(prev => prev.filter(e => e.id !== id));
      addToast(`Event "${name}" deleted successfully`, 'success');
    }
  };

  const toggleCheckIn = (id) => {
    setRegistrations(prev => prev.map(r => {
      if (r.id === id) {
        const nextState = !r.checkedIn;
        addToast(`${r.name} check-in status updated to ${nextState ? 'Checked In' : 'Not Checked In'}`, 'info');
        return { ...r, checkedIn: nextState };
      }
      return r;
    }));
  };

  return (
    <section className="app-view active" id="viewManageEvents">
      <div className="view-header-bar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 20 }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--neutral-900)' }}>Manage Events &amp; Attendees</h2>
          <p style={{ fontSize: 13, color: 'var(--neutral-500)' }}>Configure conferences, track registrations, and handle attendee check-ins</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            className="btn-secondary"
            id="txtToggleRegistrations"
            onClick={() => setViewMode(viewMode === 'events' ? 'registrations' : 'events')}
          >
            {viewMode === 'events' ? 'View Registrations' : 'View Events Grid'}
          </button>
          <button className="btn-primary" onClick={() => onNavigate('createEvent')}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            <span>+ Create Event</span>
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 20, background: '#fff', padding: 14, borderRadius: 16, border: '1px solid var(--neutral-200)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', flex: 1 }}>
          <div style={{ position: 'relative', minWidth: 240 }}>
            <input
              type="text"
              className="form-input"
              placeholder="Search by name, location, or pass ID..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              style={{ paddingLeft: 34, height: 38 }}
            />
            <span className="material-symbols-outlined" style={{ position: 'absolute', left: 10, top: 10, fontSize: 18, color: 'var(--neutral-400)' }}>search</span>
          </div>

          {viewMode === 'events' && (
            <>
              <select
                className="form-select"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                style={{ width: 'auto', height: 38 }}
              >
                <option value="all">All Categories</option>
                <option value="Technology">Technology</option>
                <option value="Environment">Environment</option>
                <option value="Community">Community</option>
                <option value="Healthcare">Healthcare</option>
              </select>

              <div style={{ display: 'flex', background: 'var(--neutral-100)', padding: 3, borderRadius: 8 }}>
                {['all', 'upcoming', 'ongoing', 'completed'].map(st => (
                  <button
                    key={st}
                    className={`btn-filter-pill ${statusFilter === st ? 'active' : ''}`}
                    onClick={() => setStatusFilter(st)}
                    style={{
                      padding: '4px 10px',
                      fontSize: 12,
                      border: 'none',
                      borderRadius: 6,
                      background: statusFilter === st ? '#fff' : 'transparent',
                      color: statusFilter === st ? 'var(--neutral-900)' : 'var(--neutral-600)',
                      fontWeight: statusFilter === st ? 600 : 400,
                      cursor: 'pointer',
                      textTransform: 'capitalize'
                    }}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {viewMode === 'registrations' && (
          <button className="btn-primary" onClick={() => onOpenModal('addAttendee')} style={{ height: 38 }}>
            <span>+ Register Attendee</span>
          </button>
        )}
      </div>

      {/* Events View Grid */}
      {viewMode === 'events' ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }} id="eventsTableWrapper">
          {filteredEvents.map(ev => {
            const fillPct = Math.min(100, Math.round(((ev.registered || 0) / (ev.capacity || 1)) * 100));
            return (
              <div key={ev.id} style={{ background: '#fff', borderRadius: 20, border: '1px solid var(--neutral-200)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ position: 'relative', height: 160, background: '#f3f4f6' }}>
                  <img src={getEventPoster(ev)} alt={ev.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <span className={`status-badge ${ev.status}`} style={{ position: 'absolute', top: 12, right: 12, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                    {ev.status}
                  </span>
                  <span style={{ position: 'absolute', bottom: 12, left: 12, background: 'rgba(0,0,0,0.65)', color: '#fff', padding: '3px 8px', borderRadius: 6, fontSize: 11.5, backdropFilter: 'blur(4px)' }}>
                    {ev.category}
                  </span>
                </div>

                <div style={{ padding: 18, flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--neutral-900)', lineHeight: 1.3 }}>{ev.name}</h3>
                  <p style={{ fontSize: 12.5, color: 'var(--neutral-600)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {ev.description}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 12, color: 'var(--neutral-500)', marginTop: 'auto' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span className="material-symbols-outlined" style={{ fontSize: 16, color: 'var(--knotnex-primary)' }}>calendar_today</span>
                      <span>{ev.date}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span className="material-symbols-outlined" style={{ fontSize: 16, color: 'var(--knotnex-primary)' }}>location_on</span>
                      <span>{ev.location}</span>
                    </div>
                  </div>

                  {/* Seat Occupancy Bar */}
                  <div style={{ marginTop: 8 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11.5, fontWeight: 600, color: 'var(--neutral-700)', marginBottom: 4 }}>
                      <span>Seats Registered</span>
                      <span>{ev.registered} / {ev.capacity} ({fillPct}%)</span>
                    </div>
                    <div style={{ height: 6, borderRadius: 3, background: 'var(--neutral-100)', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${fillPct}%`, background: fillPct >= 90 ? 'var(--warning-500)' : 'var(--knotnex-primary)', borderRadius: 3 }}></div>
                    </div>
                  </div>

                  {/* Footer Actions */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 12, borderTop: '1px solid var(--neutral-100)', marginTop: 8 }}>
                    <button className="btn-secondary" style={{ height: 32, fontSize: 12 }} onClick={() => onEditEvent(ev)}>
                      Edit Details
                    </button>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button
                        className="btn-secondary"
                        style={{ height: 32, fontSize: 12, color: 'var(--error-500)' }}
                        onClick={() => handleDeleteEvent(ev.id, ev.name)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Registrations Table View */
        <div style={{ background: '#fff', borderRadius: 20, border: '1px solid var(--neutral-200)', overflow: 'hidden' }} id="eventsRegistrationsWrapper">
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 13 }}>
              <thead>
                <tr style={{ background: 'var(--neutral-50)', borderBottom: '1px solid var(--neutral-200)', color: 'var(--neutral-600)', fontSize: 12, fontWeight: 600 }}>
                  <th style={{ padding: '14px 18px' }}>Attendee</th>
                  <th style={{ padding: '14px 18px' }}>Reg ID &amp; Event</th>
                  <th style={{ padding: '14px 18px' }}>Payment / Tier</th>
                  <th style={{ padding: '14px 18px' }}>Check-In Status</th>
                  <th style={{ padding: '14px 18px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRegistrations.map(r => (
                  <tr key={r.id} style={{ borderBottom: '1px solid var(--neutral-100)' }}>
                    <td style={{ padding: '14px 18px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <img src={getUserAvatar(r)} alt={r.name} style={{ width: 36, height: 36, borderRadius: '50%' }} />
                        <div>
                          <div style={{ fontWeight: 600, color: 'var(--neutral-900)' }}>{r.name}</div>
                          <div style={{ fontSize: 11.5, color: 'var(--neutral-500)' }}>{r.email} · {r.phone}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '14px 18px' }}>
                      <div style={{ fontWeight: 600, color: 'var(--knotnex-primary)' }}>{r.regId}</div>
                      <div style={{ fontSize: 12, color: 'var(--neutral-600)' }}>{r.event}</div>
                    </td>
                    <td style={{ padding: '14px 18px' }}>
                      <div style={{ fontWeight: 500, color: 'var(--neutral-800)' }}>{r.payment}</div>
                      <div style={{ fontSize: 11.5, color: 'var(--neutral-500)' }}>{r.type}</div>
                    </td>
                    <td style={{ padding: '14px 18px' }}>
                      <span className={`status-badge ${r.checkedIn ? 'active' : 'pending'}`}>
                        {r.checkedIn ? 'Checked In' : 'Not Checked In'}
                      </span>
                    </td>
                    <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                      <button
                        className="btn-secondary"
                        style={{ height: 30, fontSize: 12, padding: '0 10px' }}
                        onClick={() => toggleCheckIn(r.id)}
                      >
                        {r.checkedIn ? 'Mark Out' : 'Check In'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
}
