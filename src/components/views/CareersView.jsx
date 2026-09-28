import React, { useState } from 'react';
import { getJobPoster } from '../../data/mockData';

export default function CareersView({
  jobs,
  setJobs,
  applications,
  setApplications,
  onOpenModal,
  addToast,
  defaultSubAction
}) {
  const [activeTab, setActiveTab] = useState(defaultSubAction === 'applications' ? 'applications' : 'jobs');
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('all');

  const filteredJobs = jobs.filter(j => {
    const matchesSearch = j.title.toLowerCase().includes(search.toLowerCase()) ||
                          j.location.toLowerCase().includes(search.toLowerCase());
    const matchesDept = deptFilter === 'all' || j.dept.toLowerCase() === deptFilter.toLowerCase();
    return matchesSearch && matchesDept;
  });

  const filteredApps = applications.filter(a => (
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.role.toLowerCase().includes(search.toLowerCase())
  ));

  const toggleJobStatus = (id) => {
    setJobs(prev => prev.map(j => {
      if (j.id === id) {
        const next = j.status === 'active' ? 'closed' : 'active';
        addToast(`Job posting "${j.title}" status changed to ${next}`, 'info');
        return { ...j, status: next };
      }
      return j;
    }));
  };

  const updateAppStatus = (id, newStatus) => {
    setApplications(prev => prev.map(a => {
      if (a.id === id) {
        addToast(`Applicant ${a.name} status updated to ${newStatus}`, 'success');
        return { ...a, status: newStatus };
      }
      return a;
    }));
  };

  return (
    <section className="app-view active" id="viewAllCareers">
      <div className="view-header-bar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 20 }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--neutral-900)' }}>Careers &amp; Candidate Pipeline</h2>
          <p style={{ fontSize: 13, color: 'var(--neutral-500)' }}>Manage open roles, candidate resume reviews, and interview scheduling</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ display: 'flex', background: 'var(--neutral-100)', padding: 3, borderRadius: 8 }}>
            <button
              id="tabCareersJobs"
              className={`btn-filter-pill ${activeTab === 'jobs' ? 'active' : ''}`}
              onClick={() => setActiveTab('jobs')}
              style={{
                padding: '6px 14px',
                fontSize: 12,
                border: 'none',
                borderRadius: 6,
                background: activeTab === 'jobs' ? '#fff' : 'transparent',
                color: activeTab === 'jobs' ? 'var(--neutral-900)' : 'var(--neutral-600)',
                fontWeight: activeTab === 'jobs' ? 600 : 400,
                cursor: 'pointer'
              }}
            >
              Job Postings ({jobs.length})
            </button>
            <button
              id="tabCareersApplications"
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
              Applicants ({applications.length})
            </button>
          </div>
          <button className="btn-primary" onClick={() => onOpenModal('createOpportunity')}>
            <span>+ Post Opportunity</span>
          </button>
        </div>
      </div>

      {/* Filter toolbar */}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center', marginBottom: 20, background: '#fff', padding: 14, borderRadius: 16, border: '1px solid var(--neutral-200)' }}>
        <input
          type="text"
          className="form-input"
          placeholder="Search roles, locations, or applicant names..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ maxWidth: 320 }}
        />
        {activeTab === 'jobs' && (
          <select
            className="form-select"
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            style={{ width: 'auto' }}
          >
            <option value="all">All Departments</option>
            <option value="Product & Design">Product &amp; Design</option>
            <option value="Engineering">Engineering</option>
            <option value="Community & Growth">Community &amp; Growth</option>
            <option value="Operations">Operations</option>
            <option value="AI & Ethics">AI &amp; Ethics</option>
            <option value="Infrastructure">Infrastructure</option>
          </select>
        )}
      </div>

      {/* Jobs Tab Grid */}
      {activeTab === 'jobs' ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
          {filteredJobs.map(j => (
            <div key={j.id} style={{ background: '#fff', borderRadius: 20, border: '1px solid var(--neutral-200)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: 140, position: 'relative', background: '#f3f4f6' }}>
                <img src={getJobPoster(j)} alt={j.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <span className={`status-badge ${j.status === 'active' ? 'active' : 'completed'}`} style={{ position: 'absolute', top: 12, right: 12 }}>
                  {j.status}
                </span>
                <span style={{ position: 'absolute', bottom: 12, left: 12, background: 'rgba(0,0,0,0.65)', color: '#fff', padding: '3px 8px', borderRadius: 6, fontSize: 11.5 }}>
                  {j.dept}
                </span>
              </div>
              <div style={{ padding: 18, flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--neutral-900)' }}>{j.title}</h3>
                <div style={{ fontSize: 12, color: 'var(--neutral-500)', display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <div>💼 {j.type} · 📍 {j.location}</div>
                  <div>📥 {j.applications} Applicants Submitted</div>
                </div>
                <div style={{ marginTop: 'auto', paddingTop: 12, borderTop: '1px solid var(--neutral-100)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <button className="btn-secondary" style={{ height: 32, fontSize: 12 }} onClick={() => toggleJobStatus(j.id)}>
                    {j.status === 'active' ? 'Close Posting' : 'Reopen Posting'}
                  </button>
                  <button className="btn-secondary" style={{ height: 32, fontSize: 12 }} onClick={() => setActiveTab('applications')}>
                    Review Apps
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Applications Tab Table */
        <div style={{ background: '#fff', borderRadius: 20, border: '1px solid var(--neutral-200)', overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'var(--neutral-50)', borderBottom: '1px solid var(--neutral-200)', color: 'var(--neutral-600)', fontSize: 12, fontWeight: 600 }}>
                  <th style={{ padding: '12px 16px' }}>Candidate Name</th>
                  <th style={{ padding: '12px 16px' }}>Role Applied</th>
                  <th style={{ padding: '12px 16px' }}>Experience &amp; Skills</th>
                  <th style={{ padding: '12px 16px' }}>Applied Date</th>
                  <th style={{ padding: '12px 16px' }}>Pipeline Status</th>
                  <th style={{ padding: '12px 16px', textAlign: 'right' }}>Update Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredApps.map(a => (
                  <tr key={a.id} style={{ borderBottom: '1px solid var(--neutral-100)' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--neutral-900)' }}>{a.name}</td>
                    <td style={{ padding: '12px 16px', color: 'var(--knotnex-primary)', fontWeight: 500 }}>{a.role}</td>
                    <td style={{ padding: '12px 16px', color: 'var(--neutral-600)' }}>{a.experience}</td>
                    <td style={{ padding: '12px 16px', color: 'var(--neutral-500)' }}>{a.date}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span className={`status-badge ${a.status === 'shortlisted' || a.status === 'interview' ? 'active' : a.status === 'rejected' ? 'completed' : 'pending'}`}>
                        {a.status}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                      <select
                        className="form-select"
                        value={a.status}
                        onChange={(e) => updateAppStatus(a.id, e.target.value)}
                        style={{ width: 'auto', height: 30, fontSize: 12, padding: '0 8px' }}
                      >
                        <option value="review">Review</option>
                        <option value="shortlisted">Shortlisted</option>
                        <option value="interview">Interview</option>
                        <option value="rejected">Rejected</option>
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
