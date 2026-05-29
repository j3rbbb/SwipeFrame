import React from 'react';

const GrainOverlay: React.FC = React.memo(() => {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 9999,
        opacity: 0.03,
      }}
    >
      <svg style={{ width: '100%', height: '100%' }}>
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves={3}
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" opacity="0.5" />
      </svg>
    </div>
  );
});

GrainOverlay.displayName = 'GrainOverlay';

export default GrainOverlay;
