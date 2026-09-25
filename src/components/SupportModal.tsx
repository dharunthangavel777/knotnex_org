import React, { useState } from 'react';
import { X, Headphones, PhoneCall, MessageSquare, Clock, Send } from 'lucide-react';

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (message: string) => void;
}

export const SupportModal: React.FC<SupportModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [activeTab, setActiveTab] = useState<'call' | 'chat'>('call');
  const [phoneNumber, setPhoneNumber] = useState('+1 (555) 389-4021');
  const [urgency, setUrgency] = useState('High (Live Stream Issue)');
  const [callRequested, setCallRequested] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatLog, setChatLog] = useState([
    {
      sender: 'expert',
      text: 'Hello Ravi! This is Sarah from Knotnex Org Technical Operations. How can I assist you with your dashboard, livestream, or grant pipeline today?',
      time: 'Just now',
    },
  ]);

  if (!isOpen) return null;

  const handleRequestCall = (e: React.FormEvent) => {
    e.preventDefault();
    setCallRequested(true);
    setTimeout(() => {
      onSuccess('A Senior Solutions Engineer is dialing your number now.');
    }, 800);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    const userMsg = { sender: 'user', text: chatMessage, time: 'Just now' };
    setChatLog((prev) => [...prev, userMsg]);
    setChatMessage('');

    setTimeout(() => {
      setChatLog((prev) => [
        ...prev,
        {
          sender: 'expert',
          text: "I've checked your organization stream health and API quotas. Everything is operating at 99.99% uptime with ultra-low latency.",
          time: 'Just now',
        },
      ]);
    }, 1000);
  };

  return (
    <div className="modal-backdrop animate-fade-in" onClick={onClose}>
      <div
        className="modal-content animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div className="modal-title-box">
            <div className="modal-icon-badge support-badge">
              <Headphones size={18} />
            </div>
            <div>
              <h3 className="modal-title">Need Support? Call the Expert</h3>
              <p className="modal-subtitle">Dedicated 24/7 Enterprise Assistance</p>
            </div>
          </div>
          <button className="btn-close-modal" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Tab switch between Phone Call and Live Chat */}
        <div className="modal-type-tabs">
          <button
            className={`type-tab-btn ${activeTab === 'call' ? 'active' : ''}`}
            onClick={() => setActiveTab('call')}
          >
            <PhoneCall size={15} />
            <span>Instant Callback</span>
          </button>
          <button
            className={`type-tab-btn ${activeTab === 'chat' ? 'active' : ''}`}
            onClick={() => setActiveTab('chat')}
          >
            <MessageSquare size={15} />
            <span>Live Engineer Chat</span>
          </button>
        </div>

        {activeTab === 'call' ? (
          !callRequested ? (
            <form onSubmit={handleRequestCall} className="modal-form">
              <div className="form-group">
                <label className="form-label">Your Phone Number</label>
                <input
                  type="text"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Urgency Level</label>
                <select
                  value={urgency}
                  onChange={(e) => setUrgency(e.target.value)}
                  className="form-select"
                >
                  <option value="Critical (Stream Outage)">Critical (Stream Outage)</option>
                  <option value="High (Live Stream Issue)">High (Live Stream Issue)</option>
                  <option value="Medium (Ticketing / Grants Question)">Medium (Ticketing / Grants Question)</option>
                  <option value="Low (General Inquiry)">Low (General Inquiry)</option>
                </select>
              </div>

              <div className="support-info-banner">
                <Clock size={16} className="info-icon" />
                <span>Average callback wait time: <strong>under 45 seconds</strong></span>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-cancel" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="btn-submit-primary">
                  <PhoneCall size={16} />
                  <span>Call Me Now</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="support-call-success">
              <div className="call-dialing-pulse">
                <PhoneCall size={28} className="dialing-icon" />
              </div>
              <h4>Dialing {phoneNumber}...</h4>
              <p>Connecting you to Senior Specialist Sarah Chen at Knotnex HQ.</p>
              <div className="modal-footer" style={{ marginTop: 24 }}>
                <button
                  type="button"
                  className="btn-submit-primary"
                  onClick={onClose}
                  style={{ width: '100%' }}
                >
                  Close & Continue Working
                </button>
              </div>
            </div>
          )
        ) : (
          <div className="support-chat-container">
            <div className="chat-log-box">
              {chatLog.map((msg, idx) => (
                <div
                  key={idx}
                  className={`chat-bubble-row ${msg.sender === 'user' ? 'user-side' : 'expert-side'}`}
                >
                  <div className="chat-bubble">
                    <div className="chat-sender-label">
                      {msg.sender === 'user' ? 'You' : 'Sarah Chen (Knotnex Lead)'}
                    </div>
                    <div className="chat-text">{msg.text}</div>
                    <div className="chat-time">{msg.time}</div>
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="chat-input-bar">
              <input
                type="text"
                placeholder="Describe your issue or ask a question..."
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                className="form-input chat-input"
                autoFocus
              />
              <button type="submit" className="btn-send-chat">
                <Send size={16} />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
