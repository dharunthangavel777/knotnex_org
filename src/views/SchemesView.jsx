import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getUserAvatar } from '../data/initialData';
import { SchemesListSkeleton, SchemeApplicationsSkeleton } from '../components/skeletons';
import SearchBar from '../components/common/SearchBar';

export default function SchemesView() {
  const { schemes, schemeApplications, activeSubAction, navigateTo, showToast } = useApp();

  const [activeTab, setActiveTab] = useState(activeSubAction === 'manage-schemes' ? 'applications' : 'schemes');
  const [searchTerm, setSearchTerm] = useState('');
  const [isTabLoading, setIsTabLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setIsTabLoading(true);
    setTimeout(() => {
      setIsTabLoading(false);
      setIsRefreshing(false);
      showToast('Grant schemes database synced successfully!', 'success');
    }, 400);
  };

  const handleTabChange = (newTab) => {
    if (newTab === activeTab) return;
    setIsTabLoading(true);
    setActiveTab(newTab);
    setTimeout(() => {
      setIsTabLoading(false);
    }, 280);
  };

  const filteredSchemes = schemes.filter(s => {
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      return (s.title || '').toLowerCase().includes(q) ||
        (s.category || '').toLowerCase().includes(q);
    }
    return true;
  });

  const filteredApps = schemeApplications.filter(a => {
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      return (a.applicant || a.name || '').toLowerCase().includes(q) ||
        (a.schemeTitle || '').toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <section className="app-view active" id="viewSchemes">
      <header className="content-header">
        <div className="header-title-group">
          <div className="header-icon-box">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
          </div>
          <div className="header-text-group">
            <h1 className="page-title">Organizational Schemes</h1>
            <p className="page-subtitle">Government &amp; organizational grant programs, subsidies, and educational schemes.</p>
          </div>
        </div>
        <div className="header-actions">
          <button className="btn-primary" id="btnOpenCreateSchemeModal" onClick={() => navigateTo('createScheme')}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            <span>Create Scheme</span>
          </button>
        </div>
      </header>

      {/* KPI Stats */}
      <div className="module-stat-grid">
        <div className="module-stat-card" id="cardSchemesTotal" title="Active schemes catalog">
          <div className="module-stat-card-top">
            <div className="module-stat-icon-wrap emerald">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
            </div>
            <span className="badge-trend-pos" style={{ background: '#F0FDF4', color: '#16A34A' }}>
              <span>{schemes.length} Active</span>
            </span>
          </div>
          <div className="module-stat-info">
            <span className="module-stat-label">Active Scheme Programs</span>
            <div className="module-stat-value-row">
              <span className="module-stat-value" id="schemesMetricTotal">{schemes.length}</span>
              <span className="module-stat-unit">Programs</span>
            </div>
            <div className="module-stat-subtext">Central, State &amp; CSR matched</div>
          </div>
        </div>

        <div className="module-stat-card" id="cardSchemesFunding" title="Total funding allocated">
          <div className="module-stat-card-top">
            <div className="module-stat-icon-wrap green">
              <span style={{ fontSize: '19px', fontWeight: 700, lineHeight: 1 }}>₹</span>
            </div>
            <span className="badge-trend-pos">
              <span>₹85L Disbursed</span>
            </span>
          </div>
          <div className="module-stat-info">
            <span className="module-stat-label">Total Grant Pool (INR)</span>
            <div className="module-stat-value-row">
              <span className="module-stat-value" id="schemesMetricFunding">₹4,20,00,000</span>
            </div>
            <div className="module-stat-subtext">Direct beneficiary transfer pool</div>
          </div>
        </div>

        <div className="module-stat-card" id="cardSchemesApplications" title="Beneficiary applications">
          <div className="module-stat-card-top">
            <div className="module-stat-icon-wrap blue">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
              </svg>
            </div>
            <span className="badge-trend-pos" style={{ background: 'rgba(99, 54, 235, 0.08)', color: '#6336EB' }}>
              <span>+22.5% MoM</span>
            </span>
          </div>
          <div className="module-stat-info">
            <span className="module-stat-label">Grant Applications</span>
            <div className="module-stat-value-row">
              <span className="module-stat-value" id="schemesMetricApplications">{schemeApplications.length}</span>
              <span className="module-stat-unit">Submitted</span>
            </div>
            <div className="module-stat-subtext">Under review with committee</div>
          </div>
        </div>

        <div className="module-stat-card" id="cardSchemesApprovalRate" title="Verification & approval rate">
          <div className="module-stat-card-top">
            <div className="module-stat-icon-wrap amber">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <span className="badge-trend-pos">
              <span>91.4%</span>
            </span>
          </div>
          <div className="module-stat-info">
            <span className="module-stat-label">Avg. Verification Rate</span>
            <div className="module-stat-value-row">
              <span className="module-stat-value" id="schemesMetricApprovalRate">91.4%</span>
              <span className="module-stat-unit">Passed</span>
            </div>
            <div className="module-stat-subtext">Document compliance verified</div>
          </div>
        </div>
      </div>

      {/* Main Schemes Card */}
      <div className="sheets-console-card full-screen-width">
        <div className="sheets-console-top-bar">
          <div className="sheets-count-cluster">
            <button
              className={`sheets-filter-pill-btn ${activeTab === 'schemes' ? 'active' : ''}`}
              id="tabSchemesList"
              onClick={() => handleTabChange('schemes')}
              style={{ padding: '6px 14px', fontSize: '13px' }}
            >
              Active Schemes ({schemes.length})
            </button>
            <button
              className={`sheets-filter-pill-btn ${activeTab === 'applications' ? 'active' : ''}`}
              id="tabSchemesApplications"
              onClick={() => handleTabChange('applications')}
              style={{ padding: '6px 14px', fontSize: '13px' }}
            >
              Applications ({schemeApplications.length})
            </button>
          </div>

          <div className="sheets-console-actions">
            <SearchBar
              id="schemesSearchInput"
              placeholder="Search schemes, grants, tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              width="360px"
            />
            <button
              className="circle-action-btn"
              id="btnRefreshSchemesList"
              title="Refresh schemes list"
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                style={{
                  animation: isRefreshing ? 'spin 0.6s linear infinite' : 'none',
                  transition: 'transform 0.2s ease'
                }}
              >
                <polyline points="23 4 23 10 17 10" />
                <polyline points="1 20 1 14 7 14" />
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
              </svg>
            </button>
          </div>
        </div>

        {isTabLoading ? (
          <div style={{ padding: '20px' }}>
            {activeTab === 'schemes' ? <SchemesListSkeleton count={4} /> : <SchemeApplicationsSkeleton rows={5} />}
          </div>
        ) : (
          <>
            {/* Tab 1: Schemes List */}
            {activeTab === 'schemes' && (
          <div style={{ overflowX: 'auto' }}>
            <table className="recent-products-table">
              <colgroup>
                <col style={{ width: '48px' }} />
                <col style={{ width: '34%' }} />
                <col style={{ width: '18%' }} />
                <col style={{ width: '18%' }} />
                <col style={{ width: '16%' }} />
                <col style={{ width: '14%' }} />
              </colgroup>
              <thead>
                <tr>
                  <th className="col-center" style={{ width: '48px', color: 'var(--neutral-400)', fontSize: '11px' }}>#</th>
                  <th>Scheme Program</th>
                  <th>Category</th>
                  <th>Grant Pool</th>
                  <th>Deadline</th>
                  <th style={{ textAlign: 'right', paddingRight: '16px' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredSchemes.map((s, idx) => (
                  <tr key={s.id || idx}>
                    <td className="col-center" style={{ color: 'var(--neutral-400)', fontWeight: 600, fontSize: '12px' }}>
                      {(idx + 1).toString().padStart(2, '0')}
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div
                          style={{
                            width: '38px',
                            height: '38px',
                            borderRadius: '10px',
                            background: '#F5F3FF',
                            color: '#6336EB',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px solid #EDE9FE'
                          }}
                        >
                          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>account_balance</span>
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '13.5px', color: 'var(--text-primary)' }}>
                            {s.title}
                          </div>
                          <div style={{ fontSize: '11.5px', color: 'var(--text-tertiary)', marginTop: '2px' }}>
                            {s.eligibility || 'Non-profit and student entrepreneurs'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="status-badge-minimal" style={{ background: '#ECFDF3', color: '#027A48', fontSize: '11px', padding: '2px 8px', borderRadius: '9999px', fontWeight: 600 }}>
                        {s.category}
                      </span>
                    </td>
                    <td style={{ fontSize: '13px', fontWeight: 600, color: '#12B76A' }}>
                      {s.grantAmount || s.value || '₹25,00,000'}
                    </td>
                    <td style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                      {s.deadline || '30 Nov 2026'}
                    </td>
                    <td style={{ textAlign: 'right', paddingRight: '16px' }}>
                      <span
                        className="status-badge"
                        style={{
                          background: s.status === 'active' ? '#ECFDF3' : '#F2F4F7',
                          color: s.status === 'active' ? '#12B76A' : '#475467',
                          fontSize: '11px',
                          padding: '2px 8px',
                          borderRadius: '9999px'
                        }}
                      >
                        ● {s.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 2: Applications */}
        {activeTab === 'applications' && (
          <div style={{ overflowX: 'auto' }}>
            <table className="recent-products-table">
              <colgroup>
                <col style={{ width: '48px' }} />
                <col style={{ width: '25%' }} />
                <col style={{ width: '25%' }} />
                <col style={{ width: '15%' }} />
                <col style={{ width: '15%' }} />
                <col style={{ width: '20%' }} />
              </colgroup>
              <thead>
                <tr>
                  <th className="col-center" style={{ width: '48px', color: 'var(--neutral-400)', fontSize: '11px' }}>#</th>
                  <th>Applicant Entity</th>
                  <th>Applied Scheme</th>
                  <th>Funding Requested</th>
                  <th>Review Score</th>
                  <th style={{ textAlign: 'right', paddingRight: '16px' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredApps.map((a, idx) => (
                  <tr key={a.id || idx}>
                    <td className="col-center" style={{ color: 'var(--neutral-400)', fontWeight: 600, fontSize: '12px' }}>
                      {(idx + 1).toString().padStart(2, '0')}
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <img
                          src={getUserAvatar(a, idx)}
                          alt=""
                          style={{ width: '34px', height: '34px', borderRadius: '50%', objectFit: 'cover' }}
                        />
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '13px', color: 'var(--text-primary)' }}>
                            {a.applicant || a.name}
                          </div>
                          <div style={{ fontSize: '11.5px', color: 'var(--text-tertiary)' }}>
                            {a.orgType || 'Registered Non-Profit'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td style={{ fontSize: '13px', color: 'var(--text-primary)', fontWeight: 500 }}>
                      {a.schemeTitle}
                    </td>
                    <td style={{ fontSize: '13px', color: '#12B76A', fontWeight: 600 }}>
                      {a.requestedAmount || '₹10,00,000'}
                    </td>
                    <td>
                      <span className="status-badge-minimal" style={{ background: '#EFF8FF', color: '#175CD3', fontSize: '11.5px', padding: '2px 8px', borderRadius: '9999px', fontWeight: 600 }}>
                        ★ {a.score || '9.4 / 10'}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right', paddingRight: '16px' }}>
                      <button
                        className="btn-primary"
                        style={{ height: '30px', padding: '0 10px', fontSize: '12px' }}
                        onClick={() => showToast(`Approved funding disbursal for ${a.applicant || a.name}!`, 'success')}
                      >
                        Approve
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </>
    )}
  </div>
</section>
  );
}
