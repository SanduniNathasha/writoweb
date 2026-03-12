import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SceneryScreen = () => {
  const navigate = useNavigate();
  const [lightsOn, setLightsOn] = useState(true);
  const [cupboardOpen, setCupboardOpen] = useState(false);

  return (
    <div className="w-full text-center">
      <h2 style={{ color: 'var(--primary-color)', fontSize: '2rem', marginBottom: '1rem' }}>
        Interactive Room
      </h2>
      <p className="mb-4">Tap on the objects around the room!</p>

      <div className="focus-card" style={{ 
        position: 'relative', 
        height: '400px', 
        backgroundColor: lightsOn ? '#FFF9C4' : '#37474F',
        transition: 'background-color 0.5s ease',
        overflow: 'hidden'
      }}>
        {/* Lights Toggle (Ceiling Lamp) */}
        <div 
          onClick={() => setLightsOn(!lightsOn)}
          style={{
            position: 'absolute',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '3rem',
            cursor: 'pointer',
            filter: lightsOn ? 'drop-shadow(0 0 15px #FFEB3B)' : 'none',
            transition: 'filter 0.3s'
          }}
          role="button"
          aria-label="Toggle Lights"
        >
          💡
        </div>

        {/* Cupboard */}
        <div 
          onClick={() => setCupboardOpen(!cupboardOpen)}
          style={{
            position: 'absolute',
            bottom: '20px',
            left: '20px',
            width: '100px',
            height: '140px',
            backgroundColor: '#8D6E63',
            borderRadius: '8px',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '2rem',
            border: '2px solid #5D4037',
            transition: 'transform 0.3s'
          }}
          role="button"
          aria-label="Toggle Cupboard"
        >
          {cupboardOpen ? '🧸' : '🚪'}
        </div>

        {/* Character */}
        <div 
          style={{
            position: 'absolute',
            bottom: '20px',
            right: '40px',
            fontSize: '4rem',
            animation: 'bounce 3s infinite'
          }}
        >
          🧑‍🎄
        </div>

        {/* Tree */}
        <div 
          style={{
            position: 'absolute',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '5rem',
          }}
        >
          🎄
        </div>

        {!lightsOn && (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '1.5rem',
            pointerEvents: 'none'
          }}>
            It's dark in here!
          </div>
        )}
      </div>

      <button 
        className="btn btn-secondary mt-4"
        onClick={() => navigate(-1)}
      >
        Go Back
      </button>
    </div>
  );
};

export default SceneryScreen;
