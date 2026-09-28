import React, { useState } from 'react';
import { getUserAvatar } from '../../data/mockData';

export default function EventPassesView({
  registrations,
  setRegistrations,
  onOpenModal,
  addToast
}) {
  const [search, setSearch] = useState('');

  const filtered = registrations.filter(r => (
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.regId.toLowerCase().includes(search.toLowerCase()) ||
    r.email.toLowerCase().includes(search.toLowerCase())
  ));

  const checkedInCount = registrations.filter(r => r.checkedIn).length;
  const totalCount = registrations.length;
  const rate = totalCount ? Math.round((checkedInCount / totalCount) * 100) : 0;

  const toggleCheckIn = (id) => {
    setRegistrations(prev => prev.map(r => {
      if (r.id === id) {
        const next = !r.checkedIn;
        addToast(`${r.name} gate pass check-in status: ${next ? 'Checked In' : 'Not Checked In'}`, 'info');
        return { ...r, checkedIn: next };
      }
      return r;
    }));
  };

  return (
    <section className="app-view active" id="viewEventPasses">
      <div className="view-header-bar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 20 }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--neutral-900)' }}>Gate Access &amp; Event Passes</h2>
          <p style={{ fontSize: 13, color: 'var(--neutral-500)' }}>Scan attendee QR entry badges, issue instant VIP credentials, and monitor gate throughput</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button className="btn-secondary" onClick={() => onOpenModal('qrScanner')} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#6336EB' }}>qr_code_scanner</span>
            <span>Open Gate Scanner</span>
          </button>
          <button className="btn-primary" onClick={() => onOpenModal('issueTicket')}>
            <span>+ Issue New Pass</span>
          </button>
        </div>
      </div>

      {/* Stats Summary Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 20 }}>
        <div style={{ background: '#fff', border: '1px solid var(--neutral-200)', borderRadius: 16, padding: 18 }}>
          <div style={{ fontSize: 12, color: 'var(--neutral-500)' }}>Total Issued Passes</div>
          <div style={{ fontSize: 26, fontWeight: 700, color: 'var(--neutral-900)' }}>{totalCount}</div>
        </div>
        <div style={{ background: '#fff', border: '1px solid var(--neutral-200)', borderRadius: 16, padding: 18 }}>
          <div style={{ fontSize: 12, color: 'var(--neutral-500)' }}>Gate Check-ins Complete</div>
          <div style={{ fontSize: 26, fontWeight: 700, color: 'var(--success-500)' }}>{checkedInCount}</div>
        </div>
        <div style={{ background: '#fff', border: '1px solid var(--neutral-200)', borderRadius: 16, padding: 18 }}>
          <div style={{ fontSize: 12, color: 'var(--neutral-500)' }}>Entrance Conversion Rate</div>
          <div style={{ fontSize: 26, fontWeight: 700, color: 'var(--knotnex-primary)' }}>{rate}%</div>
        </div>
        <div style={{ background: '#fff', border: '1px solid var(--neutral-200)', borderRadius: 16, padding: 18 }}>
          <div style={{ fontSize: 12, color: 'var(--neutral-500)' }}>Active Gates</div>
          <div style={{ fontSize: 26, fontWeight: 700, color: 'var(--neutral-900)' }}>3 Gates Active</div>
        </div>
      </div>

      {/* Table & Search */}
      <div style={{ background: '#fff', borderRadius: 20, border: '1px solid var(--neutral-200)', padding: 16 }}>
        <div style={{ marginBottom: 16, display: 'flex', gap: 12, alignItems: 'center' }}>
          <input
            type="text"
            className="form-input"
            placeholder="Filter by attendee name, pass ID (#KNT-...), or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ maxWidth: 360 }}
          />
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'var(--neutral-50)', borderBottom: '1px solid var(--neutral-200)', color: 'var(--neutral-600)', fontSize: 12, fontWeight: 600 }}>
                <th style={{ padding: '12px 16px' }}>Attendee</th>
                <th style={{ padding: '12px 16px' }}>Pass Credentials</th>
                <th style={{ padding: '12px 16px' }}>Tier / Event</th>
                <th style={{ padding: '12px 16px' }}>Gate Status</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(r => (
                <tr key={r.id} style={{ borderBottom: '1px solid var(--neutral-100)' }}>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <img src={getUserAvatar(r)} alt={r.name} style={{ width: 34, height: 34, borderRadius: '50%' }} />
                      <div>
                        <div style={{ fontWeight: 600, color: 'var(--neutral-900)' }}>{r.name}</div>
                        <div style={{ fontSize: 11.5, color: 'var(--neutral-500)' }}>{r.email}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ fontWeight: 600, color: 'var(--knotnex-primary)', fontFamily: 'var(--font-family-mono)' }}>{r.regId}</div>
                    <div style={{ fontSize: 11.5, color: 'var(--neutral-500)' }}>Txn: {r.txnId}</div>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ fontWeight: 500 }}>{r.type}</div>
                    <div style={{ fontSize: 11.5, color: 'var(--neutral-500)' }}>{r.event}</div>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <span className={`status-badge ${r.checkedIn ? 'active' : 'pending'}`}>
                      {r.checkedIn ? 'Checked In' : 'Not Checked In'}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                      <button
                        className="btn-secondary"
                        style={{ height: 30, fontSize: 12, padding: '0 10px' }}
                        onClick={() => toggleCheckIn(r.id)}
                      >
                        {r.checkedIn ? 'Check Out' : 'Check In'}
                      </button>
                      <button
                        className="btn-secondary"
                        style={{ height: 30, fontSize: 12, padding: '0 10px' }}
                        onClick={() => addToast(`Pass PDF generated for ${r.name} (${r.regId})`, 'success')}
                      >
                        Download Pass
                      </button>
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
