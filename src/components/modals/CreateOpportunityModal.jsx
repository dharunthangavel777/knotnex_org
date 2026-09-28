import React, { useState } from 'react';

export default function CreateOpportunityModal({ isOpen, onClose, setJobs, addToast }) {
  const [title, setTitle] = useState('');
  const [dept, setDept] = useState('Engineering');
  const [type, setType] = useState('Full-time');
  const [location, setLocation] = useState('Remote');
  const [poster, setPoster] = useState('assets/hiring/hiring-fullstack-engineer.svg');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      addToast('Please enter a role title', 'error');
      return;
    }

    const newJob = {
      id: 'job-' + Date.now(),
      title,
      poster,
      dept,
      type,
      location,
      applications: 0,
      status: 'active'
    };

    setJobs(prev => [newJob, ...prev]);
    addToast(`Career opportunity "${title}" posted live!`, 'success');
    onClose();
  };

  return (
    <div className="modal-backdrop" id="modalCreateOpportunity" style={{ display: 'flex' }}>
      <div className="modal-dialog" style={{ maxWidth: 500 }}>
        <div className="modal-header">
          <h2 className="modal-title">Post New Career Opportunity</h2>
          <button className="modal-close-btn" onClick={onClose}>&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">Job Title / Role</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Lead Systems Architect"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label">Department</label>
                <select className="form-select" value={dept} onChange={(e) => setDept(e.target.value)}>
                  <option value="Product & Design">Product &amp; Design</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Community & Growth">Community &amp; Growth</option>
                  <option value="Operations">Operations</option>
                  <option value="AI & Ethics">AI &amp; Ethics</option>
                  <option value="Infrastructure">Infrastructure</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Employment Type</label>
                <select className="form-select" value={type} onChange={(e) => setType(e.target.value)}>
                  <option value="Full-time">Full-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Fellowship">Fellowship</option>
                  <option value="Part-time">Part-time</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Workplace Location</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Remote (US/Global) or Berlin / Hybrid"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Hiring Banner Graphic</label>
              <select className="form-select" value={poster} onChange={(e) => setPoster(e.target.value)}>
                <option value="assets/hiring/hiring-fullstack-engineer.svg">Full Stack Engineer Graphic</option>
                <option value="assets/hiring/hiring-product-designer.svg">Product Designer Graphic</option>
                <option value="assets/hiring/hiring-community-manager.svg">Community Manager Graphic</option>
                <option value="assets/hiring/hiring-climate-associate.svg">Climate Associate Graphic</option>
                <option value="assets/hiring/hiring-ai-fellow.svg">AI Fellow Graphic</option>
                <option value="assets/hiring/hiring-devops-security.svg">DevOps Security Graphic</option>
              </select>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary">Post Opportunity</button>
          </div>
        </form>
      </div>
    </div>
  );
}
