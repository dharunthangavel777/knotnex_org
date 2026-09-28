import React, { useState } from 'react';

export default function QrGateScannerModal({
  isOpen,
  onClose,
  registrations,
  setRegistrations,
  addToast
}) {
  const [scannedReg, setScannedReg] = useState(registrations[0] || null);
  const [manualCode, setManualCode] = useState('');

  if (!isOpen) return null;

  const handleSimulateScan = () => {
    if (!registrations || registrations.length === 0) return;
    const randomIndex = Math.floor(Math.random() * registrations.length);
    const target = registrations[randomIndex];

    setRegistrations(prev => prev.map(r => {
      if (r.id === target.id) {
        return { ...r, checkedIn: true };
      }
      return r;
    }));

    setScannedReg({ ...target, checkedIn: true });
    addToast(`QR Scanned: Verified Gate Pass for ${target.name} (${target.regId})`, 'success');
  };

  const handleManualValidate = () => {
    if (!manualCode.trim()) return;
    const found = registrations.find(r =>
      r.regId.toLowerCase().includes(manualCode.toLowerCase()) ||
      r.email.toLowerCase().includes(manualCode.toLowerCase()) ||
      r.id.toLowerCase() === manualCode.toLowerCase()
    );

    if (found) {
      setRegistrations(prev => prev.map(r => r.id === found.id ? { ...r, checkedIn: true } : r));
      setScannedReg({ ...found, checkedIn: true });
      addToast(`Pass Validated: ${found.name} (${found.regId})`, 'success');
      setManualCode('');
    } else {
      addToast(`Pass code "${manualCode}" not found in system`, 'error');
    }
  };

  return (
    <div className="modal-backdrop" id="modalQrGateScanner" style={{ display: 'flex' }}>
      <div className="modal-dialog" style={{ maxWidth: 480 }}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6336EB" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
            <h2 className="modal-title">Gate Pass QR Scanner</h2>
          </div>
          <button className="modal-close-btn" onClick={onClose}>&times;</button>
        </div>

        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="qr-scanner-viewfinder">
            <div className="qr-target-box">
              <div className="qr-laser-line"></div>
            </div>
            <div className="qr-scanner-status-text">
              <span className="status-pulse-dot"></span>
              <span>Camera active · Align attendee badge QR</span>
            </div>
          </div>

          {scannedReg && (
            <div className="qr-scanned-preview-card" id="qrScannedPreviewCard">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#12B76A', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 20 }}>check</span>
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, color: '#027A48', fontSize: 14 }}>{scannedReg.name}</div>
                    <div style={{ fontSize: 11.5, color: '#344054' }}>{scannedReg.type} · {scannedReg.regId}</div>
                  </div>
                </div>
                <span className="status-badge active">Checked In</span>
              </div>
            </div>
          )}

          <div style={{ display: 'flex', gap: 8 }}>
            <input
              type="text"
              className="form-input"
              placeholder="Enter attendee email or Pass ID (e.g. reg-1)..."
              value={manualCode}
              onChange={(e) => setManualCode(e.target.value)}
            />
            <button className="btn-secondary" style={{ whiteSpace: 'nowrap' }} onClick={handleManualValidate}>
              Validate
            </button>
          </div>
        </div>

        <div className="modal-footer" style={{ justifyContent: 'space-between' }}>
          <button
            type="button"
            className="btn-secondary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
            onClick={handleSimulateScan}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#6336EB' }}>qr_code_scanner</span>
            <span>Simulate Pass Scan</span>
          </button>
          <button type="button" className="btn-primary" onClick={onClose}>
            <span>Done</span>
          </button>
        </div>
      </div>
    </div>
  );
}
