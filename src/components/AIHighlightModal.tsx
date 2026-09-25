import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Link2,
  CheckCircle2,
  Clock,
  Quote,
  TrendingUp,
  Download,
  Loader2,
  Film
} from 'lucide-react';

interface AIHighlightModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (message: string) => void;
}

export const AIHighlightModal: React.FC<AIHighlightModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [streamUrl, setStreamUrl] = useState('https://youtube.com/live/knotnex-keynote-2026');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedResult, setProcessedResult] = useState(false);

  if (!isOpen) return null;

  const handleProcess = () => {
    if (!streamUrl) return;
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setProcessedResult(true);
      onSuccess('AI Highlights successfully generated for stream!');
    }, 1800);
  };

  const handleReset = () => {
    setProcessedResult(false);
  };

  return (
    <div className="modal-backdrop animate-fade-in" onClick={onClose}>
      <div
        className="modal-content modal-lg animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div className="modal-title-box">
            <div className="modal-icon-badge ai-badge">
              <Sparkles size={18} />
            </div>
            <div>
              <h3 className="modal-title">AI Live Studio & Highlights</h3>
              <p className="modal-subtitle">
                Automated moment detection, speaker quotes & audience insights
              </p>
            </div>
          </div>
          <button className="btn-close-modal" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {!processedResult ? (
          <div className="ai-modal-body">
            <div className="ai-input-section">
              <label className="form-label">Livestream or Recording URL</label>
              <div className="stream-url-input-box">
                <Link2 size={16} className="url-input-icon" />
                <input
                  type="text"
                  placeholder="https://youtube.com/live/... or Twitch / Zoom URL"
                  value={streamUrl}
                  onChange={(e) => setStreamUrl(e.target.value)}
                  className="form-input url-input"
                />
              </div>
              <div className="sample-links">
                <span className="sample-label">Sample Streams:</span>
                <button
                  type="button"
                  className="sample-btn"
                  onClick={() => setStreamUrl('https://youtube.com/live/knotnex-tech-summit-2026')}
                >
                  Tech Summit 2026 (Live)
                </button>
                <button
                  type="button"
                  className="sample-btn"
                  onClick={() => setStreamUrl('https://youtube.com/live/climate-hackathon-berlin')}
                >
                  Climate Hackathon Keynote
                </button>
              </div>
            </div>

            <div className="ai-features-grid">
              <div className="ai-feature-box">
                <Clock size={18} className="feature-icon" />
                <h5>Key Moment Detection</h5>
                <p>Pinpoints high engagement peaks & applause moments</p>
              </div>
              <div className="ai-feature-box">
                <Quote size={18} className="feature-icon" />
                <h5>Quote Extraction</h5>
                <p>Auto-transcribes punchy speaker one-liners with attribution</p>
              </div>
              <div className="ai-feature-box">
                <TrendingUp size={18} className="feature-icon" />
                <h5>Audience Insights</h5>
                <p>Analyzes sentiment curves & chat reaction velocity</p>
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn-cancel" onClick={onClose}>
                Cancel
              </button>
              <button
                type="button"
                className="btn-submit-primary"
                onClick={handleProcess}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Detecting Highlights...</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={16} />
                    <span>Generate Highlights</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className="ai-result-body">
            <div className="ai-result-banner">
              <CheckCircle2 size={22} className="success-icon" />
              <div>
                <h4>Generated 6 Automated Clips & Key Quotes</h4>
                <p>Processed in 1.8 seconds • Ready to broadcast & download</p>
              </div>
            </div>

            {/* Timeline Highlights */}
            <div className="highlights-timeline-section">
              <h5 className="timeline-section-title">Detected Key Moments</h5>
              <div className="timeline-items-list">
                <div className="highlight-moment-card">
                  <div className="moment-timestamp">03:45</div>
                  <div className="moment-details">
                    <span className="moment-title">Opening Keynote & AI Platform Reveal</span>
                    <span className="moment-meta">High Applause • 98% Sentiment Score</span>
                  </div>
                  <button className="btn-clip-action">
                    <Film size={14} />
                    <span>0:45 Clip</span>
                  </button>
                </div>

                <div className="highlight-moment-card">
                  <div className="moment-timestamp">18:20</div>
                  <div className="moment-details">
                    <span className="moment-title">Live Architecture Demo & Benchmarks</span>
                    <span className="moment-meta">Peak Chat Velocity (450 msgs/min)</span>
                  </div>
                  <button className="btn-clip-action">
                    <Film size={14} />
                    <span>1:15 Clip</span>
                  </button>
                </div>

                <div className="highlight-moment-card">
                  <div className="moment-timestamp">34:10</div>
                  <div className="moment-details">
                    <span className="moment-title">Speaker Quote: "Decentralized pipelines scale effortlessly"</span>
                    <span className="moment-meta">Top Shared Quote</span>
                  </div>
                  <button className="btn-clip-action">
                    <Film size={14} />
                    <span>0:30 Reel</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn-cancel" onClick={handleReset}>
                Process Another Stream
              </button>
              <button
                type="button"
                className="btn-submit-primary"
                onClick={() => {
                  onSuccess('Clips exported to Media Asset Manager!');
                  onClose();
                }}
              >
                <Download size={16} />
                <span>Export All Clips</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
