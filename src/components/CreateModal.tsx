import React, { useState } from 'react';
import { X, Calendar, Briefcase, Landmark, Plus } from 'lucide-react';
import type { ActivityItem, ActivityType, ActivityStatus } from '../types';

interface CreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultType?: ActivityType;
  defaultSubtype?: string;
  onSave: (newItem: Omit<ActivityItem, 'id' | 'orderNumber'>) => void;
}

export const CreateModal: React.FC<CreateModalProps> = ({
  isOpen,
  onClose,
  defaultType = 'Event',
  defaultSubtype = '',
  onSave,
}) => {
  const [type, setType] = useState<ActivityType>(defaultType);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState(
    defaultSubtype ? `${defaultSubtype} Edition` : ''
  );
  const [category, setCategory] = useState(defaultSubtype || 'Technology');
  const [metric, setMetric] = useState('');
  const [datePosted, setDatePosted] = useState('Oct 2026');
  const [status, setStatus] = useState<ActivityStatus>('UPCOMING');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    let defaultMetric = metric;
    if (!defaultMetric) {
      if (type === 'Event') defaultMetric = '0 / 500 Attendees';
      else if (type === 'Job') defaultMetric = '0 Applicants • Just Posted';
      else defaultMetric = '$50,000 Fund • Accepting Applications';
    }

    onSave({
      title,
      subtitle: subtitle || 'Global Hub • Hybrid',
      category: category || 'General',
      type,
      metric: defaultMetric,
      datePosted: datePosted || 'Today',
      status,
      active: true,
      avatarGradient:
        type === 'Event'
          ? 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)'
          : type === 'Job'
          ? 'linear-gradient(135deg, #2563EB 0%, #60A5FA 100%)'
          : 'linear-gradient(135deg, #15803D 0%, #4ADE80 100%)',
      badgeIcon: type === 'Event' ? 'code' : type === 'Job' ? 'briefcase' : 'award',
    });

    onClose();
  };

  return (
    <div className="modal-backdrop animate-fade-in" onClick={onClose}>
      <div
        className="modal-content animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div className="modal-title-box">
            <div className="modal-icon-badge">
              {type === 'Event' && <Calendar size={18} />}
              {type === 'Job' && <Briefcase size={18} />}
              {type === 'Scheme' && <Landmark size={18} />}
            </div>
            <div>
              <h3 className="modal-title">Publish New {type}</h3>
              <p className="modal-subtitle">Add details to fast-track publishing</p>
            </div>
          </div>
          <button className="btn-close-modal" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Type Selector Tabs */}
        <div className="modal-type-tabs">
          <button
            type="button"
            className={`type-tab-btn ${type === 'Event' ? 'active event' : ''}`}
            onClick={() => setType('Event')}
          >
            <Calendar size={15} />
            <span>Event</span>
          </button>
          <button
            type="button"
            className={`type-tab-btn ${type === 'Job' ? 'active job' : ''}`}
            onClick={() => setType('Job')}
          >
            <Briefcase size={15} />
            <span>Opportunity</span>
          </button>
          <button
            type="button"
            className={`type-tab-btn ${type === 'Scheme' ? 'active scheme' : ''}`}
            onClick={() => setType('Scheme')}
          >
            <Landmark size={15} />
            <span>Scheme</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label className="form-label">
              {type === 'Event' ? 'Event Name' : type === 'Job' ? 'Role Title' : 'Scheme Title'} *
            </label>
            <input
              type="text"
              required
              placeholder={
                type === 'Event'
                  ? 'e.g., Global AI Dev Summit 2026'
                  : type === 'Job'
                  ? 'e.g., Senior Systems Engineer'
                  : 'e.g., CleanTech Innovation Grant 2026'
              }
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-input"
              autoFocus
            />
          </div>

          <div className="form-group">
            <label className="form-label">Location / Subtitle / Department</label>
            <input
              type="text"
              placeholder="e.g., Moscone Center, SF & Virtual • Innovation Labs"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label className="form-label">Category / Domain</label>
              <input
                type="text"
                placeholder="e.g., Artificial Intelligence, MedTech"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Initial Metric / Target</label>
              <input
                type="text"
                placeholder={
                  type === 'Event'
                    ? 'e.g., 0 / 500 Attendees'
                    : type === 'Job'
                    ? 'e.g., 0 Applicants'
                    : 'e.g., $100,000 Pool'
                }
                value={metric}
                onChange={(e) => setMetric(e.target.value)}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label className="form-label">Date / Schedule</label>
              <input
                type="text"
                placeholder="e.g., Nov 10-12, 2026"
                value={datePosted}
                onChange={(e) => setDatePosted(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Initial Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as ActivityStatus)}
                className="form-select"
              >
                <option value="UPCOMING">UPCOMING</option>
                <option value="ONGOING">ONGOING</option>
                <option value="REVIEWING">REVIEWING</option>
                <option value="CLOSED">CLOSED</option>
              </select>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-submit-primary">
              <Plus size={16} />
              <span>Publish Now</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
