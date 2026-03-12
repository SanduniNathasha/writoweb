import React from 'react';
import { useNavigate } from 'react-router-dom';

const InstructionScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full text-center fade-in">
      <div className="focus-card">
        <h2 style={{ color: 'var(--primary-color)', fontSize: '2.5rem', marginBottom: '1rem' }}>
          Ho HOOO
        </h2>
        <p className="mb-6 font-medium" style={{ fontSize: '1.5rem', color: 'var(--text-secondary)' }}>
          Let's write together!
        </p>

        {/* Character Mockup */}
        <div style={{
          width: '180px',
          height: '180px',
          backgroundColor: '#FFCDD2',
          borderRadius: '50%',
          margin: '0 auto 2rem auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '5rem',
          boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
        }}>
          ✏️
        </div>

        <button 
          className="btn btn-primary w-full"
          onClick={() => navigate('/activity')}
          style={{ fontSize: '1.25rem', padding: '1rem' }}
        >
          Start Writing
        </button>
        
        <button 
          className="btn btn-secondary w-full"
          onClick={() => navigate('/scenery')}
          style={{ fontSize: '1.25rem', padding: '1rem', marginTop: '1rem' }}
        >
          Explore Room
        </button>
      </div>
    </div>
  );
};

export default InstructionScreen;
