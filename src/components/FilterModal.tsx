import React from 'react';
import { X, Check } from 'lucide-react';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedFormat: string | null;
  onSelectFormat: (format: string | null) => void;
  onReset: () => void;
}

export const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  selectedFormat,
  onSelectFormat,
  onReset,
}) => {
  if (!isOpen) return null;

  const formats = ['On-Ground', 'Online', 'Hybrid'];

  return (
    <div className="modal-backdrop-overlay" onClick={onClose}>
      <div
        className="filter-modal-card animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header-row">
          <h3 className="modal-title">Filter Events</h3>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body-content">
          <div className="filter-group-block">
            <label className="filter-group-title">Event Format</label>
            <div className="filter-options-grid">
              <button
                className={`filter-opt-btn ${selectedFormat === null ? 'active' : ''}`}
                onClick={() => onSelectFormat(null)}
              >
                <span>All Formats</span>
                {selectedFormat === null && <Check size={14} />}
              </button>
              {formats.map((fmt) => (
                <button
                  key={fmt}
                  className={`filter-opt-btn ${selectedFormat === fmt ? 'active' : ''}`}
                  onClick={() => onSelectFormat(fmt)}
                >
                  <span>{fmt}</span>
                  {selectedFormat === fmt && <Check size={14} />}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="modal-footer-row">
          <button className="btn-modal-ghost" onClick={onReset}>
            Reset All
          </button>
          <button className="btn-modal-primary" onClick={onClose}>
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};
