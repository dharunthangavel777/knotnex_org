import React, { useState } from 'react';

export default function SettingsView({ addToast }) {
  const [activeTab, setActiveTab] = useState('general');
  const [orgName, setOrgName] = useState('Knotbox Organization Operations');
  const [adminEmail, setAdminEmail] = useState('ravi@knotnex.org');
  const [supportPhone, setSupportPhone] = useState('+91 98401 99201');
  const [timezone, setTimezone] = useState('Asia/Kolkata (GMT+5:30)');
  const [currency, setCurrency] = useState('INR (₹)');

  const handleSave = (e) => {
    e.preventDefault();
    addToast('Organization settings saved successfully!', 'success');
  };

  return (
    <section className="app-view active" id="viewSettings">
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--neutral-900)' }}>Organization Settings</h2>
        <p style={{ fontSize: 13, color: 'var(--neutral-500)' }}>Configure global system defaults, SSO authentication, payout gateways, and API webhooks</p>
      </div>

      <div style={{ display: 'flex', gap: 8, borderBottom: '1px solid var(--neutral-200)', marginBottom: 20 }}>
        {['general', 'security', 'notifications', 'integrations', 'payouts'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '10px 16px',
              fontSize: 13,
              fontWeight: activeTab === tab ? 600 : 400,
              color: activeTab === tab ? 'var(--knotnex-primary)' : 'var(--neutral-600)',
              borderBottom: activeTab === tab ? '2px solid var(--knotnex-primary)' : '2px solid transparent',
              background: 'transparent',
              borderLeft: 'none', borderRight: 'none', borderTop: 'none',
              cursor: 'pointer',
              textTransform: 'capitalize'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <div style={{ maxWidth: 680, background: '#fff', borderRadius: 20, border: '1px solid var(--neutral-200)', padding: 24 }}>
        {activeTab === 'general' && (
          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="form-group">
              <label className="form-label">Organization Name</label>
              <input
                type="text"
                className="form-input"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div className="form-group">
                <label className="form-label">Primary Admin Email</label>
                <input
                  type="email"
                  className="form-input"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Support Phone Contact</label>
                <input
                  type="text"
                  className="form-input"
                  value={supportPhone}
                  onChange={(e) => setSupportPhone(e.target.value)}
                  required
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div className="form-group">
                <label className="form-label">Default Timezone</label>
                <select className="form-select" value={timezone} onChange={(e) => setTimezone(e.target.value)}>
                  <option value="Asia/Kolkata (GMT+5:30)">Asia/Kolkata (GMT+5:30)</option>
                  <option value="America/New_York (EST)">America/New_York (EST)</option>
                  <option value="Europe/Paris (CET)">Europe/Paris (CET)</option>
                  <option value="UTC">UTC</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Default Ledger Currency</label>
                <select className="form-select" value={currency} onChange={(e) => setCurrency(e.target.value)}>
                  <option value="INR (₹)">INR (₹)</option>
                  <option value="USD ($)">USD ($)</option>
                  <option value="EUR (€)">EUR (€)</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
              <button type="submit" className="btn-primary" style={{ height: 42, padding: '0 24px' }}>
                <span>Save Organization Settings</span>
              </button>
            </div>
          </form>
        )}

        {activeTab === 'security' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <h4 style={{ fontSize: 16, fontWeight: 600 }}>Security &amp; SSO Configuration</h4>
            <div style={{ padding: 14, background: 'var(--neutral-50)', borderRadius: 12, border: '1px solid var(--neutral-200)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 13.5 }}>Enforce Two-Factor Authentication (2FA)</div>
                <div style={{ fontSize: 12, color: 'var(--neutral-500)' }}>Require all admin accounts to use authenticator app TOTP</div>
              </div>
              <input type="checkbox" defaultChecked style={{ width: 18, height: 18, accentColor: '#6336EB' }} />
            </div>
            <div style={{ padding: 14, background: 'var(--neutral-50)', borderRadius: 12, border: '1px solid var(--neutral-200)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 13.5 }}>SAML / Okta SSO Integration</div>
                <div style={{ fontSize: 12, color: 'var(--neutral-500)' }}>Single sign-on for enterprise team members</div>
              </div>
              <button className="btn-secondary" style={{ height: 32, fontSize: 12 }} onClick={() => addToast('SAML SSO Configuration Opened', 'info')}>Configure</button>
            </div>
          </div>
        )}

        {(activeTab === 'notifications' || activeTab === 'integrations' || activeTab === 'payouts') && (
          <div style={{ padding: 20, textAlign: 'center', color: 'var(--neutral-500)', fontSize: 13 }}>
            {activeTab.toUpperCase()} settings are configured and active. Webhooks sync automatically.
          </div>
        )}
      </div>
    </section>
  );
}
