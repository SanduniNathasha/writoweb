import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ShapeMatchScreen = ({ isMuted }) => {
  const navigate = useNavigate();

  const [shapes] = useState([
    { id: 1, type: 'circle', color: '#FF5722', label: 'Circle' },
    { id: 2, type: 'square', color: '#2196F3', label: 'Square' },
    { id: 3, type: 'triangle', color: '#4CAF50', label: 'Triangle' }
  ]);

  const [matched, setMatched] = useState([]);
  const [selectedShape, setSelectedShape] = useState(null);

  const playSuccessSound = () => {
    if (isMuted) return;
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      oscillator.type = 'triangle';
      oscillator.frequency.setValueAtTime(400, audioCtx.currentTime);
      oscillator.frequency.linearRampToValueAtTime(800, audioCtx.currentTime + 0.2);
      
      gainNode.gain.setValueAtTime(0.5, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);
      
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.2);
    } catch (e) {
      console.log('Audio disabled');
    }
  };

  const handleShapeClick = (shapeType) => {
    setSelectedShape(shapeType);
  };

  const handleTargetClick = (targetType) => {
    if (selectedShape === targetType) {
      if (!matched.includes(targetType)) {
        setMatched([...matched, targetType]);
        playSuccessSound();
      }
      setSelectedShape(null);
    } else {
      // Wrong match
      setSelectedShape(null);
    }
  };

  const renderShape = (type, color) => {
    switch(type) {
      case 'circle': return <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: color }} />;
      case 'square': return <div style={{ width: '80px', height: '80px', backgroundColor: color }} />;
      case 'triangle': return <div style={{ width: '0', height: '0', borderLeft: '40px solid transparent', borderRight: '40px solid transparent', borderBottom: `80px solid ${color}` }} />;
      default: return null;
    }
  };

  return (
    <div className="w-full text-center fade-in" style={{ padding: '1rem' }}>
      <h2 style={{ color: 'var(--primary-color)', fontSize: '2.5rem', marginBottom: '1rem' }}>
        Match the Shapes!
      </h2>
      <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '2rem' }}>
        Tap a colored shape, then tap its shadow.
      </p>

      {/* Shadows (Targets) */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '3rem' }}>
        {shapes.map(s => (
          <div 
            key={`target-${s.id}`}
            onClick={() => handleTargetClick(s.type)}
            style={{
              width: '100px',
              height: '100px',
              border: '4px dashed #B0BEC5',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: matched.includes(s.type) ? '#E8F5E9' : '#ECEFF1',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
          >
            {matched.includes(s.type) ? renderShape(s.type, s.color) : renderShape(s.type, '#CFD8DC')}
          </div>
        ))}
      </div>

      {/* Colored Shapes (Sources) */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
        {shapes.map(s => (
          <div 
            key={`source-${s.id}`}
            onClick={() => handleShapeClick(s.type)}
            style={{
              width: '100px',
              height: '100px',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#FFFFFF',
              boxShadow: selectedShape === s.type ? '0 0 0 4px #4CAF50, 0 8px 16px rgba(0,0,0,0.1)' : '0 8px 16px rgba(0,0,0,0.1)',
              cursor: 'pointer',
              opacity: matched.includes(s.type) ? 0.3 : 1,
              pointerEvents: matched.includes(s.type) ? 'none' : 'auto',
              transform: selectedShape === s.type ? 'scale(1.1)' : 'scale(1)',
              transition: 'all 0.2s'
            }}
          >
            {renderShape(s.type, s.color)}
          </div>
        ))}
      </div>

      {matched.length === shapes.length && (
        <div className="fade-in" style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#FFF9C4', borderRadius: '16px', border: '4px solid #FFEB3B' }}>
          <h2 style={{ color: '#F57F17', margin: 0 }}>You did it! Great job! 🎉</h2>
        </div>
      )}

      <div style={{ marginTop: '3rem' }}>
        <button className="btn btn-secondary" onClick={() => navigate('/dashboard')}>
          Back to Dashboard
        </button>
      </div>

    </div>
  );
};

export default ShapeMatchScreen;
