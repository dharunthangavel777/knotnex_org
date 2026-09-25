import React, { useState, useMemo } from 'react';
import {
  Search,
  RotateCw,
  ChevronRight,
  Sparkles,
  Globe,
  Leaf,
  Code2,
  Bot,
  HeartPulse,
  Layout,
  Cpu,
  Terminal,
  Palette,
  Users,
  Cloud,
  TrendingUp,
  Database,
  ShieldCheck,
  Award,
  Zap,
  Gift,
  Sprout,
  Atom,
  ShieldAlert
} from 'lucide-react';
import type { ActivityItem, ActivityType, ActivityStatus } from '../types';

interface RecentActivitiesProps {
  activities: ActivityItem[];
  onToggleActive: (id: string) => void;
  onRefresh: () => void;
  isRefreshing: boolean;
  onSelectItem: (item: ActivityItem) => void;
}

export const RecentActivities: React.FC<RecentActivitiesProps> = ({
  activities,
  onToggleActive,
  onRefresh,
  isRefreshing,
  onSelectItem,
}) => {
  const [activeTab, setActiveTab] = useState<'ALL' | ActivityType>('ALL');
  const [tableSearch, setTableSearch] = useState('');
  const [expandedView, setExpandedView] = useState(false);

  // Filter calculations
  const totalCount = activities.length;
  const eventsCount = activities.filter((a) => a.type === 'Event').length;
  const jobsCount = activities.filter((a) => a.type === 'Job').length;
  const schemesCount = activities.filter((a) => a.type === 'Scheme').length;

  const filteredItems = useMemo(() => {
    return activities.filter((item) => {
      const matchesTab = activeTab === 'ALL' || item.type === activeTab;
      const matchesSearch =
        tableSearch.trim() === '' ||
        item.title.toLowerCase().includes(tableSearch.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(tableSearch.toLowerCase()) ||
        item.category.toLowerCase().includes(tableSearch.toLowerCase()) ||
        item.metric.toLowerCase().includes(tableSearch.toLowerCase());

      return matchesTab && matchesSearch;
    });
  }, [activities, activeTab, tableSearch]);

  const displayItems = expandedView ? filteredItems : filteredItems.slice(0, 8);

  const getStatusBadge = (status: ActivityStatus) => {
    switch (status) {
      case 'UPCOMING':
        return <span className="status-badge badge-upcoming">UPCOMING</span>;
      case 'ONGOING':
        return <span className="status-badge badge-ongoing">ONGOING</span>;
      case 'REVIEWING':
        return <span className="status-badge badge-reviewing">REVIEWING</span>;
      case 'CLOSED':
        return <span className="status-badge badge-closed">CLOSED</span>;
      default:
        return <span className="status-badge badge-draft">DRAFT</span>;
    }
  };

  const getTypeBadge = (type: ActivityType) => {
    switch (type) {
      case 'Event':
        return <span className="type-badge type-event">Event</span>;
      case 'Job':
        return <span className="type-badge type-job">Job</span>;
      case 'Scheme':
        return <span className="type-badge type-scheme">Scheme</span>;
    }
  };

  const getIconForBadge = (badgeName?: string) => {
    switch (badgeName) {
      case 'code': return <Code2 size={16} color="white" />;
      case 'leaf': return <Leaf size={16} color="white" />;
      case 'globe': return <Globe size={16} color="white" />;
      case 'bot': return <Bot size={16} color="white" />;
      case 'heart-pulse': return <HeartPulse size={16} color="white" />;
      case 'layout': return <Layout size={16} color="white" />;
      case 'cpu': return <Cpu size={16} color="white" />;
      case 'terminal': return <Terminal size={16} color="white" />;
      case 'palette': return <Palette size={16} color="white" />;
      case 'users': return <Users size={16} color="white" />;
      case 'cloud': return <Cloud size={16} color="white" />;
      case 'trending-up': return <TrendingUp size={16} color="white" />;
      case 'database': return <Database size={16} color="white" />;
      case 'shield-check': return <ShieldCheck size={16} color="white" />;
      case 'award': return <Award size={16} color="white" />;
      case 'zap': return <Zap size={16} color="white" />;
      case 'gift': return <Gift size={16} color="white" />;
      case 'sprout': return <Sprout size={16} color="white" />;
      case 'atom': return <Atom size={16} color="white" />;
      case 'shield-alert': return <ShieldAlert size={16} color="white" />;
      default: return <Sparkles size={16} color="white" />;
    }
  };

  return (
    <section className="activities-section">
      {/* Section Header Row */}
      <div className="activities-header-row">
        <div className="header-title-with-sync">
          <h3 className="section-title">Recent Activities</h3>
          <div className="live-sync-pill">
            <span className="live-dot"></span>
            <span>Live Sync</span>
          </div>
        </div>
        <span className="section-subtitle">Live Postings Stream</span>
      </div>

      {/* Main Table Card */}
      <div className="activities-card">
        {/* Filter and Search Bar */}
        <div className="activities-toolbar">
          {/* Left: Filter Tabs with Counts */}
          <div className="toolbar-left">
            <div className="activities-count-badge">
              <span className="count-num">{totalCount}</span>
              <span className="count-label">Postings</span>
            </div>

            <div className="filter-tabs-group">
              <button
                className={`filter-tab ${activeTab === 'ALL' ? 'active' : ''}`}
                onClick={() => setActiveTab('ALL')}
              >
                All ({totalCount})
              </button>
              <button
                className={`filter-tab ${activeTab === 'Event' ? 'active' : ''}`}
                onClick={() => setActiveTab('Event')}
              >
                Events ({eventsCount})
              </button>
              <button
                className={`filter-tab ${activeTab === 'Job' ? 'active' : ''}`}
                onClick={() => setActiveTab('Job')}
              >
                Jobs ({jobsCount})
              </button>
              <button
                className={`filter-tab ${activeTab === 'Scheme' ? 'active' : ''}`}
                onClick={() => setActiveTab('Scheme')}
              >
                Schemes ({schemesCount})
              </button>
            </div>
          </div>

          {/* Right: Search, Count & Actions */}
          <div className="toolbar-right">
            <div className="table-search-box">
              <Search size={15} className="table-search-icon" />
              <input
                type="text"
                placeholder="Search recent jobs, events, sc..."
                value={tableSearch}
                onChange={(e) => setTableSearch(e.target.value)}
                className="table-search-input"
              />
            </div>

            <span className="items-showing-counter">
              Showing <strong>{displayItems.length}</strong> of {filteredItems.length} items
            </span>

            <button
              className="btn-see-more"
              onClick={() => setExpandedView(!expandedView)}
            >
              {expandedView ? 'Show Less' : 'See More'}
            </button>

            <button
              className={`btn-sync-refresh ${isRefreshing ? 'spinning' : ''}`}
              onClick={onRefresh}
              title="Sync with cloud"
            >
              <RotateCw size={15} />
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="table-wrapper">
          <table className="activities-table">
            <thead>
              <tr>
                <th className="th-num">#</th>
                <th className="th-details">Item & Details</th>
                <th className="th-type">Type</th>
                <th className="th-metric">Metric / Info</th>
                <th className="th-date">Date Posted</th>
                <th className="th-status">Status</th>
                <th className="th-active">Active</th>
              </tr>
            </thead>
            <tbody>
              {displayItems.length === 0 ? (
                <tr>
                  <td colSpan={7} className="empty-table-state">
                    <div className="empty-message">
                      <Sparkles size={24} className="empty-icon" />
                      <p>No matching activities found</p>
                      <button
                        className="btn-clear-filter"
                        onClick={() => {
                          setTableSearch('');
                          setActiveTab('ALL');
                        }}
                      >
                        Clear Filters
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                displayItems.map((item, index) => (
                  <tr
                    key={item.id}
                    className={`table-row ${!item.active ? 'row-inactive' : ''}`}
                    onClick={() => onSelectItem(item)}
                  >
                    {/* Index */}
                    <td className="td-num">
                      <span className="row-index">{item.orderNumber || index + 1}</span>
                    </td>

                    {/* Thumbnail & Title/Details */}
                    <td className="td-details">
                      <div className="item-row-content">
                        <div
                          className="item-avatar-icon"
                          style={{ background: item.avatarGradient || 'linear-gradient(135deg, #6838F5 0%, #8746FD 100%)' }}
                        >
                          {getIconForBadge(item.badgeIcon)}
                        </div>
                        <div className="item-text-stack">
                          <span className="item-main-title">{item.title}</span>
                          <span className="item-sub-details">{item.subtitle}</span>
                        </div>
                      </div>
                    </td>

                    {/* Type Badge */}
                    <td className="td-type">
                      {getTypeBadge(item.type)}
                    </td>

                    {/* Metric / Info */}
                    <td className="td-metric">
                      <div className="metric-text-wrapper">
                        <span className="metric-main">{item.metric}</span>
                      </div>
                    </td>

                    {/* Date Posted */}
                    <td className="td-date">
                      <span className="date-text">{item.datePosted}</span>
                    </td>

                    {/* Status Badge */}
                    <td className="td-status">
                      {getStatusBadge(item.status)}
                    </td>

                    {/* Active Toggle Switch */}
                    <td
                      className="td-active"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <label className="toggle-switch-container">
                        <input
                          type="checkbox"
                          checked={item.active}
                          onChange={() => onToggleActive(item.id)}
                          className="toggle-checkbox"
                        />
                        <span className="toggle-slider"></span>
                      </label>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Bottom Pagination / View Details bar if list is large */}
        <div className="table-footer-bar">
          <div className="table-footer-left">
            <span>Real-time webhook sync enabled (2.4s latency)</span>
          </div>
          <div className="table-footer-right">
            <button
              className="footer-link-btn"
              onClick={() => setExpandedView(!expandedView)}
            >
              <span>{expandedView ? 'Collapse View' : `View All ${filteredItems.length} Records`}</span>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
