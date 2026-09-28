import React, { useState } from 'react';

export default function HelpCenterView({
  knowledgeCategories,
  helpArticles,
  addToast
}) {
  const [search, setSearch] = useState('');

  const filteredCategories = knowledgeCategories.filter(c => (
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.desc.toLowerCase().includes(search.toLowerCase())
  ));

  const filteredArticles = helpArticles.filter(a => (
    a.title.toLowerCase().includes(search.toLowerCase())
  ));

  return (
    <section className="app-view active" id="viewHelpCenter">
      <div style={{ background: 'var(--brand-gradient)', borderRadius: 24, padding: 36, color: '#fff', marginBottom: 24, position: 'relative', overflow: 'hidden' }}>
        <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 8 }}>Administrator Help &amp; Documentation</h2>
        <p style={{ fontSize: 14, opacity: 0.9, maxWidth: 600, marginBottom: 20 }}>
          Find setup guides, API reference docs, gate scanner protocols, and finance compliance tutorials.
        </p>
        <div style={{ position: 'relative', maxWidth: 480 }}>
          <input
            type="text"
            className="form-input"
            placeholder="Search documentation, guides, error codes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ height: 44, paddingLeft: 40, borderRadius: 12, background: '#fff', color: 'var(--neutral-900)' }}
          />
          <span className="material-symbols-outlined" style={{ position: 'absolute', left: 12, top: 12, color: 'var(--neutral-400)' }}>search</span>
        </div>
      </div>

      {/* Categories Grid */}
      <div style={{ marginBottom: 28 }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--neutral-900)', marginBottom: 14 }}>Documentation Topics</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 18 }}>
          {filteredCategories.map(cat => (
            <div key={cat.id} style={{ background: '#fff', borderRadius: 20, border: '1px solid var(--neutral-200)', padding: 20, display: 'flex', gap: 14, cursor: 'pointer' }} onClick={() => addToast(`Opening category: ${cat.title}`, 'info')}>
              <div style={{ width: 42, height: 42, borderRadius: 12, background: 'var(--brand-50)', color: 'var(--knotnex-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span className="material-symbols-outlined">{cat.icon}</span>
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--neutral-900)', marginBottom: 4 }}>{cat.title}</div>
                <div style={{ fontSize: 12, color: 'var(--neutral-500)', marginBottom: 6 }}>{cat.count}</div>
                <div style={{ fontSize: 12, color: 'var(--neutral-600)', lineHeight: 1.4 }}>{cat.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Articles */}
      <div style={{ background: '#fff', borderRadius: 20, border: '1px solid var(--neutral-200)', padding: 24 }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--neutral-900)', marginBottom: 16 }}>Popular Guides &amp; Tutorials</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {filteredArticles.map((art, idx) => (
            <div key={idx} style={{ padding: 14, borderRadius: 12, background: 'var(--neutral-50)', border: '1px solid var(--neutral-200)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }} onClick={() => addToast(`Loading article: "${art.title}"`, 'info')}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--neutral-900)', marginBottom: 4 }}>{art.title}</div>
                <div style={{ fontSize: 12, color: 'var(--neutral-500)' }}>{art.meta}</div>
              </div>
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--success-500)', background: 'var(--success-50)', padding: '4px 10px', borderRadius: 6 }}>
                {art.helpful}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
