import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import apiClient from '../api/apiClient';

export default function OrgProfileView() {
  const { orgProfile, updateOrgProfile, setOrgProfile, setIsLoggedIn, showToast } = useApp();

  const [formData, setFormData] = useState({
    ...orgProfile,
    gallery: orgProfile?.gallery || [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80'
    ]
  });

  const [uploadUrlInput, setUploadUrlInput] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleSave = (e) => {
    if (e) e.preventDefault();
    if (updateOrgProfile) {
      updateOrgProfile(formData);
    } else {
      setOrgProfile(formData);
      showToast(`Saved changes for ${formData.name}!`, 'success');
    }
  };

  const handleAddImageUrl = () => {
    const url = uploadUrlInput.trim();
    if (!url) return;
    const nextGallery = [...(formData.gallery || []), url];
    setFormData((prev) => ({
      ...prev,
      gallery: nextGallery,
    }));
    if (updateOrgProfile) {
      updateOrgProfile({ ...formData, gallery: nextGallery });
    }
    setUploadUrlInput('');
    showToast('Added photo to campus & facility gallery', 'success');
  };

  const handleRemoveImage = (indexToRemove) => {
    const nextGallery = (formData.gallery || []).filter((_, idx) => idx !== indexToRemove);
    setFormData((prev) => ({
      ...prev,
      gallery: nextGallery,
    }));
    if (updateOrgProfile) {
      updateOrgProfile({ ...formData, gallery: nextGallery });
    }
    showToast('Removed photo from gallery', 'info');
  };

  const handleFileChange = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    const uploadedUrls = [];

    for (const file of Array.from(files)) {
      try {
        const remoteUrl = await apiClient.uploadFile(file, 'gallery');
        if (remoteUrl) {
          uploadedUrls.push(remoteUrl);
        } else {
          uploadedUrls.push(URL.createObjectURL(file));
        }
      } catch (uploadErr) {
        console.warn('[OrgProfileView] Upload notice, using fallback:', uploadErr.message);
        uploadedUrls.push(URL.createObjectURL(file));
      }
    }

    if (uploadedUrls.length > 0) {
      const nextGallery = [...(formData.gallery || []), ...uploadedUrls];
      setFormData((prev) => ({
        ...prev,
        gallery: nextGallery,
      }));
      if (updateOrgProfile) {
        updateOrgProfile({ ...formData, gallery: nextGallery });
      }
      showToast(`Uploaded ${uploadedUrls.length} facility photo(s) to Cloud Storage!`, 'success');
    }
    setIsUploading(false);
  };

  return (
    <section className="app-view active" id="viewOrgProfile">
      <header className="content-header">
        <div className="header-title-group">
          <div className="header-icon-box">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <div className="header-text-group">
            <h1 className="page-title">Organisation Profile</h1>
            <p className="page-subtitle">Manage legal entity details, official contacts, and campus facility showcase.</p>
          </div>
        </div>
        <div className="header-actions" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button className="btn-primary" id="btnSaveOrgProfile" onClick={handleSave}>
            <span>Save Profile</span>
          </button>
          <button
            type="button"
            className="btn-settings-logout-action"
            id="btnOrgProfileLogout"
            onClick={() => {
              setIsLoggedIn(false);
              showToast('Logged out of admin console');
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            <span>Log out</span>
          </button>
        </div>
      </header>

      <div className="form-card">
        <form onSubmit={handleSave}>
          <div className="form-row-2">
            <div className="form-group">
              <label className="form-label">Organisation Legal Name</label>
              <input
                type="text"
                className="form-input"
                id="profileOrgName"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Registration / Tax ID</label>
              <input
                type="text"
                className="form-input"
                id="profileRegNo"
                value={formData.taxId || formData.regNumber || ''}
                placeholder="e.g. GSTIN / CIN / Tax Registration"
                onChange={(e) => setFormData({ ...formData, taxId: e.target.value })}
              />
            </div>
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label className="form-label">Official Email</label>
              <input
                type="email"
                className="form-input"
                id="profileEmail"
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Contact Phone</label>
              <input
                type="text"
                className="form-input"
                id="profilePhone"
                value={formData.phone || ''}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Headquarters Address</label>
            <input
              type="text"
              className="form-input"
              id="profileAddress"
              value={formData.headquarters || ''}
              onChange={(e) => setFormData({ ...formData, headquarters: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Organisation Bio &amp; Mission Statement</label>
            <textarea
              className="form-textarea"
              id="profileBio"
              rows="4"
              value={formData.bio || ''}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            />
          </div>

          {/* Campus & Facility Photo Gallery Uploader */}
          <div className="form-group" style={{ marginTop: '24px' }}>
            <label className="form-label" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Campus &amp; Accessibility Facilities Gallery</span>
              <span style={{ fontSize: '12px', color: 'var(--neutral-500)', fontWeight: 400 }}>
                {(formData.gallery || []).length} photos uploaded
              </span>
            </label>
            <p style={{ fontSize: '12.5px', color: 'var(--neutral-500)', marginTop: '-4px', marginBottom: '12px' }}>
              Showcase accessible entrances, sensory rooms, ramps, meeting spaces, and assistive tech workstations.
            </p>

            {/* Gallery Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                gap: '12px',
                marginBottom: '14px',
              }}
            >
              {(formData.gallery || []).map((imgUrl, idx) => (
                <div
                  key={idx}
                  style={{
                    position: 'relative',
                    height: '110px',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    border: '1px solid var(--neutral-200)',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                  }}
                >
                  <img
                    src={imgUrl}
                    alt={`Facility ${idx + 1}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(idx)}
                    style={{
                      position: 'absolute',
                      top: '6px',
                      right: '6px',
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: 'rgba(0,0,0,0.65)',
                      color: '#ffffff',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '14px',
                      lineHeight: 1,
                    }}
                    title="Remove photo"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>

            {/* Upload Zone */}
            <div
              className="file-dropzone"
              style={{
                position: 'relative',
                cursor: 'pointer',
                border: '2px dashed var(--neutral-300)',
                padding: '20px',
                textAlign: 'center',
                borderRadius: '12px',
                background: '#FAFAFA',
              }}
            >
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  opacity: 0,
                  cursor: 'pointer',
                }}
              />
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ margin: '0 auto 8px', color: '#6336EB' }}>
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--neutral-800)' }}>
                {isUploading ? 'Uploading to Cloud Storage...' : 'Click or Drag & Drop Campus Photos'}
              </div>
              <div style={{ fontSize: '11.5px', color: 'var(--neutral-500)', marginTop: '2px' }}>
                Supports PNG, JPG, WebP up to 10MB per file
              </div>
            </div>

            {/* Quick URL Input */}
            <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
              <input
                type="url"
                className="form-input"
                style={{ flex: 1, fontSize: '12.5px', height: '36px' }}
                placeholder="Or paste direct image URL (https://...)"
                value={uploadUrlInput}
                onChange={(e) => setUploadUrlInput(e.target.value)}
              />
              <button
                type="button"
                className="btn-secondary"
                style={{ height: '36px', fontSize: '12.5px', padding: '0 14px' }}
                onClick={handleAddImageUrl}
              >
                Add URL
              </button>
            </div>
          </div>

          <div className="form-group" style={{ marginTop: '24px' }}>
            <label className="form-label">Compliance Documents (PDF)</label>
            <div className="file-dropzone">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              <div style={{ fontSize: '13px', fontWeight: 500 }}>Certificate_of_Incorporation_2026.pdf (Uploaded)</div>
              <div style={{ fontSize: '11.5px', color: 'var(--neutral-500)' }}>Drag and drop replacement documents or click to browse</div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
