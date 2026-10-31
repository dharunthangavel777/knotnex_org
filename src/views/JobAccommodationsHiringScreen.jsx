import React, { useState, useEffect } from 'react';
import BackButton from '../components/common/BackButton';
import CareerAutoFillFloatingButton from '../components/CareerAutoFillFloatingButton';

export default function JobAccommodationsHiringScreen({
  jobData,
  onBackToDetails,
  onProceedToFormBuilder,
  showToast
}) {
  useEffect(() => {
    const resetScroll = () => {
      const mainArea = document.getElementById('mainContentArea');
      if (mainArea) mainArea.scrollTop = 0;
      window.scrollTo(0, 0);
    };
    resetScroll();
    requestAnimationFrame(resetScroll);
    const t = setTimeout(resetScroll, 50);
    return () => clearTimeout(t);
  }, []);

  // 1. Workplace Accommodations
  const [accommodations, setAccommodations] = useState(() => (
    jobData.accommodations && jobData.accommodations.length > 0
      ? jobData.accommodations
      : [
          { id: 'acc-1', label: 'Wheelchair Ramp, Elevator & Step-Free Campus', checked: true },
          { id: 'acc-2', label: 'Indian Sign Language (ISL) Interpreters for Meetings', checked: true },
          { id: 'acc-3', label: 'Screen Reader & Tactile / Braille Tools (NVDA / JAWS)', checked: true },
          { id: 'acc-4', label: 'Quiet / Low-Sensory Focus Pods & Noise-Canceling Gear', checked: true },
          { id: 'acc-5', label: 'Flexible Work Hours & Asynchronous Collaboration', checked: true },
          { id: 'acc-6', label: 'Accessible Commute Reimbursement & Reserved Parking', checked: false }
        ]
  ));
  const [newAccText, setNewAccText] = useState('');
  const [isAddingAcc, setIsAddingAcc] = useState(false);

  // 2. Hiring Stages Timeline
  const [hiringStages, setHiringStages] = useState(() => (
    jobData.hiringStages && jobData.hiringStages.length > 0
      ? jobData.hiringStages
      : [
          { step: 1, title: 'Accessible Application Review', duration: '3-5 Business Days', desc: 'Holistic review of experience, skills, and accessibility preferences.' },
          { step: 2, title: 'Adaptive Technical / Skill Assessment', duration: 'Flexible Format', desc: 'Choice of written, spoken, or project-based format with extra time provided.' },
          { step: 3, title: 'Culture & Accommodations Fit Conversation', duration: '45 mins', desc: 'Meeting with team and accessibility coordinator (ISL interpreters welcome).' },
          { step: 4, title: 'Offer Letter & Assistive Hardware Setup', duration: 'Final Step', desc: 'Official offer and pre-joining assistive hardware customization.' }
        ]
  ));
  const [newStageTitle, setNewStageTitle] = useState('');
  const [newStageDuration, setNewStageDuration] = useState('');
  const [newStageDesc, setNewStageDesc] = useState('');
  const [isAddingStage, setIsAddingStage] = useState(false);

  // 3. Inclusive Perks & Benefits
  const [perks, setPerks] = useState(() => (
    jobData.perks && jobData.perks.length > 0
      ? jobData.perks
      : [
          'Comprehensive Medical Insurance (with disability & therapy coverage)',
          '₹1,50,000 Assistive Device & Home Office Setup Budget',
          'Mental Wellness Days & Flexible Caregiver Leave',
          'Annual Learning & Professional Growth Grant'
        ]
  ));
  const [newPerk, setNewPerk] = useState('');

  // 4. Candidate FAQs
  const [faqs, setFaqs] = useState(() => (
    jobData.faqs && jobData.faqs.length > 0
      ? jobData.faqs
      : [
          { q: 'Can I request an alternate interview format?', a: 'Yes! Knotnex partner companies provide alternative audio, text, or visual interview formats upon request.' },
          { q: 'Is remote work permanently supported?', a: 'Yes, fully remote accommodations with hardware shipping are supported for this opening.' }
        ]
  ));
  const [newFaqQ, setNewFaqQ] = useState('');
  const [newFaqA, setNewFaqA] = useState('');
  const [isAddingFaq, setIsAddingFaq] = useState(false);

  const toggleAccommodation = (id) => {
    setAccommodations(prev => prev.map(a => a.id === id ? { ...a, checked: !a.checked } : a));
  };

  const handleAddAcc = () => {
    if (!newAccText.trim()) return;
    setAccommodations(prev => [...prev, { id: `acc-${Date.now()}`, label: newAccText.trim(), checked: true }]);
    setNewAccText('');
    setIsAddingAcc(false);
  };

  const handleAddStage = () => {
    if (!newStageTitle.trim()) return;
    setHiringStages(prev => [
      ...prev,
      {
        step: prev.length + 1,
        title: newStageTitle.trim(),
        duration: newStageDuration.trim() || 'Flexible',
        desc: newStageDesc.trim() || 'Process step details.'
      }
    ]);
    setNewStageTitle('');
    setNewStageDuration('');
    setNewStageDesc('');
    setIsAddingStage(false);
  };

  const moveStageUp = (index) => {
    if (index <= 0) return;
    setHiringStages(prev => {
      const copy = [...prev];
      const temp = copy[index - 1];
      copy[index - 1] = copy[index];
      copy[index] = temp;
      return copy.map((s, idx) => ({ ...s, step: idx + 1 }));
    });
  };

  const moveStageDown = (index) => {
    setHiringStages(prev => {
      if (index >= prev.length - 1) return prev;
      const copy = [...prev];
      const temp = copy[index + 1];
      copy[index + 1] = copy[index];
      copy[index] = temp;
      return copy.map((s, idx) => ({ ...s, step: idx + 1 }));
    });
  };

  const handleRemoveStage = (index) => {
    setHiringStages(prev => prev.filter((_, idx) => idx !== index).map((s, idx) => ({ ...s, step: idx + 1 })));
  };

  const handleAddPerk = () => {
    if (!newPerk.trim()) return;
    setPerks(prev => [...prev, newPerk.trim()]);
    setNewPerk('');
  };

  const handleRemovePerk = (index) => {
    setPerks(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddFaq = () => {
    if (!newFaqQ.trim() || !newFaqA.trim()) return;
    setFaqs(prev => [...prev, { q: newFaqQ.trim(), a: newFaqA.trim() }]);
    setNewFaqQ('');
    setNewFaqA('');
    setIsAddingFaq(false);
  };

  const handleNext = () => {
    onProceedToFormBuilder({
      accommodations,
      hiringStages,
      perks,
      faqs
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 80px)', position: 'relative' }}>
      {/* Top Breadcrumb & Navigation */}
      <div
        style={{
          padding: '16px 24px',
          borderBottom: '1px solid #E2E8F0',
          backgroundColor: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <BackButton onClick={onBackToDetails} label="Back to Role Details" />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  backgroundColor: '#EDE9FE',
                  color: '#6D28D9',
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '3px 8px',
                  borderRadius: '6px',
                  textTransform: 'uppercase'
                }}
              >
                Stage 2 of 3
              </span>
              <span style={{ fontSize: '13px', color: '#64748B', fontWeight: 500 }}>
                {jobData.title || 'Career Opportunity'}
              </span>
            </div>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#0F172A', margin: '4px 0 0 0' }}>
              Workplace Accommodations & Hiring Process
            </h2>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            type="button"
            onClick={onBackToDetails}
            style={{
              padding: '9px 16px',
              borderRadius: '10px',
              border: '1px solid #CBD5E1',
              backgroundColor: '#FFFFFF',
              color: '#475569',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Previous
          </button>
          <button
            type="button"
            onClick={handleNext}
            style={{
              padding: '9px 20px',
              borderRadius: '10px',
              border: 'none',
              backgroundColor: '#6D28D9',
              color: '#FFFFFF',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(109, 40, 217, 0.25)'
            }}
          >
            Next: Application Form Builder →
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ padding: '24px', maxWidth: '1000px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>

          {/* Section 1: Inclusive Workplace Accommodations */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '24px' }}>
            <div style={{ marginBottom: '16px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
                ♿ Workplace Accessibility Provisions
              </h3>
              <p style={{ fontSize: '13px', color: '#64748B', margin: '4px 0 0 0' }}>
                Select the physical and digital accommodations your workplace or remote setup provides for specially-abled hires.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px' }}>
              {accommodations.map((acc) => (
                <label
                  key={acc.id}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    padding: '12px 14px',
                    borderRadius: '10px',
                    backgroundColor: acc.checked ? '#F5F3FF' : '#F8FAFC',
                    border: `1.5px solid ${acc.checked ? '#8B5CF6' : '#E2E8F0'}`,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <input
                    type="checkbox"
                    checked={acc.checked}
                    onChange={() => toggleAccommodation(acc.id)}
                    style={{ accentColor: '#6D28D9', width: '16px', height: '16px', marginTop: '2px' }}
                  />
                  <span style={{ fontSize: '13px', fontWeight: acc.checked ? 600 : 500, color: acc.checked ? '#4C1D95' : '#334155' }}>
                    {acc.label}
                  </span>
                </label>
              ))}
            </div>

            {isAddingAcc ? (
              <div style={{ marginTop: '14px', display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  placeholder="e.g. Tactile floor indicators & Braille documentation"
                  value={newAccText}
                  onChange={(e) => setNewAccText(e.target.value)}
                  style={{
                    flex: 1,
                    height: '38px',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    padding: '0 12px',
                    fontSize: '13px'
                  }}
                />
                <button
                  type="button"
                  onClick={handleAddAcc}
                  style={{
                    padding: '0 16px',
                    borderRadius: '8px',
                    backgroundColor: '#6D28D9',
                    color: '#fff',
                    border: 'none',
                    fontWeight: 600,
                    fontSize: '12.5px',
                    cursor: 'pointer'
                  }}
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddingAcc(false)}
                  style={{
                    padding: '0 12px',
                    borderRadius: '8px',
                    backgroundColor: '#F1F5F9',
                    color: '#475569',
                    border: 'none',
                    fontSize: '12.5px',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsAddingAcc(true)}
                style={{
                  marginTop: '14px',
                  background: 'none',
                  border: 'none',
                  color: '#6D28D9',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                + Add Custom Workplace Accommodation
              </button>
            )}
          </div>

          {/* Section 2: Multi-Stage Hiring Timeline */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '24px' }}>
            <div style={{ marginBottom: '16px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
                🗓️ Inclusive Hiring Process Timeline
              </h3>
              <p style={{ fontSize: '13px', color: '#64748B', margin: '4px 0 0 0' }}>
                Show candidates what to expect at each interview and evaluation milestone.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {hiringStages.map((stg, i) => (
                <div
                  key={stg.step || i}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '14px',
                    padding: '14px',
                    borderRadius: '12px',
                    backgroundColor: '#F8FAFC',
                    border: '1px solid #E2E8F0'
                  }}
                >
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: '#6D28D9',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '13px',
                      fontWeight: 700,
                      flexShrink: 0
                    }}
                  >
                    {i + 1}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '13.5px', fontWeight: 700, color: '#0F172A' }}>{stg.title}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '11.5px', color: '#6D28D9', fontWeight: 600, backgroundColor: '#EDE9FE', padding: '2px 8px', borderRadius: '6px' }}>
                          {stg.duration}
                        </span>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <button
                            type="button"
                            onClick={() => moveStageUp(i)}
                            disabled={i === 0}
                            style={{
                              width: '24px',
                              height: '24px',
                              borderRadius: '6px',
                              border: '1px solid #CBD5E1',
                              background: i === 0 ? '#F1F5F9' : '#FFFFFF',
                              color: i === 0 ? '#94A3B8' : '#334155',
                              cursor: i === 0 ? 'not-allowed' : 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '12px',
                              fontWeight: 'bold',
                              padding: 0
                            }}
                            title="Move Stage Earlier"
                          >
                            ↑
                          </button>
                          <button
                            type="button"
                            onClick={() => moveStageDown(i)}
                            disabled={i === hiringStages.length - 1}
                            style={{
                              width: '24px',
                              height: '24px',
                              borderRadius: '6px',
                              border: '1px solid #CBD5E1',
                              background: i === hiringStages.length - 1 ? '#F1F5F9' : '#FFFFFF',
                              color: i === hiringStages.length - 1 ? '#94A3B8' : '#334155',
                              cursor: i === hiringStages.length - 1 ? 'not-allowed' : 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '12px',
                              fontWeight: 'bold',
                              padding: 0
                            }}
                            title="Move Stage Later"
                          >
                            ↓
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRemoveStage(i)}
                            style={{
                              width: '24px',
                              height: '24px',
                              borderRadius: '6px',
                              border: '1px solid #FECACA',
                              background: '#FEF2F2',
                              color: '#DC2626',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '14px',
                              lineHeight: 1,
                              padding: 0
                            }}
                            title="Delete Stage"
                          >
                            &times;
                          </button>
                        </div>
                      </div>
                    </div>
                    <p style={{ fontSize: '12.5px', color: '#475569', margin: '4px 0 0 0' }}>{stg.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {isAddingStage ? (
              <div style={{ marginTop: '14px', padding: '14px', borderRadius: '10px', backgroundColor: '#F8FAFC', border: '1px solid #CBD5E1', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <input
                  type="text"
                  placeholder="Stage Title (e.g. Adaptive Take-Home Project)"
                  value={newStageTitle}
                  onChange={(e) => setNewStageTitle(e.target.value)}
                  style={{ height: '36px', borderRadius: '8px', border: '1px solid #CBD5E1', padding: '0 10px', fontSize: '13px' }}
                />
                <input
                  type="text"
                  placeholder="Expected Duration (e.g. 3-4 Days)"
                  value={newStageDuration}
                  onChange={(e) => setNewStageDuration(e.target.value)}
                  style={{ height: '36px', borderRadius: '8px', border: '1px solid #CBD5E1', padding: '0 10px', fontSize: '13px' }}
                />
                <input
                  type="text"
                  placeholder="Stage description and candidate accommodations allowed"
                  value={newStageDesc}
                  onChange={(e) => setNewStageDesc(e.target.value)}
                  style={{ height: '36px', borderRadius: '8px', border: '1px solid #CBD5E1', padding: '0 10px', fontSize: '13px' }}
                />
                <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                  <button
                    type="button"
                    onClick={handleAddStage}
                    style={{ padding: '7px 14px', borderRadius: '8px', backgroundColor: '#6D28D9', color: '#fff', border: 'none', fontWeight: 600, fontSize: '12.5px', cursor: 'pointer' }}
                  >
                    Save Stage
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAddingStage(false)}
                    style={{ padding: '7px 12px', borderRadius: '8px', backgroundColor: '#E2E8F0', color: '#334155', border: 'none', fontSize: '12.5px', cursor: 'pointer' }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsAddingStage(true)}
                style={{
                  marginTop: '14px',
                  background: 'none',
                  border: 'none',
                  color: '#6D28D9',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                + Add Hiring Process Step
              </button>
            )}
          </div>

          {/* Section 3: Inclusive Perks & Benefits */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '24px' }}>
            <div style={{ marginBottom: '14px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
                🎁 Inclusive Perks & Health Benefits
              </h3>
              <p style={{ fontSize: '13px', color: '#64748B', margin: '4px 0 0 0' }}>
                Highlight incentives and benefits tailored for accessibility and wellness.
              </p>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
              {perks.map((prk, i) => (
                <div
                  key={i}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    backgroundColor: '#EDE9FE',
                    color: '#5B21B6',
                    fontSize: '12.5px',
                    fontWeight: 600
                  }}
                >
                  <span>{prk}</span>
                  <button
                    type="button"
                    onClick={() => handleRemovePerk(i)}
                    style={{ background: 'none', border: 'none', color: '#7C3AED', cursor: 'pointer', padding: 0, fontSize: '14px' }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                placeholder="Add custom perk (e.g. Subsidized assistive cab service)"
                value={newPerk}
                onChange={(e) => setNewPerk(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddPerk(); } }}
                style={{ flex: 1, height: '36px', borderRadius: '8px', border: '1px solid #CBD5E1', padding: '0 10px', fontSize: '13px' }}
              />
              <button
                type="button"
                onClick={handleAddPerk}
                style={{ padding: '0 14px', borderRadius: '8px', backgroundColor: '#6D28D9', color: '#fff', border: 'none', fontWeight: 600, fontSize: '12.5px', cursor: 'pointer' }}
              >
                Add Perk
              </button>
            </div>
          </div>

          {/* Section 4: Candidate FAQs */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '24px' }}>
            <div style={{ marginBottom: '14px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
                💬 Candidate Questions & Accessibility FAQs
              </h3>
              <p style={{ fontSize: '13px', color: '#64748B', margin: '4px 0 0 0' }}>
                Answer common candidate questions regarding the workplace culture and accommodations.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {faqs.map((f, i) => (
                <div key={i} style={{ padding: '12px', borderRadius: '10px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>Q: {f.q}</div>
                  <div style={{ fontSize: '12.5px', color: '#475569', marginTop: '4px' }}>A: {f.a}</div>
                </div>
              ))}
            </div>

            {isAddingFaq ? (
              <div style={{ marginTop: '12px', padding: '12px', borderRadius: '10px', backgroundColor: '#F8FAFC', border: '1px solid #CBD5E1', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <input
                  type="text"
                  placeholder="Candidate Question (e.g. Can I bring my service animal?)"
                  value={newFaqQ}
                  onChange={(e) => setNewFaqQ(e.target.value)}
                  style={{ height: '36px', borderRadius: '8px', border: '1px solid #CBD5E1', padding: '0 10px', fontSize: '13px' }}
                />
                <textarea
                  placeholder="Answer detailing your company's positive accommodation policy..."
                  rows={2}
                  value={newFaqA}
                  onChange={(e) => setNewFaqA(e.target.value)}
                  style={{ borderRadius: '8px', border: '1px solid #CBD5E1', padding: '8px 10px', fontSize: '13px', resize: 'vertical' }}
                />
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={handleAddFaq}
                    style={{ padding: '6px 14px', borderRadius: '8px', backgroundColor: '#6D28D9', color: '#fff', border: 'none', fontWeight: 600, fontSize: '12.5px', cursor: 'pointer' }}
                  >
                    Add FAQ
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAddingFaq(false)}
                    style={{ padding: '6px 12px', borderRadius: '8px', backgroundColor: '#E2E8F0', color: '#334155', border: 'none', fontSize: '12.5px', cursor: 'pointer' }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsAddingFaq(true)}
                style={{
                  marginTop: '12px',
                  background: 'none',
                  border: 'none',
                  color: '#6D28D9',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                + Add Candidate FAQ
              </button>
            )}
          </div>

        </div>
      </div>

      <CareerAutoFillFloatingButton
        onApplyPreset={(p) => {
          setAccommodations(p.accommodations);
          setHiringStages(p.hiringStages);
          setPerks(p.perks);
          setFaqs(p.faqs);
          showToast('Autofilled stage 2 from ' + p.title, 'success');
        }}
        onClearForm={() => {
          setAccommodations([]);
          setHiringStages([]);
          setPerks([]);
          setFaqs([]);
        }}
      />
    </div>
  );
}
