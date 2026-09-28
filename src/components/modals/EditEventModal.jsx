import React, { useState, useEffect } from 'react';

export default function EditEventModal({ isOpen, onClose, event, setEvents, addToast }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Technology');
  const [capacity, setCapacity] = useState(1000);
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (event) {
      setName(event.name || '');
      setCategory(event.category || 'Technology');
      setCapacity(event.capacity || 1000);
      setDate(event.date || '');
      setLocation(event.location || '');
      setDescription(event.description || '');
    }
  }, [event]);

  if (!isOpen || !event) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setEvents(prev => prev.map(ev => {
      if (ev.id === event.id) {
        return {
          ...ev,
          name,
          category,
          capacity: Number(capacity),
          date,
          location,
          description
        };
      }
      return ev;
    }));
    addToast(`Event "${name}" details updated successfully!`, 'success');
    onClose();
  };

  return (
    <div className="modal-backdrop" id="modalEditEventDetails" style={{ display: 'flex' }}>
      <div className="modal-dialog" style={{ maxWidth: 580 }}>
        <div className="modal-header">
          <h2 className="modal-title">Edit Event Details</h2>
          <button className="modal-close-btn" onClick={onClose}>&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">Event Name</label>
              <input
                type="text"
                className="form-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-row-2">
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
                  required
                />
              </div>
            </div>
            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label">Date Schedule</label>
                <input
                  type="text"
                  className="form-input"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Venue / City</label>
                <input
                  type="text"
                  className="form-input"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Overview &amp; Description</label>
              <textarea
                className="form-textarea"
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
}
