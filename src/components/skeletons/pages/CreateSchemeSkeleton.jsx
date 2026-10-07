import React from 'react';
import {
  SkeletonLine,
  SkeletonCircle,
  SkeletonPill,
  SkeletonBtn,
  SkeletonBox
} from '../SkeletonPrimitives';

export default function CreateSchemeSkeleton() {
  return (
    <section className="app-view active skeleton-page-view" id="skeletonViewCreateScheme">
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
        <SkeletonBtn width="80px" height="32px" style={{ borderRadius: '8px' }} />
        <span style={{ color: 'var(--neutral-400)' }}>/</span>
        <SkeletonLine width="130px" height="14px" />
        <SkeletonPill width={95} height={22} style={{ marginLeft: '8px' }} />
      </div>

      <div style={{ background: '#FFFFFF', border: '1px solid var(--border-default)', borderRadius: '16px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '22px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <SkeletonLine width="150px" height="13px" />
          <SkeletonBox width="100%" height="42px" radius={8} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <SkeletonLine width="110px" height="13px" />
            <SkeletonBox width="100%" height="42px" radius={8} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <SkeletonLine width="120px" height="13px" />
            <SkeletonBox width="100%" height="42px" radius={8} />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <SkeletonLine width="130px" height="13px" />
            <SkeletonBox width="100%" height="42px" radius={8} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <SkeletonLine width="140px" height="13px" />
            <SkeletonBox width="100%" height="42px" radius={8} />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <SkeletonLine width="160px" height="13px" />
          <SkeletonBox width="100%" height="80px" radius={8} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <SkeletonLine width="180px" height="13px" />
          <SkeletonBox width="100%" height="90px" radius={8} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', paddingTop: '16px', borderTop: '1px solid var(--border-default)' }}>
          <SkeletonBtn width="90px" height="40px" />
          <SkeletonBtn width="140px" height="40px" />
        </div>
      </div>
    </section>
  );
}
