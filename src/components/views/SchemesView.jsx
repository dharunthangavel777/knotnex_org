import React, { useState } from 'react';

export default function SchemesView({
  schemes,
  schemeApplications,
  setSchemeApplications,
  onNavigate,
  addToast,
  defaultSubAction
}) {
  const [activeTab, setActiveTab] = useState(defaultSubAction === 'manage-schemes' ? 'applications' : 'catalog');
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredSchemes = schemes.filter(s => {
    const matchesSearch = s.title.toLowerCase().includes(search.toLowerCase()) ||
                          s.eligibility.toLowerCase().includes(search.toLowerCase());
    const matchesCat = categoryFilter === 'all' || s.category.toLowerCase().includes(categoryFilter.toLowerCase());
    return matchesSearch && matchesCat;
  });

  const filteredApps = schemeApplications.filter(sap => (
    sap.applicant.toLowerCase().includes(search.toLowerCase()) ||
    sap.scheme.toLowerCase().includes(search.toLowerCase())
  ));

  const updateAppStatus = (id, newStatus) => {
    setSchemeApplications(prev => prev.map(a => {
      if (a.id === id) {
        addToast(`Grant submission for ${a.applicant} status changed to ${newStatus}`, 'success');
        return { ...a, status: newStatus };
      }
      return a;
    }));
  };

  return (
    <section className="app-view active" id="viewAllSchemes">
      <div className="view-header-bar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 20 }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--neutral-900)' }}>Grant Schemes &amp; Subsidies</h2>
          <p style={{ fontSize: 13, color: 'var(--neutral-500)' }}>Manage active state innovation funds, solar subsidies, and agribusiness fellowships</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ display: 'flex', background: 'var(--neutral-100)', padding: 3, borderRadius: 8 }}>
            <button
              id="tabSchemesCatalog"
              className={`btn-filter-pill ${activeTab === 'catalog' ? 'active' : ''}`}
              onClick={() => setActiveTab('catalog')}
              style={{
                padding: '6px 14px',
                fontSize: 12,
                border: 'none',
                borderRadius: 6,
                background: activeTab === 'catalog' ? '#fff' : 'transparent',
                color: activeTab === 'catalog' ? 'var(--neutral-900)' : 'var(--neutral-600)',
                fontWeight: activeTab === 'catalog' ? 600 : 400,
                cursor: 'pointer'
              }}
            >
              Scheme Catalog ({schemes.length})
            </button>
            <button
              id="tabSchemesApplications"
              className={`btn-filter-pill ${activeTab === 'applications' ? 'active' : ''}`}
              onClick={() => setActiveTab('applications')}
              style={{
                padding: '6px 14px',
                fontSize: 12,
                border: 'none',
                borderRadius: 6,
                background: activeTab === 'applications' ? '#fff' : 'transparent',
                color: activeTab === 'applications' ? 'var(--neutral-900)' : 'var(--neutral-600)',
                fontWeight: activeTab === 'applications' ? 600 : 400,
                cursor: 'pointer'
              }}
            >
              Submissions Audit ({schemeApplications.length})
            </button>
          </div>
          <button className="btn-primary" onClick={() => onNavigate('createScheme')}>
            <span>+ Create Scheme</span>
          </button>
        </div>
      </div>

      {/* Filter toolbar */}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center', marginBottom: 20, background: '#fff', padding: 14, borderRadius: 16, border: '1px solid var(--neutral-200)' }}>
        <input
          type="text"
          className="form-input"
          placeholder="Search schemes, grant titles, or applicants..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ maxWidth: 320 }}
        />
        {activeTab === 'catalog' && (
          <select
            className="form-select"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            style={{ width: 'auto' }}
          >
            <option value="all">All Categories</option>
            <option value="Technology">Technology &amp; R&amp;D</option>
            <option value="Renewable">Renewable Energy</option>
            <option value="Economic">Economic Empowerment</option>
            <option value="Sustainability">Sustainability</option>
            <option value="Healthcare">Healthcare</option>
          </select>
        )}
      </div>

      {activeTab === 'catalog' ? (
        /* Scheme Catalog Grid */
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
          {filteredSchemes.map(s => (
            <div key={s.id} style={{ background: '#fff', borderRadius: 20, border: '1px solid var(--neutral-200)', padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span style={{ background: 'var(--brand-50)', color: 'var(--knotnex-primary)', fontWeight: 600, fontSize: 11.5, padding: '4px 10px', borderRadius: 6 }}>
                  {s.category}
                </span>
                <span className={`status-badge ${s.status}`}>{s.status}</span>
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--neutral-900)' }}>{s.title}</h3>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#12B76A' }}>{s.value}</div>
              <p style={{ fontSize: 12.5, color: 'var(--neutral-600)', lineHeight: 1.4 }}>
                <strong>Eligibility:</strong> {s.eligibility}
              </p>
              <div style={{ marginTop: 'auto', paddingTop: 12, borderTop: '1px solid var(--neutral-100)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12, color: 'var(--neutral-500)' }}>
                <span>Deadline: {s.deadline}</span>
                <button className="btn-secondary" style={{ height: 32, fontSize: 12 }} onClick={() => setActiveTab('applications')}>
                  View Submissions
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Applications Table */
        <div style={{ background: '#fff', borderRadius: 20, border: '1px solid var(--neutral-200)', overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'var(--neutral-50)', borderBottom: '1px solid var(--neutral-200)', color: 'var(--neutral-600)', fontSize: 12, fontWeight: 600 }}>
                  <th style={{ padding: '12px 16px' }}>Applicant Entity</th>
                  <th style={{ padding: '12px 16px' }}>Target Scheme</th>
                  <th style={{ padding: '12px 16px' }}>Funding Requested</th>
                  <th style={{ padding: '12px 16px' }}>Review Stage</th>
                  <th style={{ padding: '12px 16px' }}>Status</th>
                  <th style={{ padding: '12px 16px', textAlign: 'right' }}>Update Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredApps.map(sap => (
                  <tr key={sap.id} style={{ borderBottom: '1px solid var(--neutral-100)' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--neutral-900)' }}>{sap.applicant}</td>
                    <td style={{ padding: '12px 16px', color: 'var(--knotnex-primary)', fontWeight: 500 }}>{sap.scheme}</td>
                    <td style={{ padding: '12px 16px', fontWeight: 700, color: '#12B76A' }}>{sap.funding}</td>
                    <td style={{ padding: '12px 16px', color: 'var(--neutral-600)' }}>{sap.stage}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span className={`status-badge ${sap.status === 'Approved' || sap.status === 'Disbursed' ? 'active' : sap.status === 'Shortlisted' ? 'ongoing' : 'pending'}`}>
                        {sap.status}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                      <select
                        className="form-select"
                        value={sap.status}
                        onChange={(e) => updateAppStatus(sap.id, e.target.value)}
                        style={{ width: 'auto', height: 30, fontSize: 12, padding: '0 8px' }}
                      >
                        <option value="Under Review">Under Review</option>
                        <option value="Shortlisted">Shortlisted</option>
                        <option value="Approved">Approved</option>
                        <option value="Disbursed">Disbursed</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
}
