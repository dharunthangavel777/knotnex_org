import React, { useState, useRef, useEffect } from 'react';
import BackButton from '../../../components/common/BackButton';

export default function CoverCropScreen({
  imageSrc,
  initialEventName,
  onApply,
  onCancel,
  onUploadNew,
  type = 'event', // 'event' | 'scheme'
  category = '',
  ticketPrice = ''
}) {
  const [currentSrc, setCurrentSrc] = useState(imageSrc);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgNaturalSize, setImgNaturalSize] = useState({ width: 0, height: 0 });
  const [renderedRect, setRenderedRect] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [cropBox, setCropBox] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [activeDrag, setActiveDrag] = useState(null); // null | 'move' | 'tl' | 'tr' | 'bl' | 'br'
  const [dragStart, setDragStart] = useState({ mouseX: 0, mouseY: 0, boxX: 0, boxY: 0, boxW: 0, boxH: 0 });
  const [previewUrl, setPreviewUrl] = useState(null);
  const [showLivePreview, setShowLivePreview] = useState(false);
  const [showSafeZone, setShowSafeZone] = useState(true);

  // Aspect Ratio presets standardized to KnotNex Flutter User App
  const RATIO_PRESETS = type === 'scheme' ? [
    { id: 'card_scheme', label: 'KnotNex Scheme Card', ratio: 304 / 171, desc: 'Exact Mobile 16:9 Card (304x171)' },
    { id: 'hero_4_3', label: 'Mobile Detail Hero', ratio: 4 / 3, desc: 'Mobile Header (4:3)' },
    { id: 'square_1_1', label: 'Square Standard', ratio: 1.0, desc: 'Square Tile (1:1)' }
  ] : [
    { id: 'card_event', label: 'KnotNex Event Card', ratio: 304 / 142, desc: 'Exact Mobile Card (304x142)' },
    { id: 'universal_16_9', label: 'Universal 16:9', ratio: 16 / 9, desc: 'Standard 1920x1080 Media' },
    { id: 'hero_4_3', label: 'Mobile Detail Hero', ratio: 4 / 3, desc: 'Detail Screen (4:3)' },
    { id: 'desktop_3_1', label: 'Desktop Banner', ratio: 3.0, desc: 'Wide Web Banner (3:1)' }
  ];

  const [selectedRatioId, setSelectedRatioId] = useState(RATIO_PRESETS[0].id);
  const currentRatioObj = RATIO_PRESETS.find(p => p.id === selectedRatioId) || RATIO_PRESETS[0];
  const cropRatio = currentRatioObj.ratio;

  const containerRef = useRef(null);
  const imgRef = useRef(null);

  // Sync currentSrc if imageSrc prop changes
  useEffect(() => {
    setCurrentSrc(imageSrc);
  }, [imageSrc]);

  // Measure rendered image and initialize crop selection box
  const measureAndInit = (activeRatio = cropRatio) => {
    const container = containerRef.current;
    const img = imgRef.current;
    if (!container || !img) return;

    // Available workspace dimensions with comfortable padding
    const padding = 36;
    const cw = container.clientWidth || 900;
    const ch = container.clientHeight || 550;
    const maxW = Math.max(200, cw - padding * 2);
    const maxH = Math.max(200, ch - padding * 2);

    const nw = img.naturalWidth || 1200;
    const nh = img.naturalHeight || 600;
    setImgNaturalSize({ width: nw, height: nh });

    let rw, rh, rx, ry;
    if (nw / nh > maxW / maxH) {
      rw = maxW;
      rh = maxW / (nw / nh);
      rx = (cw - rw) / 2;
      ry = (ch - rh) / 2;
    } else {
      rh = maxH;
      rw = maxH * (nw / nh);
      rx = (cw - rw) / 2;
      ry = (ch - rh) / 2;
    }

    const rRect = { x: rx, y: ry, width: rw, height: rh };
    setRenderedRect(rRect);

    // Initial crop box fitting within renderedRect with activeRatio
    let bw, bh, bx, by;
    if (rw / rh >= activeRatio) {
      bh = rh;
      bw = rh * activeRatio;
      bx = rx + (rw - bw) / 2;
      by = ry;
    } else {
      bw = rw;
      bh = rw / activeRatio;
      bx = rx;
      by = ry + (rh - bh) / 2;
    }

    setCropBox({ x: bx, y: by, width: bw, height: bh });
    setImgLoaded(true);
  };

  const handleRatioChange = (preset) => {
    setSelectedRatioId(preset.id);
    measureAndInit(preset.ratio);
  };

  const handleImageLoad = () => {
    measureAndInit();
  };

  // Re-measure on window resize or when image loads/changes
  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      measureAndInit();
    }
  }, [currentSrc, selectedRatioId]);

  useEffect(() => {
    window.addEventListener('resize', () => measureAndInit());
    return () => window.removeEventListener('resize', () => measureAndInit());
  }, []);

  // Generate live banner preview when cropBox changes
  useEffect(() => {
    if (!imgLoaded || !imgRef.current || cropBox.width <= 0 || renderedRect.width <= 0) return;
    const timer = setTimeout(() => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = 600;
        canvas.height = Math.round(600 / cropRatio);
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const scaleX = imgNaturalSize.width / renderedRect.width;
        const scaleY = imgNaturalSize.height / renderedRect.height;
        const sx = Math.max(0, (cropBox.x - renderedRect.x) * scaleX);
        const sy = Math.max(0, (cropBox.y - renderedRect.y) * scaleY);
        const sw = Math.min(imgNaturalSize.width - sx, cropBox.width * scaleX);
        const sh = Math.min(imgNaturalSize.height - sy, cropBox.height * scaleY);

        ctx.drawImage(imgRef.current, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
        setPreviewUrl(canvas.toDataURL('image/jpeg', 0.88));
      } catch (err) {
        console.error('Preview crop error:', err);
      }
    }, 40);
    return () => clearTimeout(timer);
  }, [cropBox, imgLoaded, renderedRect, imgNaturalSize, currentSrc, cropRatio]);

  // Rotate 90 degrees clockwise using offscreen canvas
  const handleRotate = () => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const c = document.createElement('canvas');
      c.width = img.height;
      c.height = img.width;
      const ctx = c.getContext('2d');
      ctx.translate(c.width / 2, c.height / 2);
      ctx.rotate((90 * Math.PI) / 180);
      ctx.drawImage(img, -img.width / 2, -img.height / 2);
      setCurrentSrc(c.toDataURL('image/jpeg', 0.95));
      setImgLoaded(false);
    };
    img.src = currentSrc;
  };

  // Reset to default center position
  const handleReset = () => {
    measureAndInit();
  };

  // Start drag (move or corner resize)
  const handleStartDrag = (dragType, e) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveDrag(dragType);
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    setDragStart({
      mouseX: clientX,
      mouseY: clientY,
      boxX: cropBox.x,
      boxY: cropBox.y,
      boxW: cropBox.width,
      boxH: cropBox.height
    });
  };

  // Global mouse/touch move listener for smooth drag & resize
  useEffect(() => {
    if (!activeDrag) return;

    const handleMouseMove = (e) => {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const dx = clientX - dragStart.mouseX;
      const dy = clientY - dragStart.mouseY;

      const imgX = renderedRect.x;
      const imgY = renderedRect.y;
      const imgW = renderedRect.width;
      const imgH = renderedRect.height;
      const minW = 120;

      if (activeDrag === 'move') {
        const minX = imgX;
        const maxX = Math.max(minX, imgX + imgW - dragStart.boxW);
        const minY = imgY;
        const maxY = Math.max(minY, imgY + imgH - dragStart.boxH);

        const newX = Math.max(minX, Math.min(maxX, dragStart.boxX + dx));
        const newY = Math.max(minY, Math.min(maxY, dragStart.boxY + dy));
        setCropBox(prev => ({ ...prev, x: newX, y: newY }));
      } else if (activeDrag === 'br') {
        const anchorX = dragStart.boxX;
        const anchorY = dragStart.boxY;
        const maxW = Math.min(imgX + imgW - anchorX, (imgY + imgH - anchorY) * cropRatio);
        const clampedW = Math.max(minW, Math.min(maxW, dragStart.boxW + dx));
        const clampedH = clampedW / cropRatio;
        setCropBox({ x: anchorX, y: anchorY, width: clampedW, height: clampedH });
      } else if (activeDrag === 'tl') {
        const anchorX = dragStart.boxX + dragStart.boxW;
        const anchorY = dragStart.boxY + dragStart.boxH;
        const maxW = Math.min(anchorX - imgX, (anchorY - imgY) * cropRatio);
        const clampedW = Math.max(minW, Math.min(maxW, dragStart.boxW - dx));
        const clampedH = clampedW / cropRatio;
        setCropBox({ x: anchorX - clampedW, y: anchorY - clampedH, width: clampedW, height: clampedH });
      } else if (activeDrag === 'tr') {
        const anchorX = dragStart.boxX;
        const anchorY = dragStart.boxY + dragStart.boxH;
        const maxW = Math.min(imgX + imgW - anchorX, (anchorY - imgY) * cropRatio);
        const clampedW = Math.max(minW, Math.min(maxW, dragStart.boxW + dx));
        const clampedH = clampedW / cropRatio;
        setCropBox({ x: anchorX, y: anchorY - clampedH, width: clampedW, height: clampedH });
      } else if (activeDrag === 'bl') {
        const anchorX = dragStart.boxX + dragStart.boxW;
        const anchorY = dragStart.boxY;
        const maxW = Math.min(anchorX - imgX, (imgY + imgH - anchorY) * cropRatio);
        const clampedW = Math.max(minW, Math.min(maxW, dragStart.boxW - dx));
        const clampedH = clampedW / cropRatio;
        setCropBox({ x: anchorX - clampedW, y: anchorY, width: clampedW, height: clampedH });
      }
    };

    const handleMouseUp = () => setActiveDrag(null);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleMouseMove);
    window.addEventListener('touchend', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleMouseMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [activeDrag, dragStart, renderedRect, cropRatio]);

  // Snap position helpers
  const snapTo = (pos) => {
    if (!renderedRect.height || !cropBox.height) return;
    const minY = renderedRect.y;
    const maxY = Math.max(minY, renderedRect.y + renderedRect.height - cropBox.height);
    const minX = renderedRect.x;
    const maxX = Math.max(minX, renderedRect.x + renderedRect.width - cropBox.width);

    if (pos === 'top') setCropBox(c => ({ ...c, y: minY }));
    else if (pos === 'center') setCropBox(c => ({ ...c, y: minY + (maxY - minY) / 2, x: minX + (maxX - minX) / 2 }));
    else if (pos === 'bottom') setCropBox(c => ({ ...c, y: maxY }));
    else if (pos === 'left') setCropBox(c => ({ ...c, x: minX }));
    else if (pos === 'right') setCropBox(c => ({ ...c, x: maxX }));
  };

  // Final apply: Crop to standardized high-res canvas (1200 x height)
  const handleApply = () => {
    if (!imgRef.current || cropBox.width <= 0 || renderedRect.width <= 0) {
      onApply(currentSrc);
      return;
    }
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 1200;
      canvas.height = Math.round(1200 / cropRatio);
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        onApply(currentSrc);
        return;
      }

      const scaleX = imgNaturalSize.width / renderedRect.width;
      const scaleY = imgNaturalSize.height / renderedRect.height;
      const sx = Math.max(0, (cropBox.x - renderedRect.x) * scaleX);
      const sy = Math.max(0, (cropBox.y - renderedRect.y) * scaleY);
      const sw = Math.min(imgNaturalSize.width - sx, cropBox.width * scaleX);
      const sh = Math.min(imgNaturalSize.height - sy, cropBox.height * scaleY);

      ctx.drawImage(imgRef.current, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
      const finalCroppedUrl = canvas.toDataURL('image/jpeg', 0.95);
      onApply(finalCroppedUrl);
    } catch (err) {
      console.error('Final crop error:', err);
      onApply(currentSrc);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: 'calc(100vh - 80px)',
        height: 'calc(100vh - 80px)',
        background: '#FFFFFF',
        color: '#1E1B4B',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* 1. Top Header Bar with Standardized Aspect Ratio Selector */}
      <div
        style={{
          minHeight: 64,
          padding: '10px 24px',
          background: '#FFFFFF',
          borderBottom: '1px solid #E2E8F0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12,
          zIndex: 20
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <BackButton
            onClick={onCancel}
            title="Cancel and return"
          />
          <div>
            <div style={{ fontSize: 14.5, fontWeight: 700, color: '#0F172A' }}>
              {type === 'scheme' ? 'Standardize Scheme Banner' : 'Standardize Event Banner'}
            </div>
            <div style={{ fontSize: 11.5, color: '#64748B' }}>
              Optimized for KnotNex User App mobile screens
            </div>
          </div>
        </div>

        {/* Aspect Ratio Presets */}
        <div style={{ display: 'flex', alignItems: 'center', background: '#F1F5F9', padding: '3px', borderRadius: 10, gap: 4 }}>
          {RATIO_PRESETS.map((preset) => {
            const isActive = preset.id === selectedRatioId;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => handleRatioChange(preset)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '6px 12px',
                  borderRadius: 8,
                  border: 'none',
                  background: isActive ? '#6336EB' : 'transparent',
                  color: isActive ? '#FFFFFF' : '#475569',
                  fontSize: 12,
                  fontWeight: isActive ? 700 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
                title={preset.desc}
              >
                <span>{preset.label}</span>
                {isActive && (
                  <span style={{ fontSize: 10, opacity: 0.85, background: 'rgba(255,255,255,0.2)', padding: '1px 5px', borderRadius: 4 }}>
                    Active
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button
            type="button"
            onClick={() => setShowSafeZone(!showSafeZone)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              background: showSafeZone ? '#EEF2FF' : '#F8FAFC',
              border: showSafeZone ? '1.5px solid #6336EB' : '1.5px solid #CBD5E1',
              borderRadius: 10,
              padding: '7px 12px',
              color: showSafeZone ? '#6336EB' : '#475569',
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer'
            }}
            title="Toggle mobile safe area overlay"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/></svg>
            Safe Zone
          </button>

          <label
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              background: '#F8FAFC',
              border: '1.5px solid #CBD5E1',
              borderRadius: 10,
              padding: '7px 14px',
              color: '#334155',
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            Change Photo
            <input type="file" accept="image/*" onChange={onUploadNew} style={{ display: 'none' }} />
          </label>
        </div>
      </div>

      {/* 2. Main Workspace with Interactive Crop Frame & Mobile Safe Zone */}
      <div
        ref={containerRef}
        style={{
          flex: 1,
          position: 'relative',
          background: '#F8FAFC',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          userSelect: 'none'
        }}
      >
        <img
          ref={imgRef}
          src={currentSrc}
          alt="Source"
          onLoad={handleImageLoad}
          style={{
            maxWidth: 'calc(100% - 60px)',
            maxHeight: 'calc(100% - 60px)',
            objectFit: 'contain',
            display: 'block',
            pointerEvents: 'none',
            userSelect: 'none',
            filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.12))'
          }}
        />

        {/* WhatsApp-Style Crop Window */}
        {imgLoaded && cropBox.width > 0 && (
          <div
            onMouseDown={(e) => handleStartDrag('move', e)}
            onTouchStart={(e) => handleStartDrag('move', e)}
            style={{
              position: 'absolute',
              left: cropBox.x,
              top: cropBox.y,
              width: cropBox.width,
              height: cropBox.height,
              boxShadow: '0 0 0 9999px rgba(15, 23, 42, 0.62)',
              border: '2px solid #FFFFFF',
              outline: '2px solid #6336EB',
              cursor: activeDrag === 'move' ? 'grabbing' : 'grab',
              boxSizing: 'border-box',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10
            }}
          >
            {/* Rule of Thirds */}
            <div style={{ position: 'absolute', left: '33.33%', top: 0, bottom: 0, width: 1, background: 'rgba(255, 255, 255, 0.35)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', left: '66.66%', top: 0, bottom: 0, width: 1, background: 'rgba(255, 255, 255, 0.35)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', top: '33.33%', left: 0, right: 0, height: 1, background: 'rgba(255, 255, 255, 0.35)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', top: '66.66%', left: 0, right: 0, height: 1, background: 'rgba(255, 255, 255, 0.35)', pointerEvents: 'none' }} />

            {/* Mobile Title & Logo Safe Zone Frame */}
            {showSafeZone && (
              <div
                style={{
                  position: 'absolute',
                  inset: '12% 10%',
                  border: '1.5px dashed rgba(254, 240, 138, 0.85)',
                  borderRadius: 8,
                  pointerEvents: 'none',
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-end',
                  padding: '4px 6px'
                }}
              >
                <span style={{ fontSize: 10, fontWeight: 700, color: '#FEF08A', background: 'rgba(0,0,0,0.6)', padding: '2px 6px', borderRadius: 4, letterSpacing: '0.03em' }}>
                  Title Safe Zone
                </span>
              </div>
            )}

            {/* Corner Bracket Handles */}
            <div
              onMouseDown={(e) => handleStartDrag('tl', e)}
              onTouchStart={(e) => handleStartDrag('tl', e)}
              title="Drag corner to resize"
              style={{ position: 'absolute', top: -5, left: -5, width: 28, height: 28, cursor: 'nwse-resize', zIndex: 15, display: 'flex' }}
            >
              <div style={{ width: 18, height: 18, borderTop: '4px solid #FFFFFF', borderLeft: '4px solid #FFFFFF', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.6))' }} />
            </div>

            <div
              onMouseDown={(e) => handleStartDrag('tr', e)}
              onTouchStart={(e) => handleStartDrag('tr', e)}
              title="Drag corner to resize"
              style={{ position: 'absolute', top: -5, right: -5, width: 28, height: 28, cursor: 'nesw-resize', zIndex: 15, display: 'flex', justifyContent: 'flex-end' }}
            >
              <div style={{ width: 18, height: 18, borderTop: '4px solid #FFFFFF', borderRight: '4px solid #FFFFFF', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.6))' }} />
            </div>

            <div
              onMouseDown={(e) => handleStartDrag('bl', e)}
              onTouchStart={(e) => handleStartDrag('bl', e)}
              title="Drag corner to resize"
              style={{ position: 'absolute', bottom: -5, left: -5, width: 28, height: 28, cursor: 'nesw-resize', zIndex: 15, display: 'flex', alignItems: 'flex-end' }}
            >
              <div style={{ width: 18, height: 18, borderBottom: '4px solid #FFFFFF', borderLeft: '4px solid #FFFFFF', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.6))' }} />
            </div>

            <div
              onMouseDown={(e) => handleStartDrag('br', e)}
              onTouchStart={(e) => handleStartDrag('br', e)}
              title="Drag corner to resize"
              style={{ position: 'absolute', bottom: -5, right: -5, width: 28, height: 28, cursor: 'nwse-resize', zIndex: 15, display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}
            >
              <div style={{ width: 18, height: 18, borderBottom: '4px solid #FFFFFF', borderRight: '4px solid #FFFFFF', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.6))' }} />
            </div>

            {/* Center Status Pill */}
            <div
              style={{
                background: 'rgba(15, 23, 42, 0.88)',
                backdropFilter: 'blur(8px)',
                color: '#FFF',
                padding: '6px 14px',
                borderRadius: 20,
                fontSize: 11.5,
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 7,
                boxShadow: '0 4px 14px rgba(0,0,0,0.4)',
                pointerEvents: 'none',
                userSelect: 'none'
              }}
            >
              <span>{activeDrag === 'move' ? 'Moving portion...' : (activeDrag ? 'Resizing frame...' : `${currentRatioObj.label} (${Math.round(cropBox.width)}×${Math.round(cropBox.height)})`)}</span>
            </div>
          </div>
        )}

        {/* Floating Quick Controls Bar */}
        <div
          style={{
            position: 'absolute',
            bottom: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#FFFFFF',
            border: '1.5px solid #E2E8F0',
            borderRadius: 16,
            padding: '8px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            zIndex: 30,
            boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}
        >
          {/* Rotate 90 deg */}
          <button
            type="button"
            onClick={handleRotate}
            title="Rotate 90 degrees clockwise"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              background: '#F8FAFC',
              border: '1px solid #CBD5E1',
              borderRadius: 8,
              padding: '6px 12px',
              color: '#1E1B4B',
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg>
            Rotate 90°
          </button>

          <div style={{ width: 1, height: 18, background: '#CBD5E1' }} />

          {/* Quick Snaps */}
          {[
            { label: 'Top', key: 'top', show: (renderedRect.height - cropBox.height > 6) },
            { label: 'Center', key: 'center', show: true },
            { label: 'Bottom', key: 'bottom', show: (renderedRect.height - cropBox.height > 6) },
            { label: 'Left', key: 'left', show: (renderedRect.width - cropBox.width > 6) },
            { label: 'Right', key: 'right', show: (renderedRect.width - cropBox.width > 6) }
          ].filter(b => b.show).map(b => (
            <button
              key={b.key}
              type="button"
              onClick={() => snapTo(b.key)}
              style={{
                background: '#F8FAFC',
                border: '1px solid #CBD5E1',
                borderRadius: 8,
                padding: '6px 12px',
                color: '#334155',
                fontSize: 12,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {b.label}
            </button>
          ))}

          <div style={{ width: 1, height: 18, background: '#CBD5E1' }} />

          {/* Reset */}
          <button
            type="button"
            onClick={handleReset}
            title="Reset crop selection to center"
            style={{
              background: 'transparent',
              border: 'none',
              color: '#64748B',
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
              padding: '6px 8px'
            }}
          >
            Reset
          </button>

          {/* Live Mobile Card Preview Toggle */}
          <button
            type="button"
            onClick={() => setShowLivePreview(!showLivePreview)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              background: showLivePreview ? '#6336EB' : '#F8FAFC',
              border: showLivePreview ? '1px solid #6336EB' : '1px solid #CBD5E1',
              borderRadius: 8,
              padding: '6px 12px',
              color: showLivePreview ? '#FFF' : '#334155',
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
            {showLivePreview ? 'Hide Mobile Card' : 'KnotNex Mobile Card Preview'}
          </button>
        </div>

        {/* Floating Live KnotNex Mobile Card Preview Flyout */}
        {showLivePreview && previewUrl && (
          <div
            style={{
              position: 'absolute',
              top: 20,
              right: 24,
              width: 330,
              background: '#FFFFFF',
              border: '1.5px solid #E2E8F0',
              borderRadius: 20,
              padding: 16,
              boxShadow: '0 16px 40px rgba(0,0,0,0.16)',
              zIndex: 40,
              animation: 'fadeIn 0.2s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981' }} />
                <span style={{ fontSize: 12, fontWeight: 700, color: '#6336EB', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  KnotNex User App Preview
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowLivePreview(false)}
                style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', fontSize: 14 }}
              >
                ✕
              </button>
            </div>

            {/* Exactly replicates Flutter User App Card */}
            {type === 'scheme' ? (
              // Mobile Scheme Card: 304 x 171 (16:9)
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '16 / 9',
                  borderRadius: 16,
                  overflow: 'hidden',
                  background: '#0F172A',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.08)'
                }}
              >
                <img src={previewUrl} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                {/* 108px dark gradient scrim */}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 65%)' }} />
                {/* Top-left badge */}
                <div
                  style={{
                    position: 'absolute',
                    top: 12,
                    left: 12,
                    background: '#16A34A',
                    color: '#FFF',
                    fontSize: 10,
                    fontWeight: 700,
                    padding: '3px 8px',
                    borderRadius: 6,
                    textTransform: 'uppercase'
                  }}
                >
                  {category || 'ELIGIBLE'}
                </div>
                {/* Bottom title & benefit info */}
                <div style={{ position: 'absolute', bottom: 10, left: 12, right: 12 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#FFF', lineHeight: 1.25, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {initialEventName || 'Your Scheme Title'}
                  </div>
                  <div style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.75)', marginTop: 2 }}>
                    Ministry of Development • Direct Benefit
                  </div>
                </div>
              </div>
            ) : (
              // Mobile Event Card: 304 x 142 (2.14:1)
              <div>
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '304 / 142',
                    borderRadius: 16,
                    overflow: 'hidden',
                    background: '#0F172A',
                    border: '1px solid #E2E8F0',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.08)'
                  }}
                >
                  <img src={previewUrl} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  {/* Top-left Free Pass / Price Badge */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 10,
                      left: 10,
                      height: 20,
                      padding: '0 8px',
                      background: 'rgba(12, 6, 20, 0.55)',
                      borderRadius: 10,
                      display: 'flex',
                      alignItems: 'center',
                      color: '#FEFEFE',
                      fontSize: 9.5,
                      fontWeight: 700,
                      letterSpacing: '0.03em'
                    }}
                  >
                    {ticketPrice && ticketPrice.trim() ? ticketPrice : 'FREE PASS'}
                  </div>

                  {/* Top-right bookmark button */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 10,
                      right: 10,
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      background: 'rgba(12, 6, 20, 0.45)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FFF'
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
                  </div>
                </div>

                {/* Event Name Below Card (Matches knotnex_hub_screen.dart) */}
                <div style={{ marginTop: 8, padding: '0 2px' }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A', lineHeight: 1.25, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {initialEventName || 'Your Event Name'}
                  </div>
                  <div style={{ fontSize: 11, color: '#64748B', marginTop: 2 }}>
                    Sun, Nov 15 • 10:00 AM • Main Auditorium
                  </div>
                </div>
              </div>
            )}

            <div style={{ marginTop: 10, fontSize: 10.5, color: '#94A3B8', textAlign: 'center' }}>
              ✓ 100% matched to KnotNex User App mobile rendering
            </div>
          </div>
        )}
      </div>

      {/* 3. Bottom Action Bar */}
      <div
        style={{
          height: 60,
          padding: '0 24px',
          background: '#FFFFFF',
          borderTop: '1px solid #E2E8F0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 20
        }}
      >
        <button
          type="button"
          onClick={onCancel}
          style={{
            background: 'none',
            border: 'none',
            color: '#64748B',
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={handleApply}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: 'linear-gradient(135deg, #6336EB, #4D25C9)',
            border: 'none',
            borderRadius: 10,
            padding: '9px 24px',
            color: '#FFF',
            fontSize: 13,
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(99, 54, 235, 0.35)'
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          Done &amp; Set as Cover
        </button>
      </div>
    </div>
  );
}
