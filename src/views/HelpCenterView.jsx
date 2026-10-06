import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function HelpCenterView() {
  const { knowledgeCategories, showToast, openModal } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const categories = knowledgeCategories.length ? knowledgeCategories : [
    { id: 'cat-1', title: 'Getting Started', count: 14, icon: 'rocket_launch', desc: 'Onboarding tutorials, initial setup & account configuration' },
    { id: 'cat-2', title: 'Event Operations', count: 28, icon: 'event', desc: 'Ticketing tiers, venue stages, agenda sessions & speakers' },
    { id: 'cat-3', title: 'Gate QR & Turnstiles', count: 18, icon: 'qr_code_scanner', desc: 'Mobile barcode scanner apps, hardware turnstiles & access tokens' },
    { id: 'cat-4', title: 'Grants & Disbursals', count: 22, icon: 'account_balance', desc: 'Scheme requirements, direct beneficiary transfer & compliance' },
    { id: 'cat-5', title: 'Organization Settings', count: 16, icon: 'settings', desc: 'SSO configuration, team permissions & legal entity profiles' },
    { id: 'cat-6', title: 'Developer & Webhooks', count: 24, icon: 'code', desc: 'REST endpoints, API tokens, webhook triggers & Zapier sync' }
  ];

  return (
    <section className="app-view active" id="viewHelpCenter">
      <header className="content-header">
        <div className="header-title-group">
          <div className="header-icon-box">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>
          <div className="header-text-group">
            <h1 className="page-title">Help Center</h1>
            <p className="page-subtitle">Documentation, guides, FAQs, and 24/7 support for your organization.</p>
          </div>
        </div>
        <div className="header-actions">
          <button
            className="btn-primary"
            id="btnHelpContactDirect"
            onClick={() => showToast('Connecting to 24/7 Live Desk...', 'info')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <span>Live Support</span>
          </button>
        </div>
      </header>

      {/* Hero Search Banner */}
      <div className="help-hero-banner">
        <div className="help-hero-content">
          <h2 className="help-hero-title">How can we help your organization today?</h2>
          <p className="help-hero-subtitle">Search 120+ official guides, API references, and event management tutorials.</p>
          <div className="help-hero-search-wrapper">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#667085" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              className="help-hero-search-input"
              id="helpHeroSearch"
              placeholder="Search documentation, guides, or error codes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="help-hero-search-btn"
              id="btnHelpSearchAction"
              onClick={() => showToast(`Searching articles for "${searchTerm}"...`, 'info')}
            >
              Search
            </button>
          </div>
          <div className="help-hero-tags">
            <span className="help-tag-label">Popular:</span>
            <span className="help-tag-pill" onClick={() => setSearchTerm('Event Ticketing')}>Event Ticketing</span>
            <span className="help-tag-pill" onClick={() => setSearchTerm('Stripe & Payouts')}>Stripe &amp; Payouts</span>
            <span className="help-tag-pill" onClick={() => setSearchTerm('Grant Eligibility')}>Grant Eligibility</span>
            <span className="help-tag-pill" onClick={() => setSearchTerm('Role Permissions')}>Role Permissions</span>
            <span className="help-tag-pill" onClick={() => setSearchTerm('2FA Reset')}>2FA Reset</span>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '14px', color: '#131313' }}>Knowledge Categories</h3>
        <div className="help-category-grid" id="helpCategoryGrid">
          {categories.map(cat => (
            <div
              key={cat.id}
              className="content-card"
              style={{ padding: '18px', cursor: 'pointer', transition: 'transform 0.15s ease' }}
              onClick={() => showToast(`Opened category: ${cat.title}`)}
            >
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#F5F3FF', color: '#6336EB', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>{cat.icon || 'folder'}</span>
              </div>
              <div style={{ fontWeight: 700, fontSize: '14.5px', color: '#111827', marginBottom: '4px' }}>{cat.title}</div>
              <div style={{ fontSize: '12.5px', color: '#4B5563', lineHeight: 1.4, marginBottom: '10px' }}>{cat.desc}</div>
              <div style={{ fontSize: '11.5px', color: '#6336EB', fontWeight: 600 }}>{cat.count} Articles &rarr;</div>
            </div>
          ))}
        </div>
      </div>

      <h3 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '14px', color: '#131313' }}>Need Immediate Help?</h3>
      <div className="help-support-row">
        <div className="help-support-card">
          <div className="support-channel-icon live-chat">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <div className="support-channel-info">
            <div className="support-channel-title">24/7 Live Chat</div>
            <div className="support-channel-desc">Avg. response &lt; 2 min</div>
          </div>
          <button
            className="btn-secondary"
            id="btnStartLiveChat"
            style={{ marginTop: '12px', width: '100%' }}
            onClick={() => showToast('Opening live chat session with agent...', 'info')}
          >
            Start Chat
          </button>
        </div>

        <div className="help-support-card">
          <div className="support-channel-icon ticket-support">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="6" width="20" height="12" rx="2" /><path d="M6 12h.01M18 12h.01" /><line x1="10" y1="12" x2="14" y2="12" />
            </svg>
          </div>
          <div className="support-channel-info">
            <div className="support-channel-title">Support Ticket</div>
            <div className="support-channel-desc">Compliance &amp; feature requests</div>
          </div>
          <button
            className="btn-secondary"
            id="btnOpenSupportTicketDialog"
            style={{ marginTop: '12px', width: '100%' }}
            onClick={() => showToast('Direct ticket created. Ticket ID #TK-9942', 'success')}
          >
            New Ticket
          </button>
        </div>

        <div className="help-support-card">
          <div className="support-channel-icon community">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <div className="support-channel-info">
            <div className="support-channel-title">Community Forum</div>
            <div className="support-channel-desc">15,000+ nonprofit leaders</div>
          </div>
          <button
            className="btn-secondary"
            id="btnOpenCommunityForum"
            style={{ marginTop: '12px', width: '100%' }}
            onClick={() => showToast('Redirecting to Knotnex Community Discord & Forum...', 'info')}
          >
            Visit Forum
          </button>
        </div>
      </div>
    </section>
  );
}
