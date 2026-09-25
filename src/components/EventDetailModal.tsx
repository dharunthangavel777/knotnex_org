import React from 'react';
import {
  X,
  Calendar,
  MapPin,
  User,
  CheckCircle2,
  Users,
  Ticket,
  Check,
  Ban,
  Upload,
} from 'lucide-react';
import type { EventItem, EventStatus } from '../types';

interface EventDetailModalProps {
  event: EventItem | null;
  onClose: () => void;
  onStatusChange: (id: string, newStatus: EventStatus) => void;
}

export const EventDetailModal: React.FC<EventDetailModalProps> = ({
  event,
  onClose,
  onStatusChange,
}) => {
  if (!event) return null;

  return (
    <div className="modal-backdrop-overlay" onClick={onClose}>
      <div
        className="event-detail-modal-card animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="detail-modal-header">
          <div className="detail-header-tags">
            <span className="tag-pill event-id">{event.id}</span>
            <span className="tag-pill category">{event.category}</span>
            <span className="tag-pill on-ground">{event.format}</span>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="detail-modal-body">
          <h2 className="detail-event-title">{event.title}</h2>

          <div className="detail-meta-grid">
            <div className="detail-meta-item">
              <Calendar size={16} className="meta-icon" />
              <div>
                <div className="meta-label">Date & Time</div>
                <div className="meta-value">{event.fullDateTime}</div>
              </div>
            </div>

            <div className="detail-meta-item">
              <MapPin size={16} className="meta-icon" />
              <div>
                <div className="meta-label">Location / Platform</div>
                <div className="meta-value">{event.location || 'Online Virtual Stage'}</div>
              </div>
            </div>

            <div className="detail-meta-item">
              <User size={16} className="meta-icon" />
              <div>
                <div className="meta-label">Organizer</div>
                <div className="meta-value flex-align">
                  <span>{event.organizer.name}</span>
                  {event.organizer.isVerified && (
                    <CheckCircle2 size={13} className="verified-icon" />
                  )}
                </div>
              </div>
            </div>

            <div className="detail-meta-item">
              <Users size={16} className="meta-icon" />
              <div>
                <div className="meta-label">Attendance / Capacity</div>
                <div className="meta-value">
                  {event.metrics?.registered || 0} / {event.metrics?.capacity || 1000} ({Math.round(((event.metrics?.registered || 0) / (event.metrics?.capacity || 1000)) * 100)}% filled)
                </div>
              </div>
            </div>
          </div>

          <div className="detail-section-block">
            <h4 className="detail-section-heading">About this Event</h4>
            <p className="detail-desc-text">{event.description}</p>
          </div>

          {event.tickets && event.tickets.length > 0 && (
            <div className="detail-section-block">
              <h4 className="detail-section-heading">Ticket Tiers & Pricing</h4>
              <div className="tickets-list">
                {event.tickets.map((t, idx) => (
                  <div key={idx} className="ticket-tier-row">
                    <div className="ticket-info">
                      <Ticket size={16} className="ticket-icon" />
                      <div>
                        <div className="ticket-name">{t.name}</div>
                        <div className="ticket-sales">{t.sold} / {t.total} Sold</div>
                      </div>
                    </div>
                    <div className="ticket-price">
                      {t.price === 0 ? 'Free' : `₹${t.price}`}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer with Actions */}
        <div className="detail-modal-footer">
          <div className="footer-status-indicator">
            <span className="current-status-label">Status:</span>
            <span className={`status-pill ${event.status.toLowerCase().replace(' ', '-')}`}>
              {event.status}
            </span>
          </div>

          <div className="footer-action-buttons">
            {event.status === 'Pending Approval' && (
              <>
                <button
                  className="btn-action-reject"
                  onClick={() => {
                    onStatusChange(event.id, 'Cancelled');
                    onClose();
                  }}
                >
                  <Ban size={14} />
                  <span>Reject</span>
                </button>
                <button
                  className="btn-action-approve"
                  onClick={() => {
                    onStatusChange(event.id, 'Published');
                    onClose();
                  }}
                >
                  <Check size={14} />
                  <span>Approve & Publish</span>
                </button>
              </>
            )}

            {event.status === 'Published' && (
              <button
                className="btn-action-complete"
                onClick={() => {
                  onStatusChange(event.id, 'Completed');
                  onClose();
                }}
              >
                <Check size={14} />
                <span>Mark Completed</span>
              </button>
            )}

            {event.status === 'Cancelled' && (
              <button
                className="btn-action-approve"
                onClick={() => {
                  onStatusChange(event.id, 'Published');
                  onClose();
                }}
              >
                <Upload size={14} />
                <span>Re-Publish Event</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
