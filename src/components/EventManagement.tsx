import React, { useState, useMemo } from 'react';
import {
  SlidersHorizontal,
  Search,
  ChevronRight,
  User,
  CheckCircle2,
  Calendar,
} from 'lucide-react';
import type { EventItem, EventStatus } from '../types';
import { METRICS_DATA } from '../data/mockData';

interface EventManagementProps {
  events: EventItem[];
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onSelectEvent: (event: EventItem) => void;
  onOpenFilterModal: () => void;
  selectedFormatFilter?: string | null;
}

type TabType = 'All' | 'Pending Approval' | 'Live/Published' | 'Completed' | 'Cancelled';

export const EventManagement: React.FC<EventManagementProps> = ({
  events,
  searchQuery,
  onSearchChange,
  onSelectEvent,
  onOpenFilterModal,
  selectedFormatFilter,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('All');
  const [localSearch, setLocalSearch] = useState('');

  // Combined search query (from header or local search)
  const activeSearch = (searchQuery || localSearch).trim().toLowerCase();

  // Tab counts
  const totalCount = events.length;
  const pendingCount = events.filter((e) => e.status === 'Pending Approval').length;
  const publishedCount = events.filter((e) => e.status === 'Published').length;
  const completedCount = events.filter((e) => e.status === 'Completed').length;
  const cancelledCount = events.filter((e) => e.status === 'Cancelled').length;

  // Filtered events
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      // 1. Tab filter
      let matchesTab = true;
      if (activeTab === 'Pending Approval') {
        matchesTab = event.status === 'Pending Approval';
      } else if (activeTab === 'Live/Published') {
        matchesTab = event.status === 'Published';
      } else if (activeTab === 'Completed') {
        matchesTab = event.status === 'Completed';
      } else if (activeTab === 'Cancelled') {
        matchesTab = event.status === 'Cancelled';
      }

      // 2. Format filter
      let matchesFormat = true;
      if (selectedFormatFilter) {
        matchesFormat = event.format === selectedFormatFilter;
      }

      // 3. Search query filter
      let matchesSearch = true;
      if (activeSearch) {
        matchesSearch =
          event.id.toLowerCase().includes(activeSearch) ||
          event.title.toLowerCase().includes(activeSearch) ||
          event.category.toLowerCase().includes(activeSearch) ||
          event.organizer.name.toLowerCase().includes(activeSearch) ||
          event.format.toLowerCase().includes(activeSearch) ||
          event.status.toLowerCase().includes(activeSearch);
      }

      return matchesTab && matchesFormat && matchesSearch;
    });
  }, [events, activeTab, selectedFormatFilter, activeSearch]);

  const getStatusBadgeClass = (status: EventStatus) => {
    switch (status) {
      case 'Published':
        return 'status-pill published';
      case 'Pending Approval':
        return 'status-pill pending';
      case 'Completed':
        return 'status-pill completed';
      case 'Cancelled':
        return 'status-pill cancelled';
      default:
        return 'status-pill published';
    }
  };

  const getFormatBadgeClass = (format: string) => {
    switch (format) {
      case 'On-Ground':
        return 'tag-pill on-ground';
      case 'Online':
        return 'tag-pill online';
      case 'Hybrid':
        return 'tag-pill hybrid';
      default:
        return 'tag-pill default';
    }
  };

  return (
    <div className="event-management-view">
      {/* 1. Page Header Title */}
      <div className="page-heading-row">
        <h1 className="page-main-title">Event Management</h1>
      </div>

      {/* 2. Top Metric Cards Row (4 Cards) */}
      <div className="metrics-grid-row">
        {/* Card 1: Total Events */}
        <div className="metric-stat-card">
          <div className="metric-card-top">
            <span className="metric-label">Total Events</span>
          </div>
          <div className="metric-main-value">{METRICS_DATA.totalEvents}</div>
          <div className="metric-card-bottom">
            <span className="metric-sub-positive">
              <span className="arrow-up">▲</span> {METRICS_DATA.totalEventsGrowth}
            </span>
            <button
              className="metric-view-btn"
              onClick={() => setActiveTab('All')}
            >
              <span>View</span>
              <ChevronRight size={13} className="btn-icon-right" />
            </button>
          </div>
        </div>

        {/* Card 2: Upcomings */}
        <div className="metric-stat-card">
          <div className="metric-card-top flex-between">
            <span className="metric-label">Upcomings</span>
            <span className="metric-badge-pill">{METRICS_DATA.upcomingsFillPercentage}% Filled</span>
          </div>
          <div className="metric-main-value">{METRICS_DATA.upcomingsCount}</div>
          <div className="metric-card-bottom">
            <div className="metric-progress-track">
              <div
                className="metric-progress-fill"
                style={{ width: `${METRICS_DATA.upcomingsFillPercentage}%` }}
              ></div>
            </div>
            <button
              className="metric-view-btn"
              onClick={() => setActiveTab('Live/Published')}
            >
              <span>View</span>
              <ChevronRight size={13} className="btn-icon-right" />
            </button>
          </div>
        </div>

        {/* Card 3: Gross Collection */}
        <div className="metric-stat-card">
          <div className="metric-card-top">
            <span className="metric-label">Gross Collection</span>
          </div>
          <div className="metric-main-value">{METRICS_DATA.grossCollection}</div>
          <div className="metric-card-bottom">
            <span className="metric-sub-positive">
              <span className="arrow-up">▲</span> {METRICS_DATA.grossCollectionRate}
            </span>
          </div>
        </div>

        {/* Card 4: Gross Revenue */}
        <div className="metric-stat-card">
          <div className="metric-card-top">
            <span className="metric-label">Gross Revenue</span>
          </div>
          <div className="metric-main-value">{METRICS_DATA.grossRevenue}</div>
          <div className="metric-card-bottom">
            <span className="metric-sub-muted">{METRICS_DATA.platformTake}</span>
          </div>
        </div>
      </div>

      {/* 3. Search & Filter Bar */}
      <div className="events-search-filter-row">
        <div className="events-search-bar">
          <Search size={16} className="search-icon-inside" />
          <input
            type="text"
            placeholder="Search events, users, tickets, logs..."
            value={localSearch || searchQuery}
            onChange={(e) => {
              setLocalSearch(e.target.value);
              onSearchChange(e.target.value);
            }}
            className="events-search-input"
          />
        </div>

        <button className="btn-filter-purple" onClick={onOpenFilterModal}>
          <span>Filter</span>
          <SlidersHorizontal size={15} />
        </button>
      </div>

      {/* 4. Filter Tabs Row */}
      <div className="events-filter-tabs-row">
        {/* Tab 1: All */}
        <button
          className={`filter-tab-pill ${activeTab === 'All' ? 'active' : ''}`}
          onClick={() => setActiveTab('All')}
        >
          <span>All</span>
          <span className="tab-counter-badge">{totalCount}</span>
        </button>

        {/* Tab 2: Pending Approval */}
        <button
          className={`filter-tab-pill ${activeTab === 'Pending Approval' ? 'active' : ''}`}
          onClick={() => setActiveTab('Pending Approval')}
        >
          <span>Pending Approval</span>
          <span className="tab-counter-badge">{pendingCount}</span>
        </button>

        {/* Tab 3: Live/Published */}
        <button
          className={`filter-tab-pill ${activeTab === 'Live/Published' ? 'active' : ''}`}
          onClick={() => setActiveTab('Live/Published')}
        >
          <span>Live/Published</span>
          <span className="tab-counter-badge">{publishedCount}</span>
        </button>

        {/* Tab 4: Completed */}
        <button
          className={`filter-tab-pill ${activeTab === 'Completed' ? 'active' : ''}`}
          onClick={() => setActiveTab('Completed')}
        >
          <span>Completed</span>
          <span className="tab-counter-badge">{completedCount}</span>
        </button>

        {/* Tab 5: Cancelled */}
        <button
          className={`filter-tab-pill ${activeTab === 'Cancelled' ? 'active' : ''}`}
          onClick={() => setActiveTab('Cancelled')}
        >
          <span>Cancelled</span>
          <span className="tab-counter-badge">{cancelledCount}</span>
        </button>
      </div>

      {/* 5. Event Cards List */}
      <div className="events-cards-list-container">
        {filteredEvents.length === 0 ? (
          <div className="events-empty-state">
            <Calendar size={36} className="empty-icon" />
            <h3 className="empty-title">No events found</h3>
            <p className="empty-desc">
              Try adjusting your search query or switching to another filter tab.
            </p>
          </div>
        ) : (
          filteredEvents.map((event) => (
            <div key={event.id} className="event-item-card animate-fade-in">
              {/* Card Top Row: Left tags (ID, Category, Format) & Right Status tag */}
              <div className="event-card-tags-row">
                <div className="event-tags-left">
                  <span className="tag-pill event-id">{event.id}</span>
                  <span className="tag-pill category">{event.category}</span>
                  <span className={getFormatBadgeClass(event.format)}>{event.format}</span>
                </div>
                <div className="event-tags-right">
                  <span className={getStatusBadgeClass(event.status)}>{event.status}</span>
                </div>
              </div>

              {/* Event Title */}
              <div className="event-card-title-row">
                <h3 className="event-title-text">{event.title}</h3>
              </div>

              {/* Event Date Right aligned above/along with Bottom row */}
              <div className="event-date-row">
                <span className="event-datetime-text">{event.fullDateTime}</span>
              </div>

              {/* Card Bottom Row: Organizer on Left & View > button on Right */}
              <div className="event-card-bottom-row">
                <div className="event-organizer-box">
                  <div className="organizer-avatar-icon">
                    <User size={13} className="user-icon-svg" />
                  </div>
                  <span className="organizer-label">
                    Organized by <strong className="organizer-name">{event.organizer.name}</strong>
                  </span>
                  {event.organizer.isVerified && (
                    <span className="verified-badge" title="Verified Organizer">
                      <CheckCircle2 size={13} className="verified-icon" />
                    </span>
                  )}
                </div>

                <button
                  className="event-card-view-btn"
                  onClick={() => onSelectEvent(event)}
                >
                  <span>View</span>
                  <ChevronRight size={14} className="btn-icon-right" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
