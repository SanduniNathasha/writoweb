import React, { useState, useEffect } from 'react';

const EmotionScreen = () => {
  const [analyzing, setAnalyzing] = useState(true);

  // Simulate analysis delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnalyzing(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full text-center">
      <h2 style={{ color: 'var(--text-primary)', fontSize: '2rem' }}>
        Look Here
      </h2>
      <p className="mb-4">Let me see your face!</p>

      <div className="focus-card">
        {/* Camera Viewport Mockup */}
        <div 
          style={{
            width: '100%',
            aspectRatio: '1',
            backgroundColor: '#ECEFF1',
            borderRadius: '16px',
            marginBottom: '1.5rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: '4px solid var(--primary-color)'
          }}
        >
          {analyzing ? (
            <div style={{ fontSize: '1.25rem', color: '#78909C', animation: 'pulse 1.5s infinite' }}>
              📷 Analysing...
            </div>
          ) : (
            <div style={{ fontSize: '5rem' }}>😃</div>
          )}
        </div>
        
        {!analyzing && (
          <div style={{ textAlign: 'left', backgroundColor: '#FAFAFA', padding: '1rem', borderRadius: '12px' }}>
            <h3 style={{ marginBottom: '1rem', textAlign: 'center' }}>Emotion Results</h3>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontWeight: 'bold', color: 'var(--success-color)' }}>Happy</span>
              <span>90%</span>
            </div>
            <div style={{ width: '100%', height: '8px', backgroundColor: '#E8F5E9', borderRadius: '4px', marginBottom: '1rem' }}>
              <div style={{ width: '90%', height: '100%', backgroundColor: 'var(--success-color)', borderRadius: '4px' }}></div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontWeight: 'bold', color: '#FFB300' }}>Confused</span>
              <span>8%</span>
            </div>
            <div style={{ width: '100%', height: '8px', backgroundColor: '#FFF8E1', borderRadius: '4px', marginBottom: '1rem' }}>
              <div style={{ width: '8%', height: '100%', backgroundColor: '#FFB300', borderRadius: '4px' }}></div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontWeight: 'bold', color: '#9E9E9E' }}>Neutral</span>
              <span>2%</span>
            </div>
            <div style={{ width: '100%', height: '8px', backgroundColor: '#F5F5F5', borderRadius: '4px' }}>
              <div style={{ width: '2%', height: '100%', backgroundColor: '#9E9E9E', borderRadius: '4px' }}></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmotionScreen;
