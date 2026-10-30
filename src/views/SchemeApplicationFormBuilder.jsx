import React, { useState, useEffect } from 'react';
import BackButton from '../components/common/BackButton';

export default function SchemeApplicationFormBuilder({
  schemeData,
  onPublishComplete,
  onBackToEligibility,
  showToast,
  isEditing
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

  // 1. Application Mode: Direct in-platform vs External portal
  const [isDirectApplication, setIsDirectApplication] = useState(
    () => schemeData.isDirectApplication !== undefined ? schemeData.isDirectApplication : true
  );

  // 2. Beneficiary Required Fields
  const [requireUdid, setRequireUdid] = useState(true);
  const [requireGuardian, setRequireGuardian] = useState(false);
  const [requireDbtBank, setRequireDbtBank] = useState(
    () => schemeData.grantAmount && schemeData.grantAmount.includes('₹')
  );

  // 3. Document Upload Slots (mirrors Stage 2 documents)
  const [docSlots, setDocSlots] = useState(() => (
    schemeData.requirements && schemeData.requirements.length > 0
      ? schemeData.requirements.map((doc, idx) => ({ id: `doc-${idx}`, title: doc, required: true }))
      : [
          { id: 'doc-1', title: 'UDID / Disability Certificate (PDF/JPG)', required: true },
          { id: 'doc-2', title: 'Aadhaar Card Copy', required: true },
          { id: 'doc-3', title: 'Income Certificate / BPL Card', required: false },
          { id: 'doc-4', title: 'Medical Prescription / Device Recommendation', required: false }
        ]
  ));
  const [newDocSlot, setNewDocSlot] = useState('');
  const [isAddingDocSlot, setIsAddingDocSlot] = useState(false);

  // 4. Custom Screening Questions
  const [customQuestions, setCustomQuestions] = useState(() => [
    { id: 'sq-1', question: 'Have you received any government assistive grant in the last 3 years?', type: 'YES/NO', required: true },
    { id: 'sq-2', question: 'Preferred fitting / distribution center district', type: 'SHORT TEXT', required: false }
  ]);
  const [newQuestionTitle, setNewQuestionTitle] = useState('');
  const [newQuestionType, setNewQuestionType] = useState('YES/NO');
  const [isAddingQuestion, setIsAddingQuestion] = useState(false);

  const toggleDocSlot = (id) => {
    setDocSlots(prev => prev.map(d => d.id === id ? { ...d, required: !d.required } : d));
  };

  const handleAddDocSlot = () => {
    if (!newDocSlot.trim()) return;
    setDocSlots(prev => [...prev, { id: `doc-${Date.now()}`, title: newDocSlot.trim(), required: true }]);
    setNewDocSlot('');
    setIsAddingDocSlot(false);
  };

  const handleRemoveDocSlot = (id) => {
    setDocSlots(prev => prev.filter(d => d.id !== id));
  };

  const handleAddQuestion = () => {
    if (!newQuestionTitle.trim()) return;
    setCustomQuestions(prev => [
      ...prev,
      { id: `sq-${Date.now()}`, question: newQuestionTitle.trim(), type: newQuestionType, required: false }
    ]);
    setNewQuestionTitle('');
    setIsAddingQuestion(false);
  };

  const handleRemoveQuestion = (id) => {
    setCustomQuestions(prev => prev.filter(q => q.id !== id));
  };

  const handlePublish = () => {
    const formConfig = {
      isDirectApplication,
      requireUdid,
      requireGuardian,
      requireDbtBank,
      documentSlots: docSlots,
      customQuestions
    };
    onPublishComplete(formConfig);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 80px)', position: 'relative' }}>
      {/* Top Header & Breadcrumb */}
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
          <BackButton onClick={onBackToEligibility} label="Back to Eligibility & Steps" />
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
                Stage 3 of 3
              </span>
              <span style={{ fontSize: '13px', color: '#64748B', fontWeight: 500 }}>
                {schemeData.title || 'Scheme Application Setup'}
              </span>
            </div>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#0F172A', margin: '4px 0 0 0' }}>
              Beneficiary Application Form Builder
            </h2>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            type="button"
            onClick={onBackToEligibility}
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
            onClick={handlePublish}
            style={{
              padding: '9px 24px',
              borderRadius: '10px',
              border: 'none',
              background: 'linear-gradient(135deg, #6336EB, #4D25C9)',
              color: '#FFFFFF',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(99, 54, 235, 0.25)'
            }}
          >
            {isEditing ? 'Save Scheme Changes' : 'Publish Scheme Now ✓'}
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div style={{ padding: '24px', maxWidth: '1000px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

          {/* Section 1: Application Intake Mode */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A', margin: '0 0 4px 0' }}>
              📥 Beneficiary Submission Intake Mode
            </h3>
            <p style={{ fontSize: '13px', color: '#64748B', margin: '0 0 16px 0' }}>
              Choose whether beneficiaries apply directly inside Knotnex or are guided to an external government portal.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div
                onClick={() => setIsDirectApplication(true)}
                style={{
                  padding: '16px',
                  borderRadius: '12px',
                  border: `2px solid ${isDirectApplication ? '#6D28D9' : '#E2E8F0'}`,
                  backgroundColor: isDirectApplication ? '#F5F3FF' : '#FFFFFF',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                  <input type="radio" checked={isDirectApplication} onChange={() => {}} style={{ accentColor: '#6D28D9' }} />
                  <span style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A' }}>Direct In-Platform Application</span>
                </div>
                <p style={{ fontSize: '12.5px', color: '#475569', margin: 0, paddingLeft: '24px' }}>
                  Applicants fill out information and upload documents directly on Knotnex mobile app. Organizers review and manage applications in this dashboard.
                </p>
              </div>

              <div
                onClick={() => setIsDirectApplication(false)}
                style={{
                  padding: '16px',
                  borderRadius: '12px',
                  border: `2px solid ${!isDirectApplication ? '#6D28D9' : '#E2E8F0'}`,
                  backgroundColor: !isDirectApplication ? '#F5F3FF' : '#FFFFFF',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                  <input type="radio" checked={!isDirectApplication} onChange={() => {}} style={{ accentColor: '#6D28D9' }} />
                  <span style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A' }}>External Portal Redirection</span>
                </div>
                <p style={{ fontSize: '12.5px', color: '#475569', margin: 0, paddingLeft: '24px' }}>
                  Knotnex displays guidelines, documents checklist, and provides a direct verified link to the official external portal ({schemeData.portalUrl || 'Gov Portal'}).
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: Core Beneficiary Fields (Direct mode only) */}
          {isDirectApplication && (
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '24px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A', margin: '0 0 4px 0' }}>
                🪪 Core Beneficiary Identification & Bank Details
              </h3>
              <p style={{ fontSize: '13px', color: '#64748B', margin: '0 0 16px 0' }}>
                Configure mandatory demographic and verification fields for applicants.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', borderRadius: '10px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={requireUdid}
                    onChange={(e) => setRequireUdid(e.target.checked)}
                    style={{ accentColor: '#6D28D9', width: '16px', height: '16px' }}
                  />
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#0F172A' }}>Require Unique Disability ID (UDID) Number</div>
                    <div style={{ fontSize: '12px', color: '#64748B' }}>Enforces valid 18-digit UDID format check before application submission.</div>
                  </div>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', borderRadius: '10px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={requireDbtBank}
                    onChange={(e) => setRequireDbtBank(e.target.checked)}
                    style={{ accentColor: '#6D28D9', width: '16px', height: '16px' }}
                  />
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#0F172A' }}>Require Direct Benefit Transfer (DBT) Bank Account &amp; IFSC</div>
                    <div style={{ fontSize: '12px', color: '#64748B' }}>Collects applicant's bank account, IFSC code, and account holder name for grant disbursement.</div>
                  </div>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', borderRadius: '10px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={requireGuardian}
                    onChange={(e) => setRequireGuardian(e.target.checked)}
                    style={{ accentColor: '#6D28D9', width: '16px', height: '16px' }}
                  />
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#0F172A' }}>Guardian / Caregiver Details for Minors &amp; High-Support Applicants</div>
                    <div style={{ fontSize: '12px', color: '#64748B' }}>Adds primary contact, relation, and phone fields for guardian accompaniment.</div>
                  </div>
                </label>
              </div>
            </div>
          )}

          {/* Section 3: Document Upload Slots */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
                  📄 Mandatory Document Upload Slots
                </h3>
                <p style={{ fontSize: '13px', color: '#64748B', margin: '4px 0 0 0' }}>
                  Applicants will be prompted to upload files for each required slot (PDF, JPG, max 5MB).
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {docSlots.map((slot) => (
                <div
                  key={slot.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    backgroundColor: slot.required ? '#F5F3FF' : '#F8FAFC',
                    border: `1px solid ${slot.required ? '#C4B5FD' : '#E2E8F0'}`
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <input
                      type="checkbox"
                      checked={slot.required}
                      onChange={() => toggleDocSlot(slot.id)}
                      style={{ accentColor: '#6D28D9', width: '15px', height: '15px' }}
                    />
                    <span style={{ fontSize: '13px', fontWeight: slot.required ? 600 : 500, color: '#0F172A' }}>
                      {slot.title}
                    </span>
                    {slot.required && (
                      <span style={{ fontSize: '11px', color: '#6D28D9', fontWeight: 700, backgroundColor: '#EDE9FE', padding: '2px 6px', borderRadius: '4px' }}>
                        Mandatory
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveDocSlot(slot.id)}
                    style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', fontSize: '13px' }}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {isAddingDocSlot ? (
              <div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  placeholder="Document Slot Name (e.g. Domicile / Residence Certificate)"
                  value={newDocSlot}
                  onChange={(e) => setNewDocSlot(e.target.value)}
                  style={{ flex: 1, height: '36px', borderRadius: '8px', border: '1px solid #CBD5E1', padding: '0 10px', fontSize: '13px' }}
                />
                <button
                  type="button"
                  onClick={handleAddDocSlot}
                  style={{ padding: '0 14px', borderRadius: '8px', backgroundColor: '#6D28D9', color: '#fff', border: 'none', fontWeight: 600, fontSize: '12.5px', cursor: 'pointer' }}
                >
                  Add Slot
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddingDocSlot(false)}
                  style={{ padding: '0 10px', borderRadius: '8px', backgroundColor: '#F1F5F9', color: '#475569', border: 'none', fontSize: '12.5px', cursor: 'pointer' }}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsAddingDocSlot(true)}
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
                + Add Custom Document Slot
              </button>
            )}
          </div>

          {/* Section 4: Custom Screening Questions */}
          {isDirectApplication && (
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '24px' }}>
              <div style={{ marginBottom: '14px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
                  ❓ Custom Beneficiary Verification Questions
                </h3>
                <p style={{ fontSize: '13px', color: '#64748B', margin: '4px 0 0 0' }}>
                  Ask targeted screening questions to verify eligibility before approving grants.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {customQuestions.map((q) => (
                  <div
                    key={q.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      backgroundColor: '#F8FAFC',
                      border: '1px solid #E2E8F0'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: '#0F172A' }}>{q.question}</div>
                      <div style={{ fontSize: '11.5px', color: '#64748B', marginTop: '2px' }}>Type: {q.type}</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveQuestion(q.id)}
                      style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', fontSize: '13px' }}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              {isAddingQuestion ? (
                <div style={{ marginTop: '12px', padding: '12px', borderRadius: '10px', backgroundColor: '#F8FAFC', border: '1px solid #CBD5E1', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <input
                    type="text"
                    placeholder="Question (e.g. Do you already receive a monthly disability pension?)"
                    value={newQuestionTitle}
                    onChange={(e) => setNewQuestionTitle(e.target.value)}
                    style={{ height: '36px', borderRadius: '8px', border: '1px solid #CBD5E1', padding: '0 10px', fontSize: '13px' }}
                  />
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <select
                      value={newQuestionType}
                      onChange={(e) => setNewQuestionType(e.target.value)}
                      style={{ height: '34px', borderRadius: '8px', border: '1px solid #CBD5E1', padding: '0 8px', fontSize: '12.5px', backgroundColor: '#fff' }}
                    >
                      <option value="YES/NO">Yes / No Toggle</option>
                      <option value="SHORT TEXT">Short Text</option>
                      <option value="DROPDOWN">Dropdown Choice</option>
                    </select>
                    <button
                      type="button"
                      onClick={handleAddQuestion}
                      style={{ padding: '0 14px', borderRadius: '8px', backgroundColor: '#6D28D9', color: '#fff', border: 'none', fontWeight: 600, fontSize: '12.5px', cursor: 'pointer' }}
                    >
                      Save Question
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsAddingQuestion(false)}
                      style={{ padding: '0 10px', borderRadius: '8px', backgroundColor: '#E2E8F0', color: '#334155', border: 'none', fontSize: '12.5px', cursor: 'pointer' }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsAddingQuestion(true)}
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
                  + Add Beneficiary Question
                </button>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
