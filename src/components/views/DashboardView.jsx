import React, { useState, useEffect } from 'react';
import { getEventPoster, getUserAvatar } from '../../data/mockData';

export default function DashboardView({
  events,
  tickets,
  campaigns,
  onNavigate,
  onOpenModal,
  onSelectTicketDetails
}) {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % 3);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const totalEvents = events.length;
  const totalRegistrations = events.reduce((acc, ev) => acc + (ev.registered || 0), 0);
  const pendingTicketsCount = tickets.filter(t => t.status === 'pending').length;

  return (
    <section className="app-view active" id="viewDashboard">
      {/* Interactive Hero Banner */}
      <div className="home-interactive-banner" id="homeHeroBanner">
        <div className="banner-ambient-glow"></div>
        <div className="banner-hex-pattern"></div>

        <div className="banner-slides-wrapper" id="bannerSlidesWrapper">
          {/* Slide 1 */}
          <div className={`banner-slide ${activeSlide === 0 ? 'active' : ''}`} data-slide-index="0">
            <div className="banner-left-content">
              <span className="banner-pill-tag">
                <span className="material-symbols-outlined" style={{ fontSize: 14, marginRight: 4 }}>auto_awesome</span>
                AI Live Studio &amp; Highlights
              </span>
              <h2 className="banner-headline">Generate automated highlights</h2>
              <p className="banner-subtext">
                Upload a conference or livestream link. We'll detect all the key moments, speaker quotes, and audience insights for you.
              </p>
              <div className="banner-cta-group">
                <button className="btn-banner-white" onClick={() => onNavigate('events')}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                  <span>Generate New Highlights</span>
                </button>
                <button className="btn-banner-ghost" onClick={() => onNavigate('events')}>
                  <span>Live Keynotes</span>
                </button>
              </div>
            </div>
            <div className="banner-right-visual">
              <div className="floating-media-cluster">
                <div className="media-bubble bubble-1" title="AI Healthcare Stage">
                  <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=160&q=80" alt="Summit Stage" />
                  <span className="bubble-play-icon"><span className="material-symbols-outlined" style={{ fontSize: 14 }}>play_arrow</span></span>
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

          {/* Slide 2 */}
          <div className={`banner-slide ${activeSlide === 1 ? 'active' : ''}`} data-slide-index="1">
            <div className="banner-left-content">
              <span className="banner-pill-tag">
                <span className="material-symbols-outlined" style={{ fontSize: 14, marginRight: 4 }}>account_balance</span>
                Grants &amp; Subsidy Allocations
              </span>
              <h2 className="banner-headline">Automate scheme applications &amp; review</h2>
              <p className="banner-subtext">
                Match verified non-profit programs with $250k+ in active state innovation grants, solar subsidies, and agribusiness fellowships.
              </p>
              <div className="banner-cta-group">
                <button className="btn-banner-white" onClick={() => onNavigate('schemes')}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                  </svg>
                  <span>Explore Grant Schemes</span>
                </button>
                <button className="btn-banner-ghost" onClick={() => onNavigate('schemes', 'manage-schemes')}>
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

          {/* Slide 3 */}
          <div className={`banner-slide ${activeSlide === 2 ? 'active' : ''}`} data-slide-index="2">
            <div className="banner-left-content">
              <span className="banner-pill-tag">
                <span className="material-symbols-outlined" style={{ fontSize: 14, marginRight: 4 }}>qr_code_scanner</span>
                Gate Access &amp; QR Scanner
              </span>
              <h2 className="banner-headline">Instant attendee check-in &amp; passes</h2>
              <p className="banner-subtext">
                Issue dynamic digital access tokens, VIP credentials, and scan attendee QR entry passes with zero latency at entrance gates.
              </p>
              <div className="banner-cta-group">
                <button className="btn-banner-white" onClick={() => onNavigate('eventPasses')}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="6" width="20" height="12" rx="2"></rect>
                    <path d="M6 12h.01M18 12h.01"></path>
                    <line x1="10" y1="12" x2="14" y2="12"></line>
                  </svg>
                  <span>Manage Access Passes</span>
                </button>
                <button className="btn-banner-ghost" onClick={() => onOpenModal('qrScanner')}>
                  <span>Open Gate Scanner</span>
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

        <div className="banner-dots-cluster">
          <span className={`banner-dot ${activeSlide === 0 ? 'active' : ''}`} onClick={() => setActiveSlide(0)}></span>
          <span className={`banner-dot ${activeSlide === 1 ? 'active' : ''}`} onClick={() => setActiveSlide(1)}></span>
          <span className={`banner-dot ${activeSlide === 2 ? 'active' : ''}`} onClick={() => setActiveSlide(2)}></span>
        </div>
      </div>

      {/* Quick Actions Shortcuts */}
      <div className="home-quick-actions-section">
        <div className="home-section-header">
          <h2 className="home-section-title">Quick Actions</h2>
          <span className="home-section-subtitle">Fast-track publishing shortcuts</span>
        </div>

        <div className="qa-horizontal-grid">
          <div className="qa-linear-card event-card" onClick={() => onNavigate('createEvent')}>
            <div className="qa-linear-main">
              <div className="qa-linear-icon event">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              </div>
              <div className="qa-linear-text">
                <div className="qa-linear-title">Create Event</div>
                <div className="qa-linear-desc">Publish tech summits, hackathons &amp; forums</div>
              </div>
            </div>
            <div className="qa-linear-action">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </div>
          </div>

          <div className="qa-linear-card career-card" onClick={() => onOpenModal('createOpportunity')}>
            <div className="qa-linear-main">
              <div className="qa-linear-icon career">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
              </div>
              <div className="qa-linear-text">
                <div className="qa-linear-title">Post Career Opportunity</div>
                <div className="qa-linear-desc">Hire engineering, design &amp; climate talent</div>
              </div>
            </div>
            <div className="qa-linear-action">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </div>
          </div>

          <div className="qa-linear-card scheme-card" onClick={() => onNavigate('createScheme')}>
            <div className="qa-linear-main">
              <div className="qa-linear-icon scheme">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path></svg>
              </div>
              <div className="qa-linear-text">
                <div className="qa-linear-title">Launch Scheme Program</div>
                <div className="qa-linear-desc">Disburse innovation grants &amp; solar subsidies</div>
              </div>
            </div>
            <div className="qa-linear-action">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Summary Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ background: '#fff', border: '1px solid var(--neutral-200)', borderRadius: 16, padding: 20 }}>
          <div style={{ fontSize: 12, color: 'var(--neutral-500)', fontWeight: 500, marginBottom: 4 }}>Total Active Events</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--neutral-900)' }}>{totalEvents}</div>
          <div style={{ fontSize: 12, color: 'var(--success-500)', marginTop: 4, display: 'flex', alignItems: 'center', gap: 4 }}>
            <span>↑ 12% from last month</span>
          </div>
        </div>
        <div style={{ background: '#fff', border: '1px solid var(--neutral-200)', borderRadius: 16, padding: 20 }}>
          <div style={{ fontSize: 12, color: 'var(--neutral-500)', fontWeight: 500, marginBottom: 4 }}>Verified Registrations</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--neutral-900)' }}>{totalRegistrations.toLocaleString()}</div>
          <div style={{ fontSize: 12, color: 'var(--success-500)', marginTop: 4 }}>88% gate check-in rate</div>
        </div>
        <div style={{ background: '#fff', border: '1px solid var(--neutral-200)', borderRadius: 16, padding: 20 }}>
          <div style={{ fontSize: 12, color: 'var(--neutral-500)', fontWeight: 500, marginBottom: 4 }}>Pending Support Tickets</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--neutral-900)' }}>{pendingTicketsCount}</div>
          <div style={{ fontSize: 12, color: 'var(--warning-500)', marginTop: 4 }}>Requires admin audit</div>
        </div>
        <div style={{ background: '#fff', border: '1px solid var(--neutral-200)', borderRadius: 16, padding: 20 }}>
          <div style={{ fontSize: 12, color: 'var(--neutral-500)', fontWeight: 500, marginBottom: 4 }}>Total Funds Raised</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--neutral-900)' }}>$331,900</div>
          <div style={{ fontSize: 12, color: 'var(--knotnex-primary)', marginTop: 4 }}>Across 6 active campaigns</div>
        </div>
      </div>

      {/* Grid of Events & Support Tickets */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 24 }}>
        {/* Recent Events List */}
        <div style={{ background: '#fff', border: '1px solid var(--neutral-200)', borderRadius: 20, padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyBetween: 'space-between', justifyContent: 'space-between', marginBottom: 16 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600 }}>Active &amp; Upcoming Events</h3>
            <button className="btn-secondary" style={{ height: 32, fontSize: 12 }} onClick={() => onNavigate('events')}>View All</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {events.slice(0, 4).map(ev => (
              <div key={ev.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 10, borderRadius: 12, background: 'var(--neutral-50)', border: '1px solid var(--neutral-200)' }}>
                <img src={getEventPoster(ev)} alt={ev.name} style={{ width: 44, height: 44, borderRadius: 8, objectFit: 'cover' }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--neutral-900)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{ev.name}</div>
                  <div style={{ fontSize: 11.5, color: 'var(--neutral-500)' }}>{ev.date} · {ev.registered} / {ev.capacity} Seats</div>
                </div>
                <span className={`status-badge ${ev.status}`}>{ev.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Support Tickets Queue */}
        <div style={{ background: '#fff', border: '1px solid var(--neutral-200)', borderRadius: 20, padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600 }}>Recent Support Tickets</h3>
            <button className="btn-secondary" style={{ height: 32, fontSize: 12 }} onClick={() => onNavigate('tickets')}>View Audit Log</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {tickets.slice(0, 4).map(t => (
              <div
                key={t.id}
                style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, borderRadius: 12, background: 'var(--neutral-50)', border: '1px solid var(--neutral-200)', cursor: 'pointer' }}
                onClick={() => onSelectTicketDetails(t)}
              >
                <img src={getUserAvatar(t.user)} alt={t.user.name} style={{ width: 36, height: 36, borderRadius: '50%' }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--neutral-900)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{t.title}</div>
                  <div style={{ fontSize: 11.5, color: 'var(--neutral-500)' }}>{t.user.name} · {t.ticketNumber}</div>
                </div>
                <span className={`priority-badge ${t.priority}`}>{t.priority}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
