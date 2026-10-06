import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import BackButton from '../components/common/BackButton';

export default function CreateSchemeView() {
  const { navigateTo, addScheme, showToast } = useApp();

  const [schemeData, setSchemeData] = useState({
    title: 'State Innovation & Assistive Tech Grant',
    category: 'Technology & Innovation',
    value: 'Up to ₹25,00,000',
    deadline: '31 Dec 2026',
    disbursement: 'Direct Bank Transfer (DBT)',
    eligibility: 'Registered Non-profits, university laboratories, and accessibility innovators.',
    desc: 'Government-matched grant fund targeting breakthrough assistive hardware and civic accessibility technologies.'
  });

  const handlePublish = () => {
    if (!schemeData.title) {
      showToast('Please enter a scheme title', 'warning');
      return;
    }
    addScheme(schemeData);
    navigateTo('schemes');
  };

  return (
    <section className="app-view active" id="viewCreateScheme">
      {/* Top Breadcrumb & Action Bar */}
      <div className="screen-breadcrumb-bar visual-studio-breadcrumb">
        <div className="breadcrumb-left-group">
          <BackButton
            id="btnBackToSchemesFromCreate"
            onClick={() => navigateTo('schemes')}
          />
          <div className="breadcrumb-slash">/</div>
          <span className="breadcrumb-curr-page">Create Scheme</span>
          <span className="badge-draft-pill"><span className="draft-dot" /> Grant Studio</span>
        </div>

        <div className="studio-header-actions">
          <button
            type="button"
            className="btn-studio-ghost"
            id="btnResetSchemeForm"
            title="Clear all fields"
            onClick={() => {
              setSchemeData({
                title: '',
                category: 'General Grants',
                value: '',
                deadline: '',
                disbursement: 'Direct Bank Transfer (DBT)',
                eligibility: '',
                desc: ''
              });
              showToast('Form reset', 'info');
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
            <span>Reset</span>
          </button>
          <button
            type="button"
            className="btn-studio-ghost"
            id="btnDraftScheme"
            title="Save draft locally"
            onClick={() => showToast('Scheme draft saved locally', 'success')}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
              <polyline points="17 21 17 13 7 13 7 21" />
              <polyline points="7 3 7 8 15 8" />
            </svg>
            <span>Save Draft</span>
          </button>
          <button
            type="button"
            className="btn-primary"
            id="btnPublishSchemeScreen"
            style={{ height: '36px', padding: '0 18px', borderRadius: '9999px' }}
            onClick={handlePublish}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
            <span>Publish Scheme</span>
          </button>
        </div>
      </div>

      <div className="screen-editor-grid">
        {/* Left Form Column */}
        <div className="screen-form-column">
          <div className="studio-card">
            <div className="studio-card-header">
              <div className="studio-card-icon-box">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                  <line x1="12" y1="9" x2="12" y2="15" />
                  <line x1="9" y1="12" x2="15" y2="12" />
                </svg>
              </div>
              <div>
                <h3 className="studio-card-title">Scheme &amp; Grant Definition</h3>
                <p className="studio-card-desc">Define grant assistance amount, focus category, deadline and disbursement terms</p>
              </div>
            </div>

            <div className="studio-card-body">
              <div className="form-group">
                <label className="form-label" htmlFor="inpSchemeTitle">Scheme Title <span className="required-star">*</span></label>
                <input
                  type="text"
                  className="form-input form-input-lg"
                  id="inpSchemeTitle"
                  value={schemeData.title}
                  onChange={(e) => setSchemeData({ ...schemeData, title: e.target.value })}
                />
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label" htmlFor="inpSchemeCategory">Focus Category</label>
                  <input
                    type="text"
                    className="form-input"
                    id="inpSchemeCategory"
                    value={schemeData.category}
                    onChange={(e) => setSchemeData({ ...schemeData, category: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="inpSchemeValue">Financial Value</label>
                  <input
                    type="text"
                    className="form-input"
                    id="inpSchemeValue"
                    value={schemeData.value}
                    onChange={(e) => setSchemeData({ ...schemeData, value: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label" htmlFor="inpSchemeDeadline">Deadline</label>
                  <input
                    type="text"
                    className="form-input"
                    id="inpSchemeDeadline"
                    value={schemeData.deadline}
                    onChange={(e) => setSchemeData({ ...schemeData, deadline: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="inpSchemeDisbursement">Disbursement Mode</label>
                  <select
                    className="form-select"
                    id="inpSchemeDisbursement"
                    value={schemeData.disbursement}
                    onChange={(e) => setSchemeData({ ...schemeData, disbursement: e.target.value })}
                  >
                    <option value="Direct Bank Transfer (DBT)">Direct Bank Transfer (DBT)</option>
                    <option value="Milestone Escrow">Milestone Escrow</option>
                    <option value="Lump Sum Grant">Lump Sum Grant</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="inpSchemeEligibility">Eligibility Requirements</label>
                <textarea
                  className="form-input"
                  id="inpSchemeEligibility"
                  rows="3"
                  value={schemeData.eligibility}
                  onChange={(e) => setSchemeData({ ...schemeData, eligibility: e.target.value })}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Preview Column */}
        <div className="screen-preview-column">
          <div className="preview-sticky-wrap">
            <div className="preview-header-label">
              <span className="live-dot" /> Live Grant Card Preview
            </div>

            <div className="content-card" style={{ boxShadow: '0 8px 30px rgba(0,0,0,0.06)', padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#ECFDF3', color: '#12B76A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>account_balance</span>
                </div>
                <div>
                  <span className="status-badge-minimal" style={{ background: '#ECFDF3', color: '#027A48', fontSize: '11px', padding: '2px 8px', borderRadius: '9999px', fontWeight: 600 }}>
                    {schemeData.category}
                  </span>
                  <div style={{ fontSize: '11.5px', color: 'var(--neutral-400)', marginTop: '2px' }}>Deadline: {schemeData.deadline}</div>
                </div>
              </div>

              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#111827', marginBottom: '8px' }}>
                {schemeData.title || 'Untitled Scheme'}
              </h3>
              <p style={{ fontSize: '12.5px', color: '#4B5563', lineHeight: 1.4, marginBottom: '14px' }}>
                {schemeData.eligibility}
              </p>

              <div style={{ background: '#F8F9FA', padding: '12px', borderRadius: '10px', marginBottom: '16px' }}>
                <div style={{ fontSize: '11px', color: 'var(--neutral-500)', textTransform: 'uppercase', fontWeight: 600 }}>Grant Funding Allocation</div>
                <div style={{ fontSize: '18px', fontWeight: 700, color: '#12B76A', marginTop: '2px' }}>{schemeData.value || '₹25,00,000'}</div>
                <div style={{ fontSize: '11.5px', color: 'var(--neutral-400)', marginTop: '2px' }}>Mode: {schemeData.disbursement}</div>
              </div>

              <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                Apply for Grant
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
