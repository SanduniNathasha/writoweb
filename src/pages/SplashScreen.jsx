import React from 'react';
import { useNavigate } from 'react-router-dom';

const SplashScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="app-container" style={{ justifyContent: 'center', alignItems: 'center' }}>
      <div className="focus-card" style={{ width: '100%', maxWidth: '340px' }}>
        <h1 style={{ color: 'var(--secondary-color)', fontSize: '3rem', marginBottom: '1rem' }}>
          HELLO!
        </h1>
        <p className="mb-6" style={{ fontSize: '1.25rem' }}>
          Welcome back! Let's play and learn together today.
        </p>
        
        {/* Placeholder for Character/Graphic */}
        <div style={{
          width: '160px',
          height: '160px',
          backgroundColor: '#FFEB3B',
          borderRadius: '50%',
          margin: '0 auto 2rem auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '4rem'
        }}>
          🌟
        </div>

        <button 
          className="btn btn-primary w-full"
          onClick={() => navigate('/login')}
        >
          Let's Start!
        </button>
      </div>
    </div>
  );
};

export default SplashScreen;
