import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SettingsSectionSkeleton } from '../components/skeletons';

export default function SettingsView() {
  const { showToast } = useApp();
  const [activeSection, setActiveSection] = useState('account');
  const [isTabLoading, setIsTabLoading] = useState(false);

  const handleSectionChange = (sectionKey) => {
    if (sectionKey === activeSection) return;
    setIsTabLoading(true);
    setActiveSection(sectionKey);
    setTimeout(() => {
      setIsTabLoading(false);
    }, 260);
  };

  // Toggle states
  const [settingsToggles, setSettingsToggles] = useState({
    notifEvents: true,
    notifTickets: true,
    notifDigest: false,
    twoFactor: true,
    publicProfile: true,
    darkMode: false
  });

  const toggle = (key) => {
    setSettingsToggles(prev => {
      const next = !prev[key];
      showToast(`Preference updated.`, 'info');
      return { ...prev, [key]: next };
    });
  };

  return (
    <section className="app-view active" id="viewSettings">
      <header className="content-header">
        <div className="header-title-group">
          <div className="header-icon-box">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          </div>
          <div className="header-text-group">
            <h1 className="page-title">Settings</h1>
            <p className="page-subtitle">Manage your account, notifications, privacy, and organization preferences.</p>
          </div>
        </div>
      </header>

      <div className="settings-layout">
        {/* Settings Navigation */}
        <div className="settings-nav">
          <button
            className={`settings-nav-item ${activeSection === 'account' ? 'active' : ''}`}
            onClick={() => handleSectionChange('account')}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
            <span>Account</span>
          </button>
          <button
            className={`settings-nav-item ${activeSection === 'notifications' ? 'active' : ''}`}
            onClick={() => handleSectionChange('notifications')}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
            <span>Notifications</span>
          </button>
          <button
            className={`settings-nav-item ${activeSection === 'privacy' ? 'active' : ''}`}
            onClick={() => handleSectionChange('privacy')}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
            <span>Privacy &amp; Security</span>
          </button>
          <button
            className={`settings-nav-item ${activeSection === 'appearance' ? 'active' : ''}`}
            onClick={() => handleSectionChange('appearance')}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>
            <span>Appearance</span>
          </button>
          <button
            className={`settings-nav-item ${activeSection === 'integrations' ? 'active' : ''}`}
            onClick={() => handleSectionChange('integrations')}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="7" height="7" /><rect x="15" y="3" width="7" height="7" /><rect x="15" y="14" width="7" height="7" /><rect x="2" y="14" width="7" height="7" /><line x1="9" y1="6.5" x2="15" y2="6.5" /><line x1="18.5" y1="10" x2="18.5" y2="14" /><line x1="9" y1="17.5" x2="15" y2="17.5" /><line x1="5.5" y1="10" x2="5.5" y2="14" /></svg>
            <span>Integrations</span>
          </button>
        </div>

        {/* Settings Content */}
        <div className="settings-content">
          {isTabLoading ? (
            <SettingsSectionSkeleton rows={4} />
          ) : (
            <>
              {/* Section: Account */}
              {activeSection === 'account' && (
            <div className="settings-section active" id="settingsSectionAccount">
              <div className="settings-section-head">
                <h3>Account</h3>
                <p>Manage your profile and organization details</p>
              </div>

              <div className="settings-group">
                <div className="settings-group-label">Profile</div>
                <div className="settings-row">
                  <div className="settings-row-info">
                    <div className="settings-row-title">Display Name</div>
                    <div className="settings-row-desc">Ravi Prasanth</div>
                  </div>
                  <button className="settings-row-action" onClick={() => showToast('Editing display name')}>Edit</button>
                </div>
                <div className="settings-row">
                  <div className="settings-row-info">
                    <div className="settings-row-title">Email Address</div>
                    <div className="settings-row-desc">ravi@knotnex.com</div>
                  </div>
                  <button className="settings-row-action" onClick={() => showToast('Verification link sent')}>Change</button>
                </div>
                <div className="settings-row">
                  <div className="settings-row-info">
                    <div className="settings-row-title">Phone Number</div>
                    <div className="settings-row-desc">+91 98765 43210</div>
                  </div>
                  <button className="settings-row-action" onClick={() => showToast('Updating phone')}>Update</button>
                </div>
              </div>

              <div className="settings-group">
                <div className="settings-group-label">Organization</div>
                <div className="settings-row">
                  <div className="settings-row-info">
                    <div className="settings-row-title">Organization Name</div>
                    <div className="settings-row-desc">Knotbox Technologies Foundation</div>
                  </div>
                  <button className="settings-row-action" onClick={() => showToast('Editing organization legal name')}>Edit</button>
                </div>
                <div className="settings-row">
                  <div className="settings-row-info">
                    <div className="settings-row-title">Subscription Plan</div>
                    <div className="settings-row-desc">Enterprise — Active Tier</div>
                  </div>
                  <button className="settings-row-action btn-primary-sm" onClick={() => showToast('Subscription active')}>Manage</button>
                </div>
              </div>
            </div>
          )}

          {/* Section: Notifications */}
          {activeSection === 'notifications' && (
            <div className="settings-section active">
              <div className="settings-section-head">
                <h3>Notifications</h3>
                <p>Select which event, ticket, and gateway alerts you receive</p>
              </div>

              <div className="settings-group">
                <div className="settings-group-label">Alert Channels</div>
                <div className="settings-row">
                  <div className="settings-row-info">
                    <div className="settings-row-title">New Event Registrations</div>
                    <div className="settings-row-desc">Receive real-time push alert when an attendee secures a pass</div>
                  </div>
                  <label className="toggle-switch-ios">
                    <input
                      type="checkbox"
                      checked={settingsToggles.notifEvents}
                      onChange={() => toggle('notifEvents')}
                    />
                    <span className="slider" />
                  </label>
                </div>

                <div className="settings-row">
                  <div className="settings-row-info">
                    <div className="settings-row-title">Support Ticket Alerts</div>
                    <div className="settings-row-desc">Notify immediate response team when attendee raises a booking error</div>
                  </div>
                  <label className="toggle-switch-ios">
                    <input
                      type="checkbox"
                      checked={settingsToggles.notifTickets}
                      onChange={() => toggle('notifTickets')}
                    />
                    <span className="slider" />
                  </label>
                </div>

                <div className="settings-row">
                  <div className="settings-row-info">
                    <div className="settings-row-title">Weekly Disbursal Digest</div>
                    <div className="settings-row-desc">Weekly summary email of grant scheme applications and gate attendance</div>
                  </div>
                  <label className="toggle-switch-ios">
                    <input
                      type="checkbox"
                      checked={settingsToggles.notifDigest}
                      onChange={() => toggle('notifDigest')}
                    />
                    <span className="slider" />
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Section: Privacy */}
          {activeSection === 'privacy' && (
            <div className="settings-section active">
              <div className="settings-section-head">
                <h3>Privacy &amp; Security</h3>
                <p>Two-factor authentication, sessions, and compliance controls</p>
              </div>

              <div className="settings-group">
                <div className="settings-group-label">Authentication</div>
                <div className="settings-row">
                  <div className="settings-row-info">
                    <div className="settings-row-title">Two-Factor Authentication (2FA)</div>
                    <div className="settings-row-desc">Secure account logins using an authenticator app (TOTP)</div>
                  </div>
                  <label className="toggle-switch-ios">
                    <input
                      type="checkbox"
                      checked={settingsToggles.twoFactor}
                      onChange={() => toggle('twoFactor')}
                    />
                    <span className="slider" />
                  </label>
                </div>

                <div className="settings-row">
                  <div className="settings-row-info">
                    <div className="settings-row-title">Active Devices &amp; Sessions</div>
                    <div className="settings-row-desc">Logged in on Chrome (Windows 11) — Bengaluru, India</div>
                  </div>
                  <button className="settings-row-action" onClick={() => showToast('Logged out from other devices')}>Revoke Others</button>
                </div>
              </div>
            </div>
          )}

          {/* Section: Appearance */}
          {activeSection === 'appearance' && (
            <div className="settings-section active">
              <div className="settings-section-head">
                <h3>Appearance &amp; Theme</h3>
                <p>Customize the interface styling and density</p>
              </div>

              <div className="settings-group">
                <div className="settings-group-label">Theme Mode</div>
                <div className="settings-row">
                  <div className="settings-row-info">
                    <div className="settings-row-title">Dark Mode Theme</div>
                    <div className="settings-row-desc">Switch between light Minimal Canvas and Obsidian dark theme</div>
                  </div>
                  <label className="toggle-switch-ios">
                    <input
                      type="checkbox"
                      checked={settingsToggles.darkMode}
                      onChange={() => toggle('darkMode')}
                    />
                    <span className="slider" />
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Section: Integrations */}
          {activeSection === 'integrations' && (
            <div className="settings-section active">
              <div className="settings-section-head">
                <h3>Connected Integrations</h3>
                <p>Connect payment gateways, streaming providers, and communication webhooks</p>
              </div>

              <div className="settings-group">
                <div className="settings-group-label">Payment &amp; Communications</div>
                <div className="settings-row">
                  <div className="settings-row-info">
                    <div className="settings-row-title">HDFC &amp; UPI Payment Gateway</div>
                    <div className="settings-row-desc">Connected for instant ticket fee settlement</div>
                  </div>
                  <span className="status-badge active">● Connected</span>
                </div>

                <div className="settings-row">
                  <div className="settings-row-info">
                    <div className="settings-row-title">Slack Notifications</div>
                    <div className="settings-row-desc">Broadcast gate scan alerts and attendee issues to #knotnex-ops</div>
                  </div>
                  <button className="settings-row-action" onClick={() => showToast('Slack webhook connected')}>Connect</button>
                </div>

                <div className="settings-row">
                  <div className="settings-row-info">
                    <div className="settings-row-title">Zoom &amp; YouTube Live</div>
                    <div className="settings-row-desc">Auto-sync livestream keynotes into the AI highlight generator</div>
                  </div>
                  <span className="status-badge active">● Connected</span>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  </div>
    </section>
  );
}
