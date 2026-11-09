import React, { useState } from 'react';
import CoverCropScreen from '../features/events/components/CoverCropScreen';

export default function SchemePortalSupportForm({
  title = '',
  desc,
  setDesc,
  bannerUrl,
  setBannerUrl,
  category,
  portalUrl,
  setPortalUrl,
  helpline,
  setHelpline,
  emailSupport,
  setEmailSupport
}) {
  const [showCropScreen, setShowCropScreen] = useState(false);
  const [originalImage, setOriginalImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setOriginalImage(event.target.result);
        setShowCropScreen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer?.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setOriginalImage(event.target.result);
        setShowCropScreen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleApplyCrop = (croppedDataUrl) => {
    setBannerUrl(croppedDataUrl);
    setShowCropScreen(false);
  };

  // If cropping active, render full-screen crop tool
  if (showCropScreen && originalImage) {
    return (
      <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: '#FFFFFF' }}>
        <CoverCropScreen
          imageSrc={originalImage}
          initialEventName={title || 'Scheme Title'}
          onApply={handleApplyCrop}
          onCancel={() => setShowCropScreen(false)}
          onUploadNew={handleFileUpload}
          type="scheme"
          category={category || 'Government'}
        />
      </div>
    );
  }

  return (
    <div
      className="studio-card scheme-portal-support-component"
      style={{
        overflow: 'visible',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        boxSizing: 'border-box'
      }}
    >
      {/* Header */}
      <div
        className="studio-card-header"
        style={{ borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }}
      >
        <div className="studio-card-icon-box">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
        </div>
        <div>
          <h3 className="studio-card-title">About Scheme, Portal &amp; Support</h3>
          <p className="studio-card-desc">Provide scheme objective, official application portal link and helpline details</p>
        </div>
      </div>

      <div
        className="studio-card-body"
        style={{
          padding: '22px',
          gap: '20px',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'space-between',
          boxSizing: 'border-box'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', flex: 1 }}>
          {/* Field: About the Scheme */}
          <div className="form-group" style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <label className="form-label" htmlFor="inpSchemeDesc">
              About the Scheme <span className="required-star">*</span>
            </label>
            <textarea
              id="inpSchemeDesc"
              rows={5}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Detailed summary and objective of the scheme..."
              style={{
                width: '100%',
                minHeight: '120px',
                flex: 1,
                padding: '12px 14px',
                borderRadius: '12px',
                border: '1px solid #DDE2E9',
                background: '#FFFFFF',
                fontSize: '13px',
                lineHeight: 1.6,
                color: '#1E293B',
                resize: 'vertical',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Field: Standardized Scheme Banner Image */}
          <div className="form-group">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
              <label className="form-label" style={{ marginBottom: 0 }}>
                Scheme Cover Banner <span style={{ fontSize: 11, fontWeight: 500, color: '#6336EB' }}>(Standard 16:9 • 1280×720)</span>
              </label>
              {bannerUrl && (
                <button
                  type="button"
                  onClick={() => {
                    setOriginalImage(bannerUrl);
                    setShowCropScreen(true);
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#6336EB',
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 2v14a2 2 0 0 0 2 2h14"/><path d="M18 22V8a2 2 0 0 0-2-2H2"/></svg>
                  Adjust 16:9 Crop
                </button>
              )}
            </div>

            {/* Drop & Browse Zone */}
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              style={{
                border: isDragging ? '2px dashed #6336EB' : '1.5px dashed #CBD5E1',
                borderRadius: 12,
                padding: '16px',
                background: isDragging ? '#F5F3FF' : '#F8FAFC',
                textAlign: 'center',
                transition: 'all 0.2s ease',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <label
                  style={{
                    background: '#6336EB',
                    color: '#FFF',
                    padding: '7px 16px',
                    borderRadius: 8,
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6
                  }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                  Browse File
                  <input type="file" accept="image/*" onChange={handleFileUpload} style={{ display: 'none' }} />
                </label>
                <span style={{ fontSize: 12, color: '#94A3B8' }}>or drag &amp; drop banner image here</span>
              </div>
            </div>

            {/* Direct URL input fallback */}
            <div style={{ marginTop: 8 }}>
              <input
                type="text"
                id="inpSchemeBanner"
                className="form-input"
                value={bannerUrl}
                onChange={(e) => setBannerUrl(e.target.value)}
                placeholder="Or paste external banner image URL (https://...)"
                style={{
                  height: '38px',
                  padding: '0 12px',
                  borderRadius: '8px',
                  border: '1px solid #DDE2E9',
                  fontSize: '12.5px',
                  width: '100%',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            {/* Live KnotNex User App Mobile Card Preview */}
            {bannerUrl ? (
              <div style={{ marginTop: 12 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#6336EB', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 5 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981' }} />
                  KnotNex User App Mobile Card Preview (16:9 • 304×171):
                </div>

                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: '340px',
                    aspectRatio: '16 / 9',
                    borderRadius: 16,
                    overflow: 'hidden',
                    background: '#0F172A',
                    border: '1px solid #E2E8F0',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.08)'
                  }}
                >
                  <img
                    src={bannerUrl}
                    alt="Scheme Preview Banner"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  {/* 108px Bottom gradient scrim matching knotnex_hub_screen.dart */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 65%)',
                      pointerEvents: 'none'
                    }}
                  />
                  {/* Top-left Badge */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 10,
                      left: 10,
                      background: '#16A34A',
                      color: '#FFF',
                      fontSize: 10,
                      fontWeight: 700,
                      padding: '3px 8px',
                      borderRadius: 6,
                      textTransform: 'uppercase',
                      letterSpacing: '0.4px'
                    }}
                  >
                    {category || 'ELIGIBLE'}
                  </div>

                  {/* Bottom Text Over Scrim */}
                  <div style={{ position: 'absolute', bottom: 10, left: 12, right: 12 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#FFF', lineHeight: 1.25, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {title || 'Scheme Title Preview'}
                    </div>
                    <div style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.75)', marginTop: 2 }}>
                      Ministry of Support • Direct Benefit
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        {/* Bottom Section: Application Portal Link & Support */}
        <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="form-group">
            <label className="form-label" htmlFor="inpSchemePortalUrl">
              Official Application Portal Link
            </label>
            <input
              type="text"
              id="inpSchemePortalUrl"
              className="form-input"
              value={portalUrl}
              onChange={(e) => setPortalUrl(e.target.value)}
              placeholder="e.g. https://schemes.gov.in/apply"
              style={{
                height: '42px',
                padding: '0 14px',
                borderRadius: '10px',
                border: '1px solid #DDE2E9',
                fontSize: '13.5px',
                width: '100%',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="inpSchemeHelpline">
                Helpline Number
              </label>
              <input
                type="text"
                id="inpSchemeHelpline"
                className="form-input"
                value={helpline}
                onChange={(e) => setHelpline(e.target.value)}
                placeholder="e.g. 1800-111-555"
                style={{
                  height: '40px',
                  padding: '0 12px',
                  borderRadius: '10px',
                  border: '1px solid #DDE2E9',
                  fontSize: '13px',
                  width: '100%',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="inpSchemeEmail">
                Email Support
              </label>
              <input
                type="text"
                id="inpSchemeEmail"
                className="form-input"
                value={emailSupport}
                onChange={(e) => setEmailSupport(e.target.value)}
                placeholder="e.g. support@schemes.gov.in"
                style={{
                  height: '40px',
                  padding: '0 12px',
                  borderRadius: '10px',
                  border: '1px solid #DDE2E9',
                  fontSize: '13px',
                  width: '100%',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
