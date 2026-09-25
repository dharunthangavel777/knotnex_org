import React from 'react';
import { Briefcase, Landmark, Users, FileText, Wrench, ArrowLeft } from 'lucide-react';
import type { SidebarSection } from '../types';

interface OtherViewsProps {
  section: SidebarSection;
  onBackToEvents: () => void;
}

export const OtherViews: React.FC<OtherViewsProps> = ({ section, onBackToEvents }) => {
  const getSectionDetails = () => {
    switch (section) {
      case 'career':
        return {
          title: 'Career & Opportunities Management',
          icon: <Briefcase size={28} className="view-header-icon" />,
          desc: 'Review, manage, and approve active job postings, fellowships, and internships across verified organizations.',
          count: '18 Active Openings',
        };
      case 'sheem-hub':
        return {
          title: 'Sheem Hub (Grants & Subsidies)',
          icon: <Landmark size={28} className="view-header-icon" />,
          desc: 'Monitor institutional grants, government incentives, and startup seed funding applications.',
          count: '12 Active Schemes',
        };
      case 'account-management':
        return {
          title: 'Account Management',
          icon: <Users size={28} className="view-header-icon" />,
          desc: 'Supervise verified organization profiles, tier permissions, team delegates, and identity compliance.',
          count: '142 Organizations',
        };
      case 'feed-moderation':
        return {
          title: 'Feed & Content Moderation',
          icon: <FileText size={28} className="view-header-icon" />,
          desc: 'AI-assisted automated sentiment screening and community flag resolution for real-time posts.',
          count: '0 Pending Flags',
        };
      case 'diagnostics-tickets':
        return {
          title: 'Diagnostics & Support Tickets',
          icon: <Wrench size={28} className="view-header-icon" />,
          desc: 'Live telemetry diagnostics, webhook monitoring, and priority technical support tickets.',
          count: '1 Urgent Ticket',
        };
      default:
        return {
          title: 'Section Overview',
          icon: <Briefcase size={28} className="view-header-icon" />,
          desc: 'Platform administration view.',
          count: '',
        };
    }
  };

  const details = getSectionDetails();

  return (
    <div className="other-view-container animate-fade-in">
      <div className="view-header-nav">
        <button className="btn-back-link" onClick={onBackToEvents}>
          <ArrowLeft size={16} />
          <span>Back to Event Management</span>
        </button>
      </div>

      <div className="other-view-card">
        <div className="other-view-icon-bubble">{details.icon}</div>
        <h2 className="other-view-title">{details.title}</h2>
        <p className="other-view-desc">{details.desc}</p>
        <span className="other-view-badge">{details.count}</span>

        <div className="other-view-actions">
          <button className="btn-return-primary" onClick={onBackToEvents}>
            Go to Event Management
          </button>
        </div>
      </div>
    </div>
  );
};
