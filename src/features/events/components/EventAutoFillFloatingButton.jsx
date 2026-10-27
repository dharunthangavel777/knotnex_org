import React, { useState, useRef, useEffect } from 'react';
import { EVENT_PRESETS, getNextPreset } from '../data/testEventPresets';

export default function EventAutoFillFloatingButton({
  onApplyPreset,
  onClearForm,
  currentPresetId,
  className = ''
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [justFilled, setJustFilled] = useState(false);
  const [filledName, setFilledName] = useState('');
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleQuickFill = (e) => {
    e.stopPropagation();
    const nextPreset = getNextPreset(currentPresetId);
    if (onApplyPreset) {
      onApplyPreset(nextPreset);
    }
    setFilledName(nextPreset.name);
    setJustFilled(true);
    setTimeout(() => {
      setJustFilled(false);
    }, 2400);
  };

  const handleSelectPreset = (preset) => {
    if (onApplyPreset) {
      onApplyPreset(preset);
    }
    setFilledName(preset.name);
    setJustFilled(true);
    setIsOpen(false);
    setTimeout(() => {
      setJustFilled(false);
    }, 2400);
  };

  const handleClear = () => {
    if (onClearForm) {
      onClearForm();
    }
    setIsOpen(false);
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '84px',
        right: '32px',
        zIndex: 9999,
        fontFamily: "'Google Sans', -apple-system, BlinkMacSystemFont, sans-serif"
      }}
      className={`event-autofill-fab-container ${className}`}
    >
      {/* Preset Picker Popover Menu */}
      {isOpen && (
        <div
          ref={menuRef}
          style={{
            position: 'absolute',
            bottom: 'calc(100% + 14px)',
            right: 0,
            width: '360px',
            maxWidth: 'calc(100vw - 48px)',
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1.5px solid #EDE9FE',
            borderRadius: '20px',
            boxShadow: '0 20px 48px -8px rgba(99, 54, 235, 0.22), 0 8px 24px rgba(0, 0, 0, 0.08)',
            padding: '16px',
            boxSizing: 'border-box',
            animation: 'knotnexSlideUp 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
            transformOrigin: 'bottom right'
          }}
        >
          {/* Menu Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: '12px',
              borderBottom: '1px solid #F1F5F9',
              marginBottom: '10px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 8,
                  background: 'linear-gradient(135deg, #6336EB, #8B5CF6)',
                  color: '#FFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 14,
                  boxShadow: '0 2px 8px rgba(99, 54, 235, 0.25)'
                }}
              >
                ⚡
              </div>
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 700, color: '#1E1B4B' }}>
                  Quick Test Event Presets
                </div>
                <div style={{ fontSize: 11, color: '#64748B' }}>
                  Click to fill all form fields instantly
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#94A3B8',
                cursor: 'pointer',
                padding: '4px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'color 0.15s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#1E1B4B')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#94A3B8')}
              title="Close"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Presets List */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              maxHeight: '340px',
              overflowY: 'auto',
              paddingRight: '2px'
            }}
          >
            {EVENT_PRESETS.map((preset) => {
              const isCurrent = currentPresetId === preset.id;
              return (
                <div
                  key={preset.id}
                  onClick={() => handleSelectPreset(preset)}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 12,
                    padding: '10px 12px',
                    borderRadius: '12px',
                    border: isCurrent ? '1.5px solid #6336EB' : '1px solid #E2E8F0',
                    background: isCurrent ? '#F5F3FF' : '#FFFFFF',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (!isCurrent) {
                      e.currentTarget.style.background = '#F8FAFC';
                      e.currentTarget.style.borderColor = '#CBD5E1';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isCurrent) {
                      e.currentTarget.style.background = '#FFFFFF';
                      e.currentTarget.style.borderColor = '#E2E8F0';
                    }
                  }}
                >
                  <span style={{ fontSize: 20, lineHeight: 1, marginTop: 2 }}>{preset.icon}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 6,
                        marginBottom: 3
                      }}
                    >
                      <span
                        style={{
                          fontSize: 12.5,
                          fontWeight: 700,
                          color: '#1E1B4B',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        {preset.name}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                      <span
                        style={{
                          fontSize: 10.5,
                          fontWeight: 700,
                          color: '#6336EB',
                          background: 'rgba(99, 54, 235, 0.08)',
                          padding: '1px 6px',
                          borderRadius: 4
                        }}
                      >
                        {preset.category}
                      </span>
                      <span style={{ fontSize: 11, color: '#64748B' }}>•</span>
                      <span style={{ fontSize: 11, color: '#64748B' }}>{preset.ticketPrice}</span>
                      <span style={{ fontSize: 11, color: '#64748B' }}>•</span>
                      <span style={{ fontSize: 11, color: '#64748B' }}>{preset.capacity} seats</span>
                      <span style={{ fontSize: 11, color: '#64748B' }}>•</span>
                      <span style={{ fontSize: 11, color: '#64748B' }}>{preset.sessions.length} sessions</span>
                    </div>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 26,
                      height: 26,
                      borderRadius: 6,
                      background: isCurrent ? '#6336EB' : '#F1F5F9',
                      color: isCurrent ? '#FFF' : '#6336EB',
                      fontSize: 11,
                      fontWeight: 700,
                      flexShrink: 0,
                      marginTop: 2
                    }}
                    title="Fill this preset"
                  >
                    {isCurrent ? '✓' : 'Fill'}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Menu Footer with Clear Action */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '12px',
              borderTop: '1px solid #F1F5F9',
              marginTop: '10px'
            }}
          >
            <button
              type="button"
              onClick={handleClear}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
                background: 'transparent',
                border: 'none',
                color: '#EF4444',
                fontSize: 11.5,
                fontWeight: 600,
                cursor: 'pointer',
                padding: '4px 8px',
                borderRadius: '6px',
                transition: 'background 0.15s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#FEF2F2')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
              Clear Form
            </button>

            <span style={{ fontSize: 10.5, color: '#94A3B8' }}>
              Autofills all 3 creation steps
            </span>
          </div>
        </div>
      )}

      {/* Floating Action Button (FAB) */}
      <div
        ref={buttonRef}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          borderRadius: 9999,
          background: justFilled
            ? 'linear-gradient(135deg, #10B981, #059669)'
            : 'linear-gradient(135deg, #6336EB 0%, #7C3AED 50%, #4F46E5 100%)',
          color: '#FFFFFF',
          padding: '4px 6px 4px 6px',
          boxShadow: justFilled
            ? '0 12px 28px -4px rgba(16, 185, 129, 0.5), 0 4px 12px rgba(0, 0, 0, 0.12)'
            : '0 10px 28px -4px rgba(99, 54, 235, 0.45), 0 4px 12px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.28)',
          border: '1.5px solid rgba(255, 255, 255, 0.25)',
          transition: 'all 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
          cursor: 'pointer',
          userSelect: 'none'
        }}
      >
        {/* Main Autofill Click Target */}
        <button
          type="button"
          onClick={handleQuickFill}
          title={justFilled ? 'Form populated!' : 'Click to auto-fill test event data (or click arrow for presets)'}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: 'transparent',
            border: 'none',
            color: '#FFFFFF',
            padding: '7px 14px 7px 10px',
            borderRadius: 9999,
            cursor: 'pointer',
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: '-0.01em',
            transition: 'opacity 0.15s ease'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.94')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
        >
          {/* Animated Magic Icon */}
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 24,
              height: 24,
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.2)',
              fontSize: 13,
              lineHeight: 1
            }}
          >
            {justFilled ? '✓' : '✨'}
          </span>

          <span>{justFilled ? 'Test Data Filled!' : 'Auto Fill Test Event'}</span>
        </button>

        {/* Separator Line */}
        <div
          style={{
            width: '1px',
            height: '20px',
            background: 'rgba(255, 255, 255, 0.25)',
            margin: '0 2px'
          }}
        />

        {/* Preset Picker Dropdown Toggle Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
          title="Choose a specific event preset"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 28,
            height: 28,
            borderRadius: '50%',
            background: isOpen ? 'rgba(255, 255, 255, 0.25)' : 'transparent',
            border: 'none',
            color: '#FFFFFF',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
            padding: 0
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)')}
          onMouseLeave={(e) => {
            if (!isOpen) e.currentTarget.style.background = 'transparent';
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            style={{
              transform: isOpen ? 'rotate(180deg)' : 'none',
              transition: 'transform 0.2s ease'
            }}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </div>

      <style>{`
        @keyframes knotnexSlideUp {
          from {
            opacity: 0;
            transform: translateY(8px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}
