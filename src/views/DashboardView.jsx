import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { getEventPoster, getJobPoster } from '../data/initialData';

export default function DashboardView() {
  const {
    events,
    jobs,
    schemes,
    navigateTo,
    selectEvent,
    showToast
  } = useApp();

  const [currentSlide, setCurrentSlide] = useState(0);
  const [actFilter, setActFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [itemActiveStates, setItemActiveStates] = useState({});

  // Slide autoplay
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % 3);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  // Build unified activities list
  const getUnifiedActivities = () => {
    const list = [];

    // 1. Events
    (events || []).forEach(ev => {
      list.push({
        id: ev.id,
        title: ev.name,
        type: 'events',
        typeLabel: 'Event',
        icon: 'event',
        poster: getEventPoster(ev),
        subtitle: `${ev.location} · ${ev.category}`,
        metric: `${ev.registered} / ${ev.capacity} Attendees`,
        date: ev.date || 'Upcoming 2026',
        status: ev.status,
        defaultActive: ev.status !== 'closed' && ev.status !== 'archived',
        targetView: 'events',
        raw: ev
      });
    });

    // 2. Jobs
    (jobs || []).forEach(j => {
      list.push({
        id: j.id,
        title: j.title,
        type: 'jobs',
        typeLabel: 'Job',
        icon: 'work',
        poster: getJobPoster(j),
        subtitle: `${j.dept} · ${j.location}`,
        metric: `${j.applicantsCount || 0} Applications`,
        date: '14 Sep 2026',
        status: j.status,
        defaultActive: j.status === 'active',
        targetView: 'careers',
        raw: j
      });
    });

    // 3. Schemes
    (schemes || []).forEach(s => {
      list.push({
        id: s.id,
        title: s.title,
        type: 'schemes',
        typeLabel: 'Scheme',
        icon: 'account_balance',
        poster: null,
        subtitle: `${s.category} · ${s.eligibility ? s.eligibility.substring(0, 35) + '...' : ''}`,
        metric: s.grantAmount || s.value || 'Grant Funded',
        date: s.deadline || '30 Nov 2026',
        status: s.status,
        defaultActive: s.status === 'active',
        targetView: 'schemes',
        raw: s
      });
    });

    return list;
  };

  const allActivities = getUnifiedActivities();

  // Filter activities
  const filteredActivities = allActivities.filter(item => {
    if (actFilter !== 'all' && item.type !== actFilter) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      const match = item.title.toLowerCase().includes(q) ||
        (item.subtitle && item.subtitle.toLowerCase().includes(q)) ||
        (item.metric && item.metric.toLowerCase().includes(q));
      if (!match) return false;
    }
    return true;
  });

  const toggleItemActive = (id, defaultState) => {
    setItemActiveStates(prev => {
      const current = prev[id] !== undefined ? prev[id] : defaultState;
      const next = !current;
      showToast(`Status toggled to ${next ? 'Active' : 'Inactive'} for item`);
      return { ...prev, [id]: next };
    });
  };

  return (
    <section className="app-view active" id="viewDashboard">
      {/* Hero Interactive Banner Carousel */}
      <div className="home-interactive-banner" id="homeHeroBanner">
        <div className="banner-ambient-glow" />
        <div className="banner-hex-pattern" />

        <div className="banner-slides-wrapper" id="bannerSlidesWrapper">
          {/* Slide 0: AI Live Studio */}
          <div className={`banner-slide ${currentSlide === 0 ? 'active' : ''}`} data-slide-index="0">
            <div className="banner-left-content">
              <span className="banner-pill-tag">
                <span className="material-symbols-outlined" style={{ fontSize: '14px', marginRight: '4px' }}>auto_awesome</span>
                AI Live Studio &amp; Highlights
              </span>
              <h2 className="banner-headline">Generate automated highlights</h2>
              <p className="banner-subtext">
                Upload a conference or livestream link. We'll detect all the key moments, speaker quotes, and audience insights for you.
              </p>
              <div className="banner-cta-group">
                <button
                  className="btn-banner-white"
                  id="btnBannerCta1"
                  title="Generate New Highlights"
                  onClick={() => showToast('AI Live Studio initializing highlight generation...', 'info')}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                  <span>Generate New Highlights</span>
                </button>
                <button
                  className="btn-banner-ghost"
                  id="btnBannerSecondary1"
                  title="Explore Live Keynotes"
                  onClick={() => navigateTo('events')}
                >
                  <span>Live Keynotes</span>
                </button>
              </div>
            </div>

            <div className="banner-right-visual">
              <div className="floating-media-cluster">
                <div className="media-bubble bubble-1" title="AI Healthcare Stage">
                  <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=160&q=80" alt="Summit Stage" />
                  <span className="bubble-play-icon">
                    <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>play_arrow</span>
                  </span>
                </div>
                <div className="media-bubble bubble-2 active-center" title="Youth Tech Summit Mainstage (Live)">
                  <img src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=220&q=80" alt="Keynote Speaker" />
                  <span className="bubble-live-badge">LIVE</span>
                </div>
                <div className="media-bubble bubble-3" title="Clean Water Hackathon">
                  <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=160&q=80" alt="Hackathon Team" />
                </div>
                <div className="media-bubble bubble-4" title="Global Leaders Forum">
                  <img src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=160&q=80" alt="Panel Discussion" />
                </div>
              </div>
            </div>
          </div>

          {/* Slide 1: Grants & Subsidies */}
          <div className={`banner-slide ${currentSlide === 1 ? 'active' : ''}`} data-slide-index="1">
            <div className="banner-left-content">
              <span className="banner-pill-tag">
                <span className="material-symbols-outlined" style={{ fontSize: '14px', marginRight: '4px' }}>account_balance</span>
                Grants &amp; Subsidy Allocations
              </span>
              <h2 className="banner-headline">Automate scheme applications &amp; review</h2>
              <p className="banner-subtext">
                Match verified non-profit programs with $250k+ in active state innovation grants, solar subsidies, and agribusiness fellowships.
              </p>
              <div className="banner-cta-group">
                <button
                  className="btn-banner-white"
                  id="btnBannerCta2"
                  title="Explore Grant Schemes"
                  onClick={() => navigateTo('schemes')}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                  <span>Explore Grant Schemes</span>
                </button>
                <button
                  className="btn-banner-ghost"
                  id="btnBannerSecondary2"
                  title="View Disbursals"
                  onClick={() => navigateTo('schemes', 'manage-schemes')}
                >
                  <span>View Allocations</span>
                </button>
              </div>
            </div>

            <div className="banner-right-visual">
              <div className="floating-media-cluster">
                <div className="media-bubble bubble-1" title="Solar Clean Energy Grant">
                  <img src="https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=160&q=80" alt="Solar Subsidy" />
                </div>
                <div className="media-bubble bubble-2 active-center" title="State Innovation Fund ($25K)">
                  <img src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=220&q=80" alt="Innovation Grant" />
                  <span className="bubble-live-badge" style={{ background: '#12B76A' }}>$25K</span>
                </div>
                <div className="media-bubble bubble-3" title="AgriTech Youth Fellowship">
                  <img src="https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=160&q=80" alt="Agribusiness" />
                </div>
              </div>
            </div>
          </div>

          {/* Slide 2: Gate Access & QR Scanner */}
          <div className={`banner-slide ${currentSlide === 2 ? 'active' : ''}`} data-slide-index="2">
            <div className="banner-left-content">
              <span className="banner-pill-tag">
                <span className="material-symbols-outlined" style={{ fontSize: '14px', marginRight: '4px' }}>qr_code_scanner</span>
                Gate Access &amp; QR Scanner
              </span>
              <h2 className="banner-headline">Instant attendee check-in &amp; passes</h2>
              <p className="banner-subtext">
                Issue dynamic digital access tokens, VIP credentials, and scan attendee QR entry passes with zero latency at entrance gates.
              </p>
              <div className="banner-cta-group">
                <button
                  className="btn-banner-white"
                  id="btnBannerCta3"
                  title="Manage Access Passes"
                  onClick={() => navigateTo('eventPasses')}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="6" width="20" height="12" rx="2" />
                    <path d="M6 12h.01M18 12h.01" />
                    <line x1="10" y1="12" x2="14" y2="12" />
                  </svg>
                  <span>Manage Access Passes</span>
                </button>
                <button
                  className="btn-banner-ghost"
                  id="btnBannerSecondary3"
                  title="Open Gate Scanner"
                  onClick={() => navigateTo('eventPasses')}
                >
                  <span>View Passes</span>
                </button>
              </div>
            </div>

            <div className="banner-right-visual">
              <div className="floating-media-cluster">
                <div className="media-bubble bubble-1" title="VIP Keynote Pass">
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80" alt="VIP Pass" />
                </div>
                <div className="media-bubble bubble-2 active-center" title="Gate QR Scanned">
                  <img src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=220&q=80" alt="Concert Arena" />
                  <span className="bubble-live-badge" style={{ background: '#2E90FA' }}>PASS</span>
                </div>
                <div className="media-bubble bubble-3" title="Press Correspondent">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80" alt="Press Badge" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Banner Navigation Dots */}
        <div className="banner-dots-cluster">
          <span
            className={`banner-dot ${currentSlide === 0 ? 'active' : ''}`}
            onClick={() => setCurrentSlide(0)}
            title="Slide 1: Highlights"
          />
          <span
            className={`banner-dot ${currentSlide === 1 ? 'active' : ''}`}
            onClick={() => setCurrentSlide(1)}
            title="Slide 2: Grants"
          />
          <span
            className={`banner-dot ${currentSlide === 2 ? 'active' : ''}`}
            onClick={() => setCurrentSlide(2)}
            title="Slide 3: Tickets"
          />
        </div>
      </div>

      {/* Quick Actions Section */}
      <div className="home-quick-actions-section">
        <div className="home-section-header">
          <h2 className="home-section-title">Quick Actions</h2>
          <span className="home-section-subtitle">Fast-track publishing shortcuts</span>
        </div>

        <div className="qa-horizontal-grid">
          {/* Create Event Card */}
          <div className="qa-linear-card event-card" id="qaFeatureCreateEvent" title="Launch Event creation">
            <div className="qa-linear-main">
              <div className="qa-linear-icon event">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <div className="qa-linear-info">
                <div className="qa-linear-title">Create Event</div>
                <div className="qa-linear-desc">Conferences, stages &amp; ticketing</div>
              </div>
            </div>
            <div className="qa-linear-actions">
              <div className="qa-options-chips">
                <button className="qa-chip-pill" onClick={() => navigateTo('createEvent')}>
                  <span className="material-symbols-outlined" style={{ fontSize: '13px' }}>location_on</span>
                  <span>In-Person</span>
                </button>
                <button className="qa-chip-pill" onClick={() => navigateTo('createEvent')}>
                  <span className="material-symbols-outlined" style={{ fontSize: '13px' }}>videocam</span>
                  <span>Virtual</span>
                </button>
                <button className="qa-chip-pill" onClick={() => navigateTo('createEvent')}>
                  <span className="material-symbols-outlined" style={{ fontSize: '13px' }}>terminal</span>
                  <span>Hackathon</span>
                </button>
              </div>
              <button className="btn-qa-action-launch event" id="btnQaLaunchEvent" onClick={() => navigateTo('createEvent')}>
                <span>Launch</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Post Opportunity Card */}
          <div className="qa-linear-card career-card" id="qaFeatureCreateOpportunity" title="Launch Opportunity creation">
            <div className="qa-linear-main">
              <div className="qa-linear-icon career">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
              </div>
              <div className="qa-linear-info">
                <div className="qa-linear-title">Post Opportunity</div>
                <div className="qa-linear-desc">Jobs, fellowships &amp; pipeline</div>
              </div>
            </div>
            <div className="qa-linear-actions">
              <div className="qa-options-chips">
                <button className="qa-chip-pill" onClick={() => navigateTo('createOpportunity')}>
                  <span className="material-symbols-outlined" style={{ fontSize: '13px' }}>work</span>
                  <span>Full-time</span>
                </button>
                <button className="qa-chip-pill" onClick={() => navigateTo('createOpportunity')}>
                  <span className="material-symbols-outlined" style={{ fontSize: '13px' }}>school</span>
                  <span>Fellowship</span>
                </button>
                <button className="qa-chip-pill" onClick={() => navigateTo('createOpportunity')}>
                  <span className="material-symbols-outlined" style={{ fontSize: '13px' }}>volunteer_activism</span>
                  <span>Volunteer</span>
                </button>
              </div>
              <button className="btn-qa-action-launch career" id="btnQaLaunchOpportunity" onClick={() => navigateTo('createOpportunity')}>
                <span>Post Role</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Post Scheme Card */}
          <div className="qa-linear-card scheme-card" id="qaFeaturePostScheme" title="Launch Grant Scheme creation">
            <div className="qa-linear-main">
              <div className="qa-linear-icon scheme">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18" />
                  <path d="M3 10h18" />
                  <path d="M5 6l7-3 7 3" />
                  <path d="M4 10v11" />
                  <path d="M20 10v11" />
                  <path d="M8 14v4" /><path d="M12 14v4" /><path d="M16 14v4" />
                </svg>
              </div>
              <div className="qa-linear-info">
                <div className="qa-linear-title">Post Scheme</div>
                <div className="qa-linear-desc">Grants, subsidies &amp; seed awards</div>
              </div>
            </div>
            <div className="qa-linear-actions">
              <div className="qa-options-chips">
                <button className="qa-chip-pill" onClick={() => navigateTo('createScheme')}>
                  <span className="material-symbols-outlined" style={{ fontSize: '13px' }}>account_balance</span>
                  <span>Grant</span>
                </button>
                <button className="qa-chip-pill" onClick={() => navigateTo('createScheme')}>
                  <span className="material-symbols-outlined" style={{ fontSize: '13px' }}>energy_savings_leaf</span>
                  <span>Subsidy</span>
                </button>
                <button className="qa-chip-pill" onClick={() => navigateTo('createScheme')}>
                  <span className="material-symbols-outlined" style={{ fontSize: '13px' }}>eco</span>
                  <span>Seed Fund</span>
                </button>
              </div>
              <button className="btn-qa-action-launch scheme" id="btnQaLaunchScheme" onClick={() => navigateTo('createScheme')}>
                <span>Post</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activities Section */}
      <div className="home-recent-activities-section">
        <div className="home-section-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <h2 className="home-section-title">Recent Activities</h2>
            <div className="badge-trend-pos" title="Real-time live sync across organization modules">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="18 15 12 9 6 15" />
              </svg>
              <span>Live Sync</span>
            </div>
          </div>
          <span className="home-section-subtitle">Live Postings Stream</span>
        </div>

        <div className="figma-recent-activities-card full-screen-width">
          <div className="recent-act-top-bar">
            <div className="recent-act-top-left-group">
              <div className="recent-act-items-count">
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                  <span className="count-big" id="recentActivitiesCount">{allActivities.length}</span>
                  <span className="count-unit">Postings</span>
                </div>
              </div>

              <div className="recent-act-type-filters">
                <button
                  className={`recent-act-filter-btn ${actFilter === 'all' ? 'active' : ''}`}
                  onClick={() => setActFilter('all')}
                >
                  All ({allActivities.length})
                </button>
                <button
                  className={`recent-act-filter-btn ${actFilter === 'events' ? 'active' : ''}`}
                  onClick={() => setActFilter('events')}
                >
                  Events ({events.length})
                </button>
                <button
                  className={`recent-act-filter-btn ${actFilter === 'jobs' ? 'active' : ''}`}
                  onClick={() => setActFilter('jobs')}
                >
                  Jobs ({jobs.length})
                </button>
                <button
                  className={`recent-act-filter-btn ${actFilter === 'schemes' ? 'active' : ''}`}
                  onClick={() => setActFilter('schemes')}
                >
                  Schemes ({schemes.length})
                </button>
              </div>
            </div>

            <div className="recent-act-top-right-group">
              <div className="pill-search-input">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="text"
                  placeholder="Search recent jobs, events, schemes..."
                  id="recentActivitiesSearchInput"
                  autoComplete="off"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <kbd className="search-kbd-badge">/</kbd>
                {searchTerm && (
                  <button
                    type="button"
                    className="search-clear-btn"
                    id="btnClearRecentActivitiesSearch"
                    aria-label="Clear search"
                    style={{ display: 'inline-flex' }}
                    onClick={() => setSearchTerm('')}
                  >
                    &times;
                  </button>
                )}
              </div>

              <div className="recent-act-count-text" id="recentActFilteredCountText">
                Showing <strong>{filteredActivities.length}</strong> items
              </div>

              <button
                className="btn-see-more-pill"
                id="btnRecentActivitiesSeeMore"
                title="View all items in active module"
                onClick={() => navigateTo(actFilter === 'all' ? 'events' : actFilter)}
              >
                See More
              </button>

              <button
                className="circle-action-btn"
                id="btnRefreshRecentAct"
                style={{ width: '38px', height: '38px' }}
                title="Refresh activity stream"
                onClick={() => showToast('Activities synced with cloud cluster!', 'success')}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="23 4 23 10 17 10" />
                  <polyline points="1 20 1 14 7 14" />
                  <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
                </svg>
              </button>
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table className="recent-products-table">
              <colgroup>
                <col style={{ width: '44px' }} />
                <col style={{ width: '35%' }} />
                <col style={{ width: '11%' }} />
                <col style={{ width: '17%' }} />
                <col style={{ width: '14%' }} />
                <col style={{ width: '10%' }} />
                <col style={{ width: '8%' }} />
              </colgroup>
              <thead>
                <tr>
                  <th style={{ width: '44px', color: 'var(--neutral-400)', fontSize: '11px' }}>#</th>
                  <th>Item &amp; Details</th>
                  <th>Type</th>
                  <th>Metric / Info</th>
                  <th>Date Posted</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right', paddingRight: '18px' }}>Active</th>
                </tr>
              </thead>
              <tbody id="recentActivitiesTbody">
                {filteredActivities.length === 0 ? (
                  <tr>
                    <td colSpan="7" style={{ textAlign: 'center', padding: '36px', color: 'var(--neutral-400)' }}>
                      No matching activities found for your query.
                    </td>
                  </tr>
                ) : (
                  filteredActivities.map((item, idx) => {
                    const isActive = itemActiveStates[item.id] !== undefined ? itemActiveStates[item.id] : item.defaultActive;
                    return (
                      <tr
                        key={`${item.type}-${item.id}`}
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          if (item.type === 'events') {
                            selectEvent(item.id);
                          } else {
                            navigateTo(item.targetView);
                          }
                        }}
                      >
                        <td style={{ color: 'var(--neutral-400)', fontSize: '12px', fontWeight: 600 }}>
                          {(idx + 1).toString().padStart(2, '0')}
                        </td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            {item.poster ? (
                              <img
                                src={item.poster}
                                alt=""
                                style={{ width: '38px', height: '38px', borderRadius: '8px', objectFit: 'cover', border: '1px solid #ECECEC' }}
                              />
                            ) : (
                              <div
                                style={{
                                  width: '38px',
                                  height: '38px',
                                  borderRadius: '8px',
                                  background: 'var(--brand-50)',
                                  color: 'var(--knotnex-primary)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  border: '1px solid var(--brand-100)'
                                }}
                              >
                                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>{item.icon}</span>
                              </div>
                            )}
                            <div>
                              <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '13.5px' }}>
                                {item.title}
                              </div>
                              <div style={{ fontSize: '11.5px', color: 'var(--text-tertiary)', marginTop: '2px' }}>
                                {item.subtitle}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span
                            className="status-badge-minimal"
                            style={{
                              background: item.type === 'events' ? '#EEF4FF' : (item.type === 'jobs' ? '#F4F3FF' : '#ECFDF3'),
                              color: item.type === 'events' ? '#3538CD' : (item.type === 'jobs' ? '#5925DC' : '#027A48'),
                              border: 'none',
                              padding: '3px 9px',
                              borderRadius: '9999px',
                              fontSize: '11px',
                              fontWeight: 600
                            }}
                          >
                            {item.typeLabel}
                          </span>
                        </td>
                        <td style={{ fontSize: '12.5px', color: 'var(--text-secondary)', fontWeight: 500 }}>
                          {item.metric}
                        </td>
                        <td style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>
                          {item.date}
                        </td>
                        <td>
                          <span
                            className="status-badge"
                            style={{
                              background: item.status === 'upcoming' || item.status === 'active' ? '#ECFDF3' : (item.status === 'ongoing' ? '#FFFBEB' : '#F2F4F7'),
                              color: item.status === 'upcoming' || item.status === 'active' ? '#12B76A' : (item.status === 'ongoing' ? '#B54708' : '#475467'),
                              fontSize: '11px',
                              padding: '2px 8px',
                              borderRadius: '9999px',
                              textTransform: 'capitalize'
                            }}
                          >
                            ● {item.status}
                          </span>
                        </td>
                        <td style={{ textAlign: 'right', paddingRight: '18px' }} onClick={(e) => e.stopPropagation()}>
                          <label className="toggle-switch-ios" style={{ cursor: 'pointer' }}>
                            <input
                              type="checkbox"
                              checked={isActive}
                              onChange={() => toggleItemActive(item.id, item.defaultActive)}
                            />
                            <span className="slider" />
                          </label>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
