import React, { useState } from 'react';

export default function CreateEventView({ setEvents, onNavigate, addToast }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Technology');
  const [date, setDate] = useState('Nov 10-12, 2026');
  const [location, setLocation] = useState('San Francisco, CA & Virtual');
  const [capacity, setCapacity] = useState(500);
  const [poster, setPoster] = useState('assets/posters/poster-tech-summit.svg');
  const [speakers, setSpeakers] = useState('Elena Vance, Dr. Marcus Sterling');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      addToast('Please enter an event name', 'error');
      return;
    }

    const newEv = {
      id: 'ev-' + Date.now(),
      name,
      poster,
      date,
      location,
      category,
      capacity: Number(capacity) || 500,
      registered: 0,
      status: 'upcoming',
      description: description || 'No description provided.',
      speakers: speakers ? speakers.split(',').map(s => s.trim()) : []
    };

    setEvents(prev => [newEv, ...prev]);
    addToast(`Event "${name}" published successfully!`, 'success');
    onNavigate('events');
  };

  return (
    <section className="app-view active" id="viewCreateEvent">
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--neutral-900)' }}>Publish New Event</h2>
        <p style={{ fontSize: 13, color: 'var(--neutral-500)' }}>Configure event metadata, seating limits, poster visuals, and speaker rosters</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24, alignItems: 'start' }}>
        {/* Form Column */}
        <form onSubmit={handleSubmit} style={{ background: '#fff', borderRadius: 20, border: '1px solid var(--neutral-200)', padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="form-group">
            <label className="form-label">Event Name / Title</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Global Tech & AI Leaders Summit 2026"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div className="form-group">
              <label className="form-label">Category</label>
              <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="Technology">Technology</option>
                <option value="Environment">Environment</option>
                <option value="Community">Community</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Education">Education</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Total Seat Capacity</label>
              <input
                type="number"
                className="form-input"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                min="10"
                required
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div className="form-group">
              <label className="form-label">Date Schedule</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Nov 15-18, 2026"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Venue / City Location</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Moscone Center, SF & Virtual"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Event Poster Graphic</label>
            <select className="form-select" value={poster} onChange={(e) => setPoster(e.target.value)}>
              <option value="assets/posters/poster-tech-summit.svg">Tech Summit Poster</option>
              <option value="assets/posters/poster-climate-hack.svg">Climate Hack Poster</option>
              <option value="assets/posters/poster-entrepreneur-forum.svg">Entrepreneur Forum Poster</option>
              <option value="assets/posters/poster-healthcare-ai.svg">Healthcare AI Poster</option>
              <option value="assets/posters/poster-wellness-drive.svg">Wellness Drive Poster</option>
              <option value="assets/posters/poster-design-systems.svg">Design Systems Poster</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Keynote Speakers (comma separated)</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Dr. Marcus Sterling, Elena Vance"
              value={speakers}
              onChange={(e) => setSpeakers(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Overview &amp; Description</label>
            <textarea
              className="form-textarea"
              rows="4"
              placeholder="Provide event objectives, track themes, target audience..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 10 }}>
            <button type="button" className="btn-secondary" onClick={() => onNavigate('events')}>Cancel</button>
            <button type="submit" className="btn-primary" style={{ height: 42, padding: '0 24px' }}>
              <span>Publish Event Live</span>
            </button>
          </div>
        </form>

        {/* Live Preview Card */}
        <div style={{ background: '#fff', borderRadius: 20, border: '1px solid var(--neutral-200)', padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--neutral-500)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Live Card Preview</div>
          <div style={{ borderRadius: 16, border: '1px solid var(--neutral-200)', overflow: 'hidden' }}>
            <div style={{ height: 160, position: 'relative', background: '#f3f4f6' }}>
              <img src={poster} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <span className="status-badge upcoming" style={{ position: 'absolute', top: 12, right: 12 }}>Upcoming</span>
              <span style={{ position: 'absolute', bottom: 12, left: 12, background: 'rgba(0,0,0,0.65)', color: '#fff', padding: '3px 8px', borderRadius: 6, fontSize: 11.5 }}>
                {category}
              </span>
            </div>
            <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <h4 style={{ fontSize: 16, fontWeight: 700, color: 'var(--neutral-900)' }}>{name || 'Untitled Event Name'}</h4>
              <p style={{ fontSize: 12, color: 'var(--neutral-600)' }}>{description || 'Event description preview will appear here as you type.'}</p>
              <div style={{ fontSize: 12, color: 'var(--neutral-500)', display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div>🗓 {date}</div>
                <div>📍 {location}</div>
                <div>🎟 0 / {capacity} Registered Seats</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
