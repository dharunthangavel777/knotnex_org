import React from 'react';
import { getUserAvatar } from '../../data/mockData';

export default function TicketDetailsModal({
  isOpen,
  onClose,
  ticket,
  setTickets,
  addToast
}) {
  if (!isOpen || !ticket) return null;

  const handleApproveRefund = () => {
    const newLog = {
      timestamp: new Date().toLocaleString(),
      author: 'Ravi Prasanth (Knotnex Admin)',
      role: 'admin',
      action: 'Refund Approved',
      message: 'Verified ticket issue. Approved full gateway refund payout via Razorpay/Stripe.'
    };

    setTickets(prev => prev.map(t => {
      if (t.id === ticket.id) {
        return {
          ...t,
          status: 'refund_approved',
          statusLabel: 'Refund Approved',
          lastUpdated: new Date().toLocaleString(),
          logs: [...(t.logs || []), newLog]
        };
      }
      return t;
    }));

    addToast(`Refund approved for Ticket ${ticket.ticketNumber}`, 'success');
    onClose();
  };

  const handleRegeneratePass = () => {
    const newLog = {
      timestamp: new Date().toLocaleString(),
      author: 'Ravi Prasanth (Knotnex Admin)',
      role: 'admin',
      action: 'Pass Regenerated',
      message: 'Re-rendered SVG QR payload and sent updated digital pass credential to attendee email.'
    };

    setTickets(prev => prev.map(t => {
      if (t.id === ticket.id) {
        return {
          ...t,
          status: 'updated',
          statusLabel: 'Updated by Knotnex Admin',
          lastUpdated: new Date().toLocaleString(),
          logs: [...(t.logs || []), newLog]
        };
      }
      return t;
    }));

    addToast(`Pass regenerated for Ticket ${ticket.ticketNumber}`, 'success');
    onClose();
  };

  const handleResolveTicket = () => {
    const newLog = {
      timestamp: new Date().toLocaleString(),
      author: 'Ravi Prasanth (Knotnex Admin)',
      role: 'admin',
      action: 'Marked Resolved',
      message: 'Issue closed and confirmed resolved with requester.'
    };

    setTickets(prev => prev.map(t => {
      if (t.id === ticket.id) {
        return {
          ...t,
          status: 'resolved',
          statusLabel: 'Resolved',
          lastUpdated: new Date().toLocaleString(),
          logs: [...(t.logs || []), newLog]
        };
      }
      return t;
    }));

    addToast(`Ticket ${ticket.ticketNumber} marked resolved!`, 'success');
    onClose();
  };

  return (
    <div className="modal-backdrop" id="modalTicketIssueDetails" style={{ display: 'flex' }}>
      <div className="modal-card modal-lg" style={{ maxWdith: 840, width: '90%', background: '#fff', borderRadius: 20, padding: 24 }}>
        <div className="modal-header">
          <div className="modal-title-group" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div className="modal-icon-box" style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(99, 54, 235, 0.08)', color: '#6336EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
              </svg>
            </div>
            <div>
              <h2 className="modal-title">{ticket.ticketNumber} - {ticket.title}</h2>
              <p className="modal-subtitle" style={{ fontSize: 12, color: 'var(--neutral-500)' }}>Attendee: {ticket.user.name} ({ticket.user.email})</p>
            </div>
          </div>
          <button className="modal-close" onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 24, cursor: 'pointer' }}>&times;</button>
        </div>

        <div className="modal-body" style={{ maxHeight: '65vh', overflowY: 'auto', padding: '16px 0', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* User & Txn Card */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, background: 'var(--neutral-50)', padding: 16, borderRadius: 12, border: '1px solid var(--neutral-200)' }}>
            <div>
              <div style={{ fontSize: 11.5, color: 'var(--neutral-500)', fontWeight: 600 }}>REQUESTER PROFILE</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 6 }}>
                <img src={getUserAvatar(ticket.user)} alt={ticket.user.name} style={{ width: 36, height: 36, borderRadius: '50%' }} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13.5 }}>{ticket.user.name}</div>
                  <div style={{ fontSize: 11.5, color: 'var(--neutral-500)' }}>{ticket.user.org}</div>
                </div>
              </div>
            </div>
            <div>
              <div style={{ fontSize: 11.5, color: 'var(--neutral-500)', fontWeight: 600 }}>TRANSACTION &amp; EVENT</div>
              <div style={{ fontSize: 13, fontWeight: 600, marginTop: 6 }}>{ticket.event}</div>
              <div style={{ fontSize: 12, color: 'var(--knotnex-primary)' }}>Ref: {ticket.paymentRef} · Amount: {ticket.amount}</div>
            </div>
          </div>

          {/* Description */}
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--neutral-700)', marginBottom: 4 }}>Reported Issue Description:</div>
            <div style={{ fontSize: 13, color: 'var(--neutral-800)', background: '#fff', border: '1px solid var(--neutral-200)', borderRadius: 10, padding: 12, lineHeight: 1.4 }}>
              {ticket.description}
            </div>
          </div>

          {/* Audit Logs */}
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--neutral-700)', marginBottom: 8 }}>Audit History Log:</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {(ticket.logs || []).map((log, idx) => (
                <div key={idx} style={{ padding: 10, borderRadius: 8, background: log.role === 'admin' ? 'var(--brand-50)' : 'var(--neutral-100)', border: '1px solid var(--neutral-200)', fontSize: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, color: 'var(--neutral-900)', marginBottom: 2 }}>
                    <span>{log.author} - {log.action}</span>
                    <span style={{ fontSize: 11, color: 'var(--neutral-500)' }}>{log.timestamp}</span>
                  </div>
                  <div style={{ color: 'var(--neutral-700)' }}>{log.message}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="modal-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 16, borderTop: '1px solid var(--neutral-200)' }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn-secondary" style={{ fontSize: 12, color: 'var(--error-500)' }} onClick={handleApproveRefund}>
              Approve Refund &amp; Payout
            </button>
            <button className="btn-secondary" style={{ fontSize: 12 }} onClick={handleRegeneratePass}>
              Regenerate Pass QR
            </button>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn-secondary" onClick={onClose}>Close</button>
            <button className="btn-primary" onClick={handleResolveTicket}>Mark Ticket Resolved</button>
          </div>
        </div>
      </div>
    </div>
  );
}
