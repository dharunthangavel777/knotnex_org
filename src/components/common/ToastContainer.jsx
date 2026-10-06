import React from 'react';
import { useApp } from '../../context/AppContext';

export default function ToastContainer() {
  const { toasts, removeToast } = useApp();

  if (!toasts.length) return <div className="toast-container" id="toastContainer" />;

  return (
    <div className="toast-container" id="toastContainer" style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 99999, display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`toast-notification toast-${toast.type || 'info'}`}
          style={{
            background: '#111827',
            color: '#FFFFFF',
            padding: '12px 18px',
            borderRadius: '12px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '13.5px',
            fontWeight: 500,
            animation: 'slideUp 0.25s ease'
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '18px', color: toast.type === 'success' ? '#12B76A' : '#A78BFA' }}>
            {toast.type === 'success' ? 'check_circle' : 'info'}
          </span>
          <span style={{ flex: 1 }}>{toast.message}</span>
          <button
            onClick={() => removeToast(toast.id)}
            style={{
              background: 'none',
              border: 'none',
              color: 'rgba(255, 255, 255, 0.6)',
              cursor: 'pointer',
              fontSize: '16px',
              padding: '0 4px'
            }}
          >
            &times;
          </button>
        </div>
      ))}
    </div>
  );
}
