import React, { useState } from 'react';

export default function IssueTicketModal({ isOpen, onClose, setRegistrations, addToast }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [tier, setTier] = useState('VIP Delegate Pass');
  const [event, setEvent] = useState('Annual Youth Tech Summit 2026');
  const [priority, setPriority] = useState('Gate A (VIP & Keynote)');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      addToast('Please enter attendee name and email', 'error');
      return;
    }

    const regNum = Math.floor(1000 + Math.random() * 9000);
    const newReg = {
      id: 'reg-' + Date.now(),
      regId: `#KNT-${regNum}`,
      txnId: `TXN-${regNum}-ADMIN`,
      name,
      email,
      phone: '+91 98401 00000',
      org: notes || 'Admin Direct Issue',
      city: 'Bengaluru, KA',
      payment: 'Free · Issued by Admin',
      paymentMethod: 'Admin Override',
      paymentType: 'paid',
      source: 'Admin Direct',
      event,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      type: tier,
      status: 'Confirmed',
      checkedIn: false,
      avatar: `assets/avatars/avatar-${(Math.floor(Math.random() * 12) + 1)}.jpg`
    };

    setRegistrations(prev => [newReg, ...prev]);
    addToast(`Pass ${newReg.regId} issued successfully for ${name}!`, 'success');
    onClose();
  };

  return (
    <div className="modal-backdrop" id="modalIssueTicket" style={{ display: 'flex' }}>
      <div className="modal-dialog">
        <div className="modal-header">
          <h2 className="modal-title">Issue New Ticket / Pass</h2>
          <button className="modal-close-btn" onClick={onClose}>&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">Attendee / Requester Full Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Dr. Maya Angelou"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="e.g. maya@institution.org"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Pass Tier / Type</label>
                <select className="form-select" value={tier} onChange={(e) => setTier(e.target.value)}>
                  <option value="VIP Delegate Pass">VIP Delegate Pass</option>
                  <option value="Speaker & Keynote Pass">Speaker & Keynote Pass</option>
                  <option value="General Admission Pass">General Admission Pass</option>
                  <option value="Organizer Access Badge">Organizer Access Badge</option>
                  <option value="Press & Media Pass">Press & Media Pass</option>
                </select>
              </div>
            </div>
            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label">Associated Event</label>
                <select className="form-select" value={event} onChange={(e) => setEvent(e.target.value)}>
                  <option value="Annual Youth Tech Summit 2026">Annual Youth Tech Summit 2026</option>
                  <option value="Climate Action Hackathon">Climate Action Hackathon</option>
                  <option value="Global Entrepreneurship Forum">Global Entrepreneurship Forum</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Gate / Priority</label>
                <select className="form-select" value={priority} onChange={(e) => setPriority(e.target.value)}>
                  <option value="Gate A (VIP & Keynote)">Gate A (VIP & Keynote)</option>
                  <option value="Gate B (Main Concourse)">Gate B (Main Concourse)</option>
                  <option value="Gate C (Press & Crew)">Gate C (Press & Crew)</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Special Notes / Credentials</label>
              <textarea
                className="form-textarea"
                placeholder="Reserved front-row seating, dietary requirements, backstage credentials..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              ></textarea>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary">Issue &amp; Generate QR</button>
          </div>
        </form>
      </div>
    </div>
  );
}
