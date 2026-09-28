import React, { useState } from 'react';

export default function CreateSchemeView({ setSchemes, onNavigate, addToast }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Technology & R&D');
  const [value, setValue] = useState('₹25,00,000 Grant');
  const [deadline, setDeadline] = useState('31 Dec 2026');
  const [eligibility, setEligibility] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      addToast('Please enter a scheme program title', 'error');
      return;
    }

    const newScheme = {
      id: 'sch-' + Date.now(),
      title,
      category,
      value,
      eligibility: eligibility || 'Verified non-profit or research entity',
      deadline,
      status: 'active'
    };

    setSchemes(prev => [newScheme, ...prev]);
    addToast(`Scheme "${title}" created and published live!`, 'success');
    onNavigate('schemes');
  };

  return (
    <section className="app-view active" id="viewCreateScheme">
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--neutral-900)' }}>Launch New Scheme Program</h2>
        <p style={{ fontSize: 13, color: 'var(--neutral-500)' }}>Configure innovation grants, subsidy allocations, and application eligibility guidelines</p>
      </div>

      <div style={{ maxWidth: 720, background: '#fff', borderRadius: 20, border: '1px solid var(--neutral-200)', padding: 24 }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="form-group">
            <label className="form-label">Scheme Program Title</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. National Clean Water Innovation Fellowship 2026"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div className="form-group">
              <label className="form-label">Program Category</label>
              <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="Technology & R&D">Technology &amp; R&amp;D</option>
                <option value="Renewable Energy">Renewable Energy</option>
                <option value="Economic Empowerment">Economic Empowerment</option>
                <option value="Sustainability">Sustainability</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Workforce Development">Workforce Development</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Grant / Subsidy Value</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. ₹25,00,000 Grant or 50% Capital Subsidy"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Application Deadline</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. 31 Dec 2026 or Rolling 2026"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Target Eligibility Requirements</label>
            <textarea
              className="form-textarea"
              rows="3"
              placeholder="Define who can apply (e.g. Early-stage deep tech startups, rural community schools...)"
              value={eligibility}
              onChange={(e) => setEligibility(e.target.value)}
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label className="form-label">Program Overview &amp; Guidelines</label>
            <textarea
              className="form-textarea"
              rows="4"
              placeholder="Provide disbursal milestones, compliance documents required, and review criteria..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 10 }}>
            <button type="button" className="btn-secondary" onClick={() => onNavigate('schemes')}>Cancel</button>
            <button type="submit" className="btn-primary" style={{ height: 42, padding: '0 24px' }}>
              <span>Publish Scheme Program</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
