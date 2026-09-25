import React from 'react';
import {
  Calendar,
  Briefcase,
  Landmark,
  Plus,
  Radio,
  Video,
  Code2,
  GraduationCap,
  HeartHandshake,
  Coins,
  Sprout,
  Building
} from 'lucide-react';
import type { ActivityType } from '../types';

interface QuickActionsProps {
  onTriggerAction: (type: ActivityType, subtype?: string) => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ onTriggerAction }) => {
  return (
    <section className="quick-actions-section">
      {/* Header Row */}
      <div className="section-header-row">
        <h3 className="section-title">Quick Actions</h3>
        <span className="section-subtitle">Fast-track publishing shortcuts</span>
      </div>

      {/* 3 Action Cards Grid */}
      <div className="quick-actions-grid">
        {/* Card 1: Create Event */}
        <div className="action-card">
          <div className="card-top-row">
            <div className="card-icon-bubble event-bubble">
              <Calendar size={20} className="card-icon event-icon" />
            </div>
            <div className="card-header-text">
              <h4 className="card-title">Create Event</h4>
              <p className="card-desc">Conferences, stages & ticketing</p>
            </div>
          </div>

          <div className="card-tags-row">
            <button
              className="tag-pill"
              onClick={() => onTriggerAction('Event', 'In-Person')}
              title="Create In-Person Event"
            >
              <Radio size={12} className="tag-icon" />
              <span>In-Person</span>
            </button>
            <button
              className="tag-pill"
              onClick={() => onTriggerAction('Event', 'Virtual')}
              title="Create Virtual Conference"
            >
              <Video size={12} className="tag-icon" />
              <span>Virtual</span>
            </button>
            <button
              className="tag-pill"
              onClick={() => onTriggerAction('Event', 'Hackathon')}
              title="Create Hackathon"
            >
              <Code2 size={12} className="tag-icon" />
              <span>Hackathon</span>
            </button>
          </div>

          <div className="card-bottom-action">
            <button
              className="card-action-btn"
              onClick={() => onTriggerAction('Event')}
            >
              <span>Launch</span>
              <Plus size={14} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* Card 2: Post Opportunity */}
        <div className="action-card">
          <div className="card-top-row">
            <div className="card-icon-bubble job-bubble">
              <Briefcase size={20} className="card-icon job-icon" />
            </div>
            <div className="card-header-text">
              <h4 className="card-title">Post Opportunity</h4>
              <p className="card-desc">Jobs, fellowships & pipeline</p>
            </div>
          </div>

          <div className="card-tags-row">
            <button
              className="tag-pill"
              onClick={() => onTriggerAction('Job', 'Full-time')}
              title="Post Full-time Role"
            >
              <Building size={12} className="tag-icon" />
              <span>Full-time</span>
            </button>
            <button
              className="tag-pill"
              onClick={() => onTriggerAction('Job', 'Fellowship')}
              title="Post Fellowship"
            >
              <GraduationCap size={12} className="tag-icon" />
              <span>Fellowship</span>
            </button>
            <button
              className="tag-pill"
              onClick={() => onTriggerAction('Job', 'Volunteer')}
              title="Post Volunteer Role"
            >
              <HeartHandshake size={12} className="tag-icon" />
              <span>Volunteer</span>
            </button>
          </div>

          <div className="card-bottom-action">
            <button
              className="card-action-btn"
              onClick={() => onTriggerAction('Job')}
            >
              <span>Post Role</span>
              <Plus size={14} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* Card 3: Post Scheme */}
        <div className="action-card">
          <div className="card-top-row">
            <div className="card-icon-bubble scheme-bubble">
              <Landmark size={20} className="card-icon scheme-icon" />
            </div>
            <div className="card-header-text">
              <h4 className="card-title">Post Scheme</h4>
              <p className="card-desc">Grants, subsidies & seed awards</p>
            </div>
          </div>

          <div className="card-tags-row">
            <button
              className="tag-pill"
              onClick={() => onTriggerAction('Scheme', 'Grant')}
              title="Post Grant Scheme"
            >
              <Landmark size={12} className="tag-icon" />
              <span>Grant</span>
            </button>
            <button
              className="tag-pill"
              onClick={() => onTriggerAction('Scheme', 'Subsidy')}
              title="Post Subsidy Scheme"
            >
              <Coins size={12} className="tag-icon" />
              <span>Subsidy</span>
            </button>
            <button
              className="tag-pill"
              onClick={() => onTriggerAction('Scheme', 'Seed Fund')}
              title="Post Seed Fund"
            >
              <Sprout size={12} className="tag-icon" />
              <span>Seed Fund</span>
            </button>
          </div>

          <div className="card-bottom-action">
            <button
              className="card-action-btn"
              onClick={() => onTriggerAction('Scheme')}
            >
              <span>Post</span>
              <Plus size={14} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
