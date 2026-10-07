import React from 'react';
import {
  SkeletonLine,
  SkeletonCircle,
  SkeletonPill
} from '../SkeletonPrimitives';

export default function TicketsTableSkeleton({ rows = 5 }) {
  return (
    <div className="table-responsive-wrapper skeleton-fade-in" style={{ overflowX: 'auto' }}>
      <table className="recent-products-table">
        <colgroup>
          <col style={{ width: '44px' }} />
          <col style={{ width: '125px' }} />
          <col style={{ width: '160px' }} />
          <col style={{ width: '160px' }} />
          <col />
          <col style={{ width: '90px' }} />
          <col style={{ width: '100px' }} />
        </colgroup>
        <thead>
          <tr>
            <th style={{ width: '44px', textAlign: 'center' }}><SkeletonLine width="20px" height="12px" /></th>
            <th><SkeletonLine width="80px" height="12px" /></th>
            <th><SkeletonLine width="100px" height="12px" /></th>
            <th><SkeletonLine width="95px" height="12px" /></th>
            <th><SkeletonLine width="110px" height="12px" /></th>
            <th><SkeletonLine width="55px" height="12px" /></th>
            <th style={{ textAlign: 'center' }}><SkeletonLine width="45px" height="12px" /></th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, idx) => (
            <tr key={idx} className="skeleton-table-row">
              <td style={{ textAlign: 'center' }}><SkeletonLine width="20px" height="13px" /></td>
              <td>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <SkeletonLine width="60px" height="13px" />
                  <SkeletonPill width={50} height={18} />
                </div>
              </td>
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <SkeletonCircle size={32} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <SkeletonLine width="100px" height="13px" />
                    <SkeletonLine width="60px" height="10px" />
                  </div>
                </div>
              </td>
              <td>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <SkeletonLine width="90px" height="13px" />
                  <SkeletonLine width="120px" height="10px" />
                </div>
              </td>
              <td>
                <SkeletonLine width="90%" height="13px" />
              </td>
              <td>
                <SkeletonLine width="45px" height="13px" />
              </td>
              <td style={{ textAlign: 'center' }}>
                <SkeletonPill width={55} height={26} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
