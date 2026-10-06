import React from 'react';
import { useApp } from '../../context/AppContext';

export default function GlobalLoadingBar() {
  const { isLoading } = useApp();

  return (
    <div
      className={`app-global-loading-bar ${isLoading ? 'active' : ''}`}
      id="appGlobalLoadingBar"
      aria-hidden="true"
      style={{
        display: isLoading ? 'block' : 'none',
        position: 'fixed',
        top: 0,
        left: 0,
        height: '3px',
        width: '100%',
        background: 'linear-gradient(90deg, #6336EB 0%, #8B5CF6 50%, #EC4899 100%)',
        zIndex: 9999,
        transition: 'width 0.3s ease'
      }}
    />
  );
}
