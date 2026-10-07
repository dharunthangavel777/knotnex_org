import React from 'react';
import {
  SkeletonLine,
  SkeletonBtn,
  SkeletonBox
} from '../SkeletonPrimitives';

export default function CreateOpportunitySkeleton() {
  return (
    <section className="app-view active skeleton-page-view" id="skeletonViewCreateOpportunity">
      {/* Top Header: Back Button alone */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <SkeletonBtn width="72px" height="32px" style={{ borderRadius: '8px' }} />
      </div>

      {/* Main Single Column Container */}
      <div
        style={{
          maxWidth: '860px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}
      >
        {/* Card 1: Role & Position Details */}
        <div
          style={{
            background: '#FFFFFF',
            border: '1px solid var(--border-default)',
            borderRadius: '16px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px'
          }}
        >
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <SkeletonBox width="38px" height="38px" radius={10} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <SkeletonLine width="180px" height="15px" />
              <SkeletonLine width="280px" height="12px" />
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <SkeletonLine width="100px" height="12px" />
            <SkeletonBox width="100%" height="42px" radius={8} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <SkeletonLine width="90px" height="12px" />
              <SkeletonBox width="100%" height="40px" radius={8} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <SkeletonLine width="110px" height="12px" />
              <SkeletonBox width="100%" height="40px" radius={8} />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <SkeletonLine width="100px" height="12px" />
              <SkeletonBox width="100%" height="40px" radius={8} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <SkeletonLine width="100px" height="12px" />
              <SkeletonBox width="100%" height="40px" radius={8} />
            </div>
          </div>
        </div>

        {/* Card 2: Hiring Poster Banner */}
        <div
          style={{
            background: '#FFFFFF',
            border: '1px solid var(--border-default)',
            borderRadius: '16px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px'
          }}
        >
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <SkeletonBox width="38px" height="38px" radius={10} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <SkeletonLine width="160px" height="15px" />
              <SkeletonLine width="260px" height="12px" />
            </div>
          </div>
          <SkeletonBox width="100%" height="110px" radius={12} />
        </div>

        {/* Card 3: Requirements & Perks */}
        <div
          style={{
            background: '#FFFFFF',
            border: '1px solid var(--border-default)',
            borderRadius: '16px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px'
          }}
        >
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <SkeletonBox width="38px" height="38px" radius={10} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <SkeletonLine width="170px" height="15px" />
              <SkeletonLine width="300px" height="12px" />
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <SkeletonLine width="160px" height="12px" />
            <SkeletonBox width="100%" height="110px" radius={10} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <SkeletonLine width="180px" height="12px" />
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <SkeletonBox width="120px" height="34px" radius={9999} />
              <SkeletonBox width="160px" height="34px" radius={9999} />
              <SkeletonBox width="170px" height="34px" radius={9999} />
              <SkeletonBox width="140px" height="34px" radius={9999} />
              <SkeletonBox width="110px" height="34px" radius={9999} />
              <SkeletonBox width="150px" height="34px" radius={9999} />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', paddingTop: '16px', borderTop: '1px solid #F3F4F6' }}>
            <SkeletonBtn width="120px" height="40px" style={{ borderRadius: '9999px' }} />
            <SkeletonBtn width="150px" height="40px" style={{ borderRadius: '9999px' }} />
          </div>
        </div>
      </div>
    </section>
  );
}
