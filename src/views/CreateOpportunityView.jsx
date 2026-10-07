import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import BackButton from '../components/common/BackButton';

const DEPARTMENT_OPTIONS = [
  { value: 'Product & Design', label: 'Product & Design', icon: 'palette' },
  { value: 'Engineering', label: 'Engineering', icon: 'terminal' },
  { value: 'Community & Growth', label: 'Community & Growth', icon: 'groups' },
  { value: 'Operations', label: 'Operations', icon: 'tune' },
  { value: 'Marketing & Outreach', label: 'Marketing & Outreach', icon: 'campaign' }
];

const EMPLOYMENT_TYPE_OPTIONS = [
  { value: 'Full-time', label: 'Full-time', icon: 'schedule' },
  { value: 'Contract', label: 'Contract', icon: 'description' },
  { value: 'Part-time', label: 'Part-time', icon: 'hourglass_bottom' },
  { value: 'Fellowship', label: 'Fellowship', icon: 'school' },
  { value: 'Internship', label: 'Internship', icon: 'explore' }
];

const PERK_OPTIONS = [
  { id: 'health', icon: '🩺', label: 'Health Coverage' },
  { id: 'remote', icon: '💻', label: 'Remote Setup Allowance' },
  { id: 'budget', icon: '💵', label: '₹1,50,000 Learning Budget' },
  { id: 'hours', icon: '⏰', label: 'Flexible Work Hours' },
  { id: 'equity', icon: '📈', label: 'Equity / ESOPs' },
  { id: 'wellness', icon: '🌿', label: 'Mental Wellness Days' }
];

const DEFAULT_REQUIREMENTS = `• 4+ years leading design systems and WCAG AAA accessibility workflows.
• Proven track record with Figma design tokens, rapid prototyping, and micro-interactions.
• Experience collaborating with cross-functional teams in high-growth ecosystems.
• Strong written and verbal communication skills with community empathy.`;

/**
 * Dropdown component mirroring the App Bar "+ Create" button dropdown layout:
 * - .appbar-dropdown-anchor wrapper
 * - .appbar-create-menu-dropdown card layout
 * - .appbar-menu-row item layout with .menu-icon-purple
 */
function AppbarStyleDropdown({ id, label, value, onChange, options }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value) || options[0];

  return (
    <div className="form-group" style={{ position: 'relative' }}>
      <label className="form-label" htmlFor={id}>
        {label}
      </label>
      <div className="appbar-dropdown-anchor" ref={dropdownRef} style={{ width: '100%', position: 'relative' }}>
        <button
          type="button"
          id={id}
          className="form-input form-select-appbar-trigger"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          style={{
            width: '100%',
            height: '42px',
            padding: '0 14px',
            background: '#FFFFFF',
            border: isOpen ? '1.5px solid #6336EB' : '1px solid #DDE2E9',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            fontSize: '13.5px',
            fontWeight: 500,
            color: '#111827',
            boxShadow: isOpen ? '0 0 0 3px rgba(99, 54, 235, 0.08)' : '0 1px 2px rgba(0, 0, 0, 0.02)',
            transition: 'all 0.18s ease',
            outline: 'none',
            boxSizing: 'border-box'
          }}
          onMouseEnter={(e) => {
            if (!isOpen) e.currentTarget.style.borderColor = '#C4B5FD';
          }}
          onMouseLeave={(e) => {
            if (!isOpen) e.currentTarget.style.borderColor = '#DDE2E9';
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="material-symbols-outlined menu-icon-purple" style={{ fontSize: '18px' }}>
              {selectedOption?.icon}
            </span>
            <span>{selectedOption?.label}</span>
          </div>
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#6B7280"
            strokeWidth="2.5"
            style={{
              transition: 'transform 0.2s ease',
              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              flexShrink: 0
            }}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

        {isOpen && (
          <div
            className="appbar-create-menu-dropdown"
            role="listbox"
            style={{
              width: '100%',
              left: 0,
              right: 'auto',
              top: 'calc(100% + 6px)',
              minWidth: '220px',
              boxSizing: 'border-box',
              zIndex: 120
            }}
          >
            {options.map((opt) => {
              const isSelected = opt.value === value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  className="appbar-menu-row"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onChange(opt.value);
                    setIsOpen(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    background: isSelected ? '#F3EFFF' : undefined,
                    color: isSelected ? '#6336EB' : '#111827',
                    fontWeight: isSelected ? 600 : 500
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="material-symbols-outlined menu-icon-purple">
                      {opt.icon}
                    </span>
                    <span>{opt.label}</span>
                  </div>
                  {isSelected && (
                    <span
                      className="material-symbols-outlined"
                      style={{ fontSize: '18px', color: '#6336EB' }}
                    >
                      check
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default function CreateOpportunityView() {
  const { navigateTo, addJob, showToast } = useApp();
  const fileInputRef = useRef(null);

  const [jobData, setJobData] = useState({
    title: 'Senior Product Designer',
    dept: 'Product & Design',
    type: 'Full-time',
    location: 'Remote (India / Global)',
    salary: '$85,000 - $110,000 / yr',
    experience: '3-5 Years',
    desc: DEFAULT_REQUIREMENTS,
    poster: ''
  });

  const [selectedPerks, setSelectedPerks] = useState([
    'health',
    'remote',
    'budget',
    'hours',
    'equity',
    'wellness'
  ]);
  const [posterFileName, setPosterFileName] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const togglePerk = (id) => {
    setSelectedPerks((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const handleImageFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      showToast('Please upload an image file (PNG, JPG, SVG, WebP)', 'warning');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      showToast('File size must be under 5MB', 'warning');
      return;
    }
    setPosterFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      setJobData((prev) => ({ ...prev, poster: e.target?.result }));
      showToast('Banner image uploaded successfully', 'success');
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageFile(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleImageFile(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handlePublish = () => {
    if (!jobData.title?.trim()) {
      showToast('Please enter a role title', 'warning');
      return;
    }
    addJob({
      ...jobData,
      perks: selectedPerks
    });
    navigateTo('careers');
  };

  return (
    <section className="app-view active" id="viewCreateOpportunity">
      {/* Top Header: Back Button alone */}
      <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
        <BackButton
          id="btnBackToCareersFromCreate"
          onClick={() => navigateTo('careers')}
        />
      </div>

      {/* Main Single Column Form Container */}
      <div
        className="create-opportunity-container"
        style={{
          maxWidth: '860px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}
      >
        {/* Card 1: Role & Position Details */}
        <div className="studio-card" style={{ overflow: 'visible' }}>
          <div
            className="studio-card-header"
            style={{ borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }}
          >
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
              <label className="form-label" htmlFor="inpJobTitle">
                Role Title <span className="required-star">*</span>
              </label>
              <input
                type="text"
                className="form-input form-input-lg"
                id="inpJobTitle"
                placeholder="e.g. Senior Product Designer"
                value={jobData.title}
                onChange={(e) => setJobData({ ...jobData, title: e.target.value })}
              />
            </div>

            {/* Department and Employment Type Dropdowns styled like App Bar Create button */}
            <div className="form-row-2">
              <AppbarStyleDropdown
                id="inpJobDept"
                label="Department"
                value={jobData.dept}
                onChange={(val) => setJobData({ ...jobData, dept: val })}
                options={DEPARTMENT_OPTIONS}
              />

              <AppbarStyleDropdown
                id="inpJobType"
                label="Employment Type"
                value={jobData.type}
                onChange={(val) => setJobData({ ...jobData, type: val })}
                options={EMPLOYMENT_TYPE_OPTIONS}
              />
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

        {/* Card 2: Hiring Poster Banner (Upload Image) */}
        <div className="studio-card">
          <div className="studio-card-header">
            <div className="studio-card-icon-box">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            </div>
            <div>
              <h3 className="studio-card-title">Hiring Poster Banner</h3>
              <p className="studio-card-desc">Upload a banner image that highlights this role on Knotnex</p>
            </div>
          </div>

          <div className="studio-card-body">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleFileInputChange}
            />

            {jobData.poster ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '180px',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    border: '1px solid #E5E7EB',
                    background: '#F8FAFC'
                  }}
                >
                  <img
                    src={jobData.poster}
                    alt="Hiring Poster"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '12px',
                      right: '12px',
                      display: 'flex',
                      gap: '8px'
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      style={{
                        background: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid #D1D5DB',
                        borderRadius: '8px',
                        padding: '6px 14px',
                        fontSize: '12.5px',
                        fontWeight: 600,
                        color: '#111827',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.08)'
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" y1="3" x2="12" y2="15" />
                      </svg>
                      <span>Change Image</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setJobData((prev) => ({ ...prev, poster: '' }));
                        setPosterFileName('');
                        if (fileInputRef.current) fileInputRef.current.value = '';
                      }}
                      style={{
                        background: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid #FEE2E2',
                        borderRadius: '8px',
                        padding: '6px 12px',
                        fontSize: '12.5px',
                        fontWeight: 600,
                        color: '#DC2626',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.08)'
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      </svg>
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
                {posterFileName && (
                  <div style={{ fontSize: '12.5px', color: '#4B5563', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#12B76A" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span style={{ fontWeight: 500 }}>{posterFileName}</span>
                  </div>
                )}
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  padding: '36px 20px',
                  borderRadius: '12px',
                  border: isDragging ? '2px dashed #6336EB' : '1.5px dashed #D1D5DB',
                  background: isDragging ? '#F5F3FF' : '#FAFAFB',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textAlign: 'center'
                }}
                onMouseEnter={(e) => {
                  if (!isDragging) {
                    e.currentTarget.style.borderColor = '#6336EB';
                    e.currentTarget.style.background = '#FAF8FF';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isDragging) {
                    e.currentTarget.style.borderColor = '#D1D5DB';
                    e.currentTarget.style.background = '#FAFAFB';
                  }
                }}
              >
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    background: 'rgba(99, 54, 235, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#6336EB'
                  }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#111827' }}>
                    Click or drag to upload poster image
                  </div>
                  <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px' }}>
                    Supports SVG, PNG, JPG, or WebP
                  </div>
                </div>
                <button
                  type="button"
                  id="btnUploadPosterImage"
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 18px',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#6336EB',
                    background: '#FFFFFF',
                    border: '1.5px solid #C4B5FD',
                    borderRadius: '9999px',
                    cursor: 'pointer',
                    marginTop: '4px',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#F5F3FF';
                    e.currentTarget.style.borderColor = '#6336EB';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#FFFFFF';
                    e.currentTarget.style.borderColor = '#C4B5FD';
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                  <span>Upload Image</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Card 3: Requirements & Perks (Matching user's reference image) */}
        <div className="studio-card">
          <div className="studio-card-header">
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                background: '#F3EFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#6336EB',
                flexShrink: 0
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <line x1="10" y1="9" x2="8" y2="9" />
              </svg>
            </div>
            <div>
              <h3 className="studio-card-title" style={{ fontSize: '16px', fontWeight: 700, color: '#111827', margin: '0 0 3px 0' }}>
                Requirements &amp; Perks
              </h3>
              <p className="studio-card-desc" style={{ fontSize: '13px', color: '#6B7280', margin: 0 }}>
                Detail responsibilities, core technical skills, and candidate perks
              </p>
            </div>
          </div>

          <div className="studio-card-body" style={{ padding: '24px', gap: '22px' }}>
            {/* Field: Requirements & Qualifications */}
            <div className="form-group">
              <label
                htmlFor="inpJobRequirements"
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#1E293B',
                  marginBottom: '10px'
                }}
              >
                Requirements &amp; Qualifications <span style={{ color: '#EF4444', fontWeight: 600 }}>*</span>
              </label>
              <textarea
                id="inpJobRequirements"
                className="studio-card-textarea"
                rows={5}
                value={jobData.desc}
                onChange={(e) => setJobData({ ...jobData, desc: e.target.value })}
                placeholder="Detail requirements & qualifications..."
                style={{
                  width: '100%',
                  minHeight: '130px',
                  padding: '14px 16px',
                  borderRadius: '12px',
                  border: '1px solid #DDE2E9',
                  background: '#FFFFFF',
                  fontSize: '13.5px',
                  lineHeight: 1.65,
                  color: '#1E293B',
                  resize: 'vertical',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            {/* Field: Offered Benefits & Perks */}
            <div className="form-group">
              <label
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#1E293B',
                  marginBottom: '10px'
                }}
              >
                Offered Benefits &amp; Perks (Click to toggle)
              </label>
              <div className="perks-toggle-grid" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {PERK_OPTIONS.map((perk) => {
                  const isSelected = selectedPerks.includes(perk.id);
                  return (
                    <button
                      key={perk.id}
                      type="button"
                      className={`perk-toggle-pill ${isSelected ? 'active' : 'inactive'}`}
                      onClick={() => togglePerk(perk.id)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px 18px',
                        borderRadius: '9999px',
                        fontSize: '13px',
                        fontWeight: 550,
                        background: isSelected ? '#FFFFFF' : '#F9FAFB',
                        border: isSelected ? '1.5px solid #6336EB' : '1.5px solid #E2E8F0',
                        color: isSelected ? '#4F46E5' : '#64748B',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        userSelect: 'none'
                      }}
                    >
                      <span style={{ fontSize: '14px' }}>{perk.icon}</span>
                      <span>{perk.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer Actions Matching Reference Image */}
          <div
            className="studio-card-footer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: '12px',
              padding: '20px 24px',
              borderTop: '1px solid #F3F4F6',
              background: '#FFFFFF',
              borderRadius: '0 0 16px 16px'
            }}
          >
            <button
              type="button"
              id="btnCancelOpportunity"
              onClick={() => navigateTo('careers')}
              style={{
                height: '42px',
                padding: '0 24px',
                borderRadius: '9999px',
                background: '#FFFFFF',
                border: '1.5px solid #E5E7EB',
                color: '#374151',
                fontSize: '13.5px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#D1D5DB';
                e.currentTarget.style.background = '#F9FAFB';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#E5E7EB';
                e.currentTarget.style.background = '#FFFFFF';
              }}
            >
              Cancel &amp; Discard
            </button>

            <button
              type="button"
              id="btnPublishOpportunity"
              onClick={handlePublish}
              style={{
                height: '42px',
                padding: '0 26px',
                borderRadius: '9999px',
                background: '#6336EB',
                border: 'none',
                color: '#FFFFFF',
                fontSize: '13.5px',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(99, 54, 235, 0.3)',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#5528DA';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(99, 54, 235, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#6336EB';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(99, 54, 235, 0.3)';
              }}
            >
              Publish Opportunity
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
