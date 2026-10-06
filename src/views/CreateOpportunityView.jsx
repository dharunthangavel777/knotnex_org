import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import BackButton from '../components/common/BackButton';

export default function CreateOpportunityView() {
  const { navigateTo, addJob, showToast } = useApp();

  const [jobData, setJobData] = useState({
    title: 'Senior Product Designer',
    dept: 'Product & Design',
    type: 'Full-time',
    location: 'Remote (India / Global)',
    salary: '$85,000 - $110,000 / yr',
    experience: '3-5 Years',
    desc: 'Lead user experience design for the Knotnex Organization web and mobile client systems.',
    poster: '/assets/hiring/hiring-product-designer.svg'
  });

  const posters = [
    { id: 'p1', src: '/assets/hiring/hiring-product-designer.svg', title: 'Product Design' },
    { id: 'p2', src: '/assets/hiring/hiring-fullstack-engineer.svg', title: 'Fullstack' },
    { id: 'p3', src: '/assets/hiring/hiring-community-manager.svg', title: 'Community' },
    { id: 'p4', src: '/assets/hiring/hiring-ai-fellow.svg', title: 'AI Research' }
  ];

  const handlePublish = () => {
    if (!jobData.title) {
      showToast('Please enter a role title', 'warning');
      return;
    }
    addJob(jobData);
    navigateTo('careers');
  };

  return (
    <section className="app-view active" id="viewCreateOpportunity">
      {/* Top Breadcrumb & Action Bar */}
      <div className="screen-breadcrumb-bar visual-studio-breadcrumb">
        <div className="breadcrumb-left-group">
          <BackButton
            id="btnBackToCareersFromCreate"
            onClick={() => navigateTo('careers')}
          />
          <div className="breadcrumb-slash">/</div>
          <span className="breadcrumb-curr-page">Create Opportunity</span>
          <span className="badge-draft-pill"><span className="draft-dot" /> Studio Mode</span>
        </div>

        <div className="studio-header-actions">
          <button
            type="button"
            className="btn-studio-ghost"
            id="btnResetJobForm"
            title="Clear all fields"
            onClick={() => {
              setJobData({
                title: '',
                dept: 'Product & Design',
                type: 'Full-time',
                location: 'Remote',
                salary: '',
                experience: '',
                desc: '',
                poster: '/assets/hiring/hiring-product-designer.svg'
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
            id="btnDraftOpportunity"
            title="Save draft locally"
            onClick={() => showToast('Job posting draft saved successfully!', 'success')}
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
            id="btnPublishOpportunityScreen"
            style={{ height: '36px', padding: '0 18px', borderRadius: '9999px' }}
            onClick={handlePublish}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
            <span>Publish Opportunity</span>
          </button>
        </div>
      </div>

      <div className="screen-editor-grid">
        {/* Form Column */}
        <div className="screen-form-column">
          <div className="studio-card">
            <div className="studio-card-header">
              <div className="studio-card-icon-box">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="7" width="20" height="14" rx="2" />
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
              </div>
              <div>
                <h3 className="studio-card-title">Role &amp; Position Details</h3>
                <p className="studio-card-desc">Specify the title, work mode, department and compensation for this opening</p>
              </div>
            </div>

            <div className="studio-card-body">
              <div className="form-group">
                <label className="form-label" htmlFor="inpJobTitle">Role Title <span className="required-star">*</span></label>
                <input
                  type="text"
                  className="form-input form-input-lg"
                  id="inpJobTitle"
                  placeholder="e.g. Senior Product Designer"
                  value={jobData.title}
                  onChange={(e) => setJobData({ ...jobData, title: e.target.value })}
                />
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label" htmlFor="inpJobDept">Department</label>
                  <select
                    className="form-select"
                    id="inpJobDept"
                    value={jobData.dept}
                    onChange={(e) => setJobData({ ...jobData, dept: e.target.value })}
                  >
                    <option value="Product & Design">Product &amp; Design</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Community & Growth">Community &amp; Growth</option>
                    <option value="Operations">Operations</option>
                    <option value="Marketing & Outreach">Marketing &amp; Outreach</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="inpJobType">Employment Type</label>
                  <select
                    className="form-select"
                    id="inpJobType"
                    value={jobData.type}
                    onChange={(e) => setJobData({ ...jobData, type: e.target.value })}
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Fellowship">Fellowship</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label" htmlFor="inpJobLocation">Work Location</label>
                  <input
                    type="text"
                    className="form-input"
                    id="inpJobLocation"
                    value={jobData.location}
                    onChange={(e) => setJobData({ ...jobData, location: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="inpJobSalary">Compensation</label>
                  <input
                    type="text"
                    className="form-input"
                    id="inpJobSalary"
                    value={jobData.salary}
                    onChange={(e) => setJobData({ ...jobData, salary: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Banner Selector Card */}
          <div className="studio-card">
            <div className="studio-card-header">
              <div className="studio-card-icon-box">
                <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#6336EB' }}>image</span>
              </div>
              <div>
                <h3 className="studio-card-title">Hiring Poster Banner</h3>
                <p className="studio-card-desc">Select an illustrative banner that highlights this role on Knotnex</p>
              </div>
            </div>

            <div className="studio-card-body">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
                {posters.map(p => (
                  <div
                    key={p.id}
                    onClick={() => setJobData({ ...jobData, poster: p.src })}
                    style={{
                      border: jobData.poster === p.src ? '2px solid #6336EB' : '1px solid #E5E7EB',
                      borderRadius: '10px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      padding: '4px',
                      background: jobData.poster === p.src ? '#F5F3FF' : '#FFF'
                    }}
                  >
                    <img src={p.src} alt={p.title} style={{ width: '100%', height: '70px', objectFit: 'cover', borderRadius: '6px' }} />
                    <div style={{ fontSize: '11px', fontWeight: 600, textAlign: 'center', marginTop: '4px', color: '#111827' }}>
                      {p.title}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Live Preview Column */}
        <div className="screen-preview-column">
          <div className="preview-sticky-wrap">
            <div className="preview-header-label">
              <span className="live-dot" /> Live Candidate Preview
            </div>

            <div className="content-card" style={{ boxShadow: '0 8px 30px rgba(0,0,0,0.06)' }}>
              <img src={jobData.poster} alt="" style={{ width: '100%', height: '140px', objectFit: 'cover' }} />
              <div style={{ padding: '16px' }}>
                <span className="status-badge-minimal" style={{ background: '#F4F3FF', color: '#5925DC', fontSize: '11px', padding: '2px 8px', borderRadius: '9999px', fontWeight: 600 }}>
                  {jobData.dept}
                </span>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#111827', margin: '8px 0 4px' }}>
                  {jobData.title || 'Untitled Role'}
                </h3>
                <div style={{ fontSize: '12.5px', color: 'var(--neutral-500)', marginBottom: '12px' }}>
                  {jobData.location} · {jobData.type}
                </div>
                <div style={{ fontSize: '13px', color: '#12B76A', fontWeight: 600, marginBottom: '16px' }}>
                  {jobData.salary || 'Competitive'}
                </div>
                <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  Apply on Knotnex
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
