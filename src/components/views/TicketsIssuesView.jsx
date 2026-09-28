import React, { useState } from 'react';
import { getUserAvatar } from '../../data/mockData';

export default function TicketsIssuesView({
  tickets,
  onOpenModal,
  onSelectTicketDetails
}) {
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = tickets.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase()) ||
                          t.ticketNumber.toLowerCase().includes(search.toLowerCase()) ||
                          t.user.name.toLowerCase().includes(search.toLowerCase()) ||
                          t.event.toLowerCase().includes(search.toLowerCase());
    const matchesPriority = priorityFilter === 'all' || t.priority === priorityFilter;
    const matchesCat = categoryFilter === 'all' || t.category === categoryFilter;
    return matchesSearch && matchesPriority && matchesCat;
  });

  const criticalCount = tickets.filter(t => t.priority === 'critical').length;
  const pendingCount = tickets.filter(t => t.status === 'pending').length;
  const resolvedCount = tickets.filter(t => t.status === 'resolved' || t.status === 'refund_approved').length;

  return (
    <section className="app-view active" id="viewTicketsIssues">
      <div className="view-header-bar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 20 }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--neutral-900)' }}>Tickets &amp; Support Issues</h2>
          <p style={{ fontSize: 13, color: 'var(--neutral-500)' }}>Audit attendee booking issues, refund requests, transaction timeouts, and pass regenerations</p>
        </div>
        <button className="btn-primary" onClick={() => onOpenModal('issueTicket')}>
          <span>+ Issue Ticket / Pass</span>
        </button>
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 20 }}>
        <div style={{ background: '#fff', border: '1px solid var(--neutral-200)', borderRadius: 16, padding: 18 }}>
          <div style={{ fontSize: 12, color: 'var(--neutral-500)' }}>Total Audit Tickets</div>
          <div style={{ fontSize: 26, fontWeight: 700, color: 'var(--neutral-900)' }}>{tickets.length}</div>
        </div>
        <div style={{ background: '#fff', border: '1px solid var(--neutral-200)', borderRadius: 16, padding: 18 }}>
          <div style={{ fontSize: 12, color: 'var(--neutral-500)' }}>Critical Escalations</div>
          <div style={{ fontSize: 26, fontWeight: 700, color: 'var(--error-500)' }}>{criticalCount}</div>
        </div>
        <div style={{ background: '#fff', border: '1px solid var(--neutral-200)', borderRadius: 16, padding: 18 }}>
          <div style={{ fontSize: 12, color: 'var(--neutral-500)' }}>Pending Review</div>
          <div style={{ fontSize: 26, fontWeight: 700, color: 'var(--warning-500)' }}>{pendingCount}</div>
        </div>
        <div style={{ background: '#fff', border: '1px solid var(--neutral-200)', borderRadius: 16, padding: 18 }}>
          <div style={{ fontSize: 12, color: 'var(--neutral-500)' }}>Resolved / Refunded</div>
          <div style={{ fontSize: 26, fontWeight: 700, color: 'var(--success-500)' }}>{resolvedCount}</div>
        </div>
      </div>

      {/* Filter toolbar */}
      <div style={{ background: '#fff', borderRadius: 20, border: '1px solid var(--neutral-200)', padding: 16 }}>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center', marginBottom: 16 }}>
          <input
            type="text"
            className="form-input"
            placeholder="Search by ticket #, user, or issue summary..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ maxWidth: 320 }}
          />
          <div style={{ display: 'flex', gap: 6, background: 'var(--neutral-100)', padding: 3, borderRadius: 8 }}>
            {['all', 'critical', 'high', 'medium', 'low'].map(p => (
              <button
                key={p}
                onClick={() => setPriorityFilter(p)}
                style={{
                  padding: '4px 10px',
                  fontSize: 12,
                  border: 'none',
                  borderRadius: 6,
                  background: priorityFilter === p ? '#fff' : 'transparent',
                  color: priorityFilter === p ? 'var(--neutral-900)' : 'var(--neutral-600)',
                  fontWeight: priorityFilter === p ? 600 : 400,
                  cursor: 'pointer',
                  textTransform: 'capitalize'
                }}
              >
                {p}
              </button>
            ))}
          </div>
          <select
            className="form-select"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            style={{ width: 'auto' }}
          >
            <option value="all">All Categories</option>
            <option value="payment_failed">Payment Failed</option>
            <option value="refund_request">Refund Request</option>
            <option value="double_charge">Double Charged</option>
            <option value="pass_delivery">Pass Delivery</option>
            <option value="general_inquiry">General Inquiry</option>
          </select>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'var(--neutral-50)', borderBottom: '1px solid var(--neutral-200)', color: 'var(--neutral-600)', fontSize: 12, fontWeight: 600 }}>
                <th style={{ padding: '12px 16px' }}>Ticket &amp; Requester</th>
                <th style={{ padding: '12px 16px' }}>Issue Summary</th>
                <th style={{ padding: '12px 16px' }}>Priority</th>
                <th style={{ padding: '12px 16px' }}>Category</th>
                <th style={{ padding: '12px 16px' }}>Status</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Audit</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(t => (
                <tr key={t.id} style={{ borderBottom: '1px solid var(--neutral-100)' }}>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <img src={getUserAvatar(t.user)} alt={t.user.name} style={{ width: 34, height: 34, borderRadius: '50%' }} />
                      <div>
                        <div style={{ fontWeight: 600, color: 'var(--knotnex-primary)', fontFamily: 'var(--font-family-mono)' }}>{t.ticketNumber}</div>
                        <div style={{ fontSize: 12, color: 'var(--neutral-900)', fontWeight: 500 }}>{t.user.name}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px', maxWidth: 280 }}>
                    <div style={{ fontWeight: 600, color: 'var(--neutral-900)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{t.title}</div>
                    <div style={{ fontSize: 11.5, color: 'var(--neutral-500)' }}>{t.event} · {t.createdAt}</div>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <span className={`priority-badge ${t.priority}`}>{t.priority}</span>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ background: 'var(--neutral-100)', color: 'var(--neutral-700)', padding: '3px 8px', borderRadius: 6, fontSize: 11.5 }}>
                      {t.categoryLabel}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <span className={`status-badge ${t.status === 'resolved' || t.status === 'refund_approved' ? 'completed' : t.status === 'updated' ? 'ongoing' : 'pending'}`}>
                      {t.statusLabel}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                    <button
                      className="btn-secondary"
                      style={{ height: 30, fontSize: 12, padding: '0 10px' }}
                      onClick={() => onSelectTicketDetails(t)}
                    >
                      View Details &amp; Audit
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
