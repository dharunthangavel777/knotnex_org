import React, { useState } from 'react';

export default function AddAttendeeModal({ isOpen, onClose, setRegistrations, addToast }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+91 98401 23456');
  const [email, setEmail] = useState('');
  const [org, setOrg] = useState('IIT Madras · Research Scholar');
  const [city, setCity] = useState('Bengaluru, KA');
  const [payment, setPayment] = useState('₹550 · Paid (UPI)');
  const [note, setNote] = useState('Verified attendee pass');
  const [immediateCheckIn, setImmediateCheckIn] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      addToast('Please enter attendee name and email', 'error');
      return;
    }

    const regNum = Math.floor(8000 + Math.random() * 1000);
    const newReg = {
      id: 'reg-' + Date.now(),
      regId: `#KNT-${regNum}`,
      txnId: `TXN-${regNum}-MANUAL`,
      name,
      email,
      phone,
      org: org || 'Independent Delegate',
      city,
      payment,
      paymentMethod: 'UPI',
      paymentType: 'paid',
      source: 'Manual Registration',
      event: 'Annual Youth Tech Summit 2026',
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      type: 'Full Delegate',
      status: 'Confirmed',
      checkedIn: immediateCheckIn,
      avatar: `assets/avatars/avatar-${(Math.floor(Math.random() * 12) + 1)}.jpg`
    };

    setRegistrations(prev => [newReg, ...prev]);
    addToast(`Attendee ${name} registered successfully!`, 'success');
    onClose();
  };

  return (
    <div className="modal-backdrop" id="modalAddAttendee" style={{ display: 'flex' }}>
      <div className="modal-dialog" style={{ maxWidth: 500 }}>
        <div className="modal-header">
          <h2 className="modal-title">Register New Attendee</h2>
          <button className="modal-close-btn" onClick={onClose}>&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label">Attendee Full Name</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Rahul Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Phone Number (+91)</label>
                <input
                  type="tel"
                  className="form-input"
                  placeholder="e.g. +91 98401 23456"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="e.g. rahul@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Organization / College</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. IIT Madras · Research Scholar"
                  value={org}
                  onChange={(e) => setOrg(e.target.value)}
                />
              </div>
            </div>
            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label">City / State</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Bengaluru, KA"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Payment &amp; Fee Status</label>
                <select className="form-select" value={payment} onChange={(e) => setPayment(e.target.value)}>
                  <option value="₹550 · Paid (UPI)">₹550 · Paid (UPI / GPay)</option>
                  <option value="₹1,200 · Paid (Card)">₹1,200 · Paid (NetBanking / Card)</option>
                  <option value="Free · Sponsored Scholar">Free · Sponsored Scholar Grant</option>
                </select>
              </div>
            </div>
            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label">Pass Reference / Notes</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Verified attendee pass"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Check-in Status</label>
                <div style={{ display: 'flex', alignItems: 'center', height: 40, gap: 8 }}>
                  <input
                    type="checkbox"
                    id="chkAttendeeImmediateCheckIn"
                    checked={immediateCheckIn}
                    onChange={(e) => setImmediateCheckIn(e.target.checked)}
                    style={{ width: 16, height: 16, accentColor: '#6336EB' }}
                  />
                  <label htmlFor="chkAttendeeImmediateCheckIn" style={{ fontSize: 13, color: 'var(--neutral-700)', cursor: 'pointer' }}>Check In Immediately</label>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary">Register Attendee</button>
          </div>
        </form>
      </div>
    </div>
  );
}
