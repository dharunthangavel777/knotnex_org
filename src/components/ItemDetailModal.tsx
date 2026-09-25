import React from 'react';
import {
  X,
  Calendar,
  Briefcase,
  Landmark,
  Share2,
  ExternalLink
} from 'lucide-react';
import type { ActivityItem } from '../types';

interface ItemDetailModalProps {
  item: ActivityItem | null;
  onClose: () => void;
  onToggleActive: (id: string) => void;
  onDelete?: (id: string) => void;
}

export const ItemDetailModal: React.FC<ItemDetailModalProps> = ({
  item,
  onClose,
  onToggleActive,
}) => {
  if (!item) return null;

  return (
    <div className="modal-backdrop animate-fade-in" onClick={onClose}>
      <div
        className="modal-content animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div className="modal-title-box">
            <div
              className="modal-icon-badge"
              style={{ background: item.avatarGradient || '#6838F5', color: 'white' }}
            >
              {item.type === 'Event' && <Calendar size={18} />}
              {item.type === 'Job' && <Briefcase size={18} />}
              {item.type === 'Scheme' && <Landmark size={18} />}
            </div>
            <div>
              <h3 className="modal-title">{item.title}</h3>
              <p className="modal-subtitle">{item.subtitle}</p>
            </div>
          </div>
          <button className="btn-close-modal" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="detail-modal-body">
          <div className="detail-metrics-grid">
            <div className="detail-metric-card">
              <span className="metric-card-label">Type</span>
              <span className="metric-card-val">{item.type}</span>
            </div>
            <div className="detail-metric-card">
              <span className="metric-card-label">Status</span>
              <span className="metric-card-val">{item.status}</span>
            </div>
            <div className="detail-metric-card">
              <span className="metric-card-label">Date Posted</span>
              <span className="metric-card-val">{item.datePosted}</span>
            </div>
            <div className="detail-metric-card">
              <span className="metric-card-label">Current Pipeline</span>
              <span className="metric-card-val">{item.metric}</span>
            </div>
          </div>

          <div className="detail-section">
            <h5 className="detail-section-heading">Operational Status</h5>
            <div className="status-toggle-row">
              <div className="status-toggle-info">
                <strong>{item.active ? 'Active & Live on Portal' : 'Paused / Inactive'}</strong>
                <p>Public submissions and registrations are {item.active ? 'open' : 'currently paused'}.</p>
              </div>
              <label className="toggle-switch-container">
                <input
                  type="checkbox"
                  checked={item.active}
                  onChange={() => onToggleActive(item.id)}
                  className="toggle-checkbox"
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>

          <div className="detail-actions-row">
            <button className="btn-secondary-action" onClick={onClose}>
              <Share2 size={15} />
              <span>Share Link</span>
            </button>
            <button className="btn-submit-primary" onClick={onClose}>
              <ExternalLink size={15} />
              <span>Open Management Hub</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
