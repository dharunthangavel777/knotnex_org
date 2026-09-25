import React, { useState, useEffect } from 'react';
import { Sparkles, Play, Video } from 'lucide-react';
import { HERO_SLIDES } from '../data/mockData';

interface HeroBannerProps {
  onGenerateHighlights: () => void;
  onOpenLiveKeynotes: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onGenerateHighlights,
  onOpenLiveKeynotes,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const slide = HERO_SLIDES[currentSlideIndex];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="hero-banner-container">
      {/* Background ambient lighting and curves */}
      <div className="hero-bg-glow"></div>
      <div className="hero-arc-overlay"></div>

      {/* Main Content Area */}
      <div className="hero-content-left">
        {/* Top Frosted Pill Badge */}
        <div className="hero-badge">
          <Sparkles size={14} className="hero-badge-sparkle" />
          <span>{slide.badge}</span>
        </div>

        {/* Heading */}
        <h2 className="hero-title">{slide.title}</h2>

        {/* Description */}
        <p className="hero-desc">{slide.description}</p>

        {/* Action Buttons */}
        <div className="hero-actions-row">
          <button
            className="hero-btn-primary"
            onClick={onGenerateHighlights}
          >
            <Play size={14} fill="currentColor" />
            <span>{slide.primaryAction.text}</span>
          </button>

          <button
            className="hero-btn-secondary"
            onClick={onOpenLiveKeynotes}
          >
            <Video size={14} />
            <span>{slide.secondaryAction.text}</span>
          </button>
        </div>
      </div>

      {/* Right Visual: Overlapping Keynote Thumbnails with Live Badge */}
      <div className="hero-visual-right">
        <div className="hero-circles-group">
          {/* Circular image 1 - Conference Speaker */}
          <div className="keynote-bubble bubble-1">
            <img
              src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=300&h=300&q=80"
              alt="Conference stage speaker"
              className="bubble-img"
            />
          </div>

          {/* Circular image 2 - Main Live Stage (Center) */}
          <div className="keynote-bubble bubble-2 main-live">
            <img
              src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=300&h=300&q=80"
              alt="Global keynote presentation"
              className="bubble-img"
            />
            {/* Red Pulsing LIVE Badge */}
            <div className="bubble-live-tag">
              <span className="live-badge-red">LIVE</span>
            </div>
          </div>

          {/* Circular image 3 - Audience & Forum */}
          <div className="keynote-bubble bubble-3">
            <img
              src="https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=300&h=300&q=80"
              alt="Audience applauding"
              className="bubble-img"
            />
          </div>
        </div>
      </div>

      {/* Bottom Carousel Indicator Dots */}
      <div className="hero-carousel-dots">
        {HERO_SLIDES.map((_, idx: number) => (
          <button
            key={idx}
            className={`carousel-dot ${idx === currentSlideIndex ? 'active' : ''}`}
            onClick={() => setCurrentSlideIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
