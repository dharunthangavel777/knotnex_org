import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  Calendar,
  Briefcase,
  Landmark,
  Sparkles,
  Headphones,
  X
} from 'lucide-react';
import type { ActivityItem, ActivityType } from '../types';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  activities: ActivityItem[];
  onSelectItem: (item: ActivityItem) => void;
  onCreateNew: (type: ActivityType) => void;
  onOpenHighlights: () => void;
  onOpenSupport: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  activities,
  onSelectItem,
  onCreateNew,
  onOpenHighlights,
  onOpenSupport,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = activities.filter(
    (a) =>
      a.title.toLowerCase().includes(query.toLowerCase()) ||
      a.subtitle.toLowerCase().includes(query.toLowerCase()) ||
      a.type.toLowerCase().includes(query.toLowerCase()) ||
      a.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="modal-backdrop animate-fade-in" onClick={onClose}>
      <div
        className="command-palette-container animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="palette-search-header">
          <Search size={18} className="palette-search-icon" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search all events, opportunities, schemes, or type a command..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="palette-search-input"
          />
          <button className="btn-close-modal" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        <div className="palette-results-list">
          {/* Quick Actions Group */}
          <div className="palette-group-title">QUICK ACTIONS</div>
          <div className="palette-item" onClick={() => { onCreateNew('Event'); onClose(); }}>
            <div className="palette-item-icon event-color">
              <Calendar size={15} />
            </div>
            <span className="palette-item-text">Create New Event</span>
            <span className="palette-shortcut-badge">Event</span>
          </div>

          <div className="palette-item" onClick={() => { onCreateNew('Job'); onClose(); }}>
            <div className="palette-item-icon job-color">
              <Briefcase size={15} />
            </div>
            <span className="palette-item-text">Post New Opportunity</span>
            <span className="palette-shortcut-badge">Job</span>
          </div>

          <div className="palette-item" onClick={() => { onCreateNew('Scheme'); onClose(); }}>
            <div className="palette-item-icon scheme-color">
              <Landmark size={15} />
            </div>
            <span className="palette-item-text">Post New Grant / Scheme</span>
            <span className="palette-shortcut-badge">Scheme</span>
          </div>

          <div className="palette-item" onClick={() => { onOpenHighlights(); onClose(); }}>
            <div className="palette-item-icon ai-badge">
              <Sparkles size={15} />
            </div>
            <span className="palette-item-text">AI Live Studio & Highlights</span>
            <span className="palette-shortcut-badge">AI</span>
          </div>

          <div className="palette-item" onClick={() => { onOpenSupport(); onClose(); }}>
            <div className="palette-item-icon support-badge">
              <Headphones size={15} />
            </div>
            <span className="palette-item-text">Need Support? Call the Expert</span>
            <span className="palette-shortcut-badge">Help</span>
          </div>

          {/* Search Results */}
          <div className="palette-group-title" style={{ marginTop: 12 }}>
            SEARCH RESULTS ({filtered.length})
          </div>

          {filtered.slice(0, 6).map((item) => (
            <div
              key={item.id}
              className="palette-item"
              onClick={() => {
                onSelectItem(item);
                onClose();
              }}
            >
              <div
                className="palette-item-icon"
                style={{ background: item.avatarGradient || '#6838F5', color: 'white' }}
              >
                {item.type === 'Event' && <Calendar size={14} />}
                {item.type === 'Job' && <Briefcase size={14} />}
                {item.type === 'Scheme' && <Landmark size={14} />}
              </div>
              <div className="palette-item-stack">
                <span className="palette-item-title">{item.title}</span>
                <span className="palette-item-sub">{item.subtitle}</span>
              </div>
              <span className={`type-badge type-${item.type.toLowerCase()}`}>
                {item.type}
              </span>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="palette-empty">No matching records found for "{query}"</div>
          )}
        </div>

        <div className="palette-footer">
          <div className="palette-footer-shortcuts">
            <span><strong>↑↓</strong> to navigate</span>
            <span><strong>↵</strong> to select</span>
            <span><strong>esc</strong> to dismiss</span>
          </div>
        </div>
      </div>
    </div>
  );
};
