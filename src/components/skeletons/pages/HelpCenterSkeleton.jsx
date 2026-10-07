import React from 'react';
import {
  SkeletonLine,
  SkeletonCircle,
  SkeletonPill,
  SkeletonBtn,
  SkeletonBox,
  SkeletonHeader
} from '../SkeletonPrimitives';

export default function HelpCenterSkeleton() {
  return (
    <section className="app-view active skeleton-page-view" id="skeletonViewHelpCenter">
      <SkeletonHeader
        titleWidth="160px"
        subtitleWidth="420px"
        btnWidth="130px"
      />

      {/* Hero Search Banner Skeleton */}
      <div className="help-hero-banner" style={{ background: '#FFFFFF', border: '1px solid var(--border-default)', borderRadius: '16px', padding: '36px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '20px 0 28px' }}>
        <SkeletonLine width="380px" height="26px" style={{ borderRadius: '6px' }} />
        <SkeletonLine width="480px" height="13px" />
        <SkeletonBox width="520px" height="46px" radius={24} style={{ marginTop: '10px' }} />
      </div>

      {/* 6 Categories Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px', marginBottom: '32px' }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} style={{ background: '#FFFFFF', border: '1px solid var(--border-default)', borderRadius: '14px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <SkeletonCircle size={40} style={{ borderRadius: '10px' }} />
              <SkeletonPill width={60} height={20} />
            </div>
            <SkeletonLine width="140px" height="16px" style={{ borderRadius: '4px' }} />
            <SkeletonLine width="90%" height="11px" />
            <SkeletonLine width="75%" height="11px" />
          </div>
        ))}
      </div>
    </section>
  );
}
