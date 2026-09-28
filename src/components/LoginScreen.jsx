import React, { useState } from 'react';

export default function LoginScreen({ isOpen, onClose, onLogin, addToast }) {
  const [email, setEmail] = useState('arthur@knotbox.org');
  const [password, setPassword] = useState('••••••••••••');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    onLogin(email);
    addToast('Logged in successfully as Admin', 'success');
    onClose();
  };

  return (
    <div className="login-screen" id="loginScreen" style={{ display: 'flex' }}>
      <div className="login-card">
        <div className="login-logo" style={{ width: 'auto', height: 48, background: 'transparent' }}>
          <img src="assets/logo/logo-knotnex-purple-with-text.svg" onError={(e) => { e.target.onerror=null; e.target.src='assets/logo/knotnex-icon.png'; }} alt="Knotnex Logo" style={{ height: 44, width: 'auto' }} />
        </div>
        <div>
          <h2 className="login-title">Knotbox Organization Admin</h2>
          <p className="login-desc">Sign in with your administrator credentials</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12, textAlign: 'left', width: '100%' }}>
          <div className="form-group">
            <label className="form-label">Admin Email</label>
            <input
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn-primary"
            id="btnPerformLogin"
            style={{ justifyContent: 'center', height: 44, marginTop: 6 }}
          >
            <span>Log In to Admin Dashboard</span>
          </button>
        </form>

        <div style={{ fontSize: 11.5, color: 'var(--neutral-400)' }}>
          Secured with Knotbox Enterprise SSO &amp; Multi-Factor Authentication
        </div>
        <button
          style={{ background: 'none', border: 'none', color: 'var(--neutral-500)', fontSize: 12, cursor: 'pointer', marginTop: 4 }}
          onClick={onClose}
        >
          Cancel / Close
        </button>
      </div>
    </div>
  );
}
