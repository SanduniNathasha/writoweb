import React from 'react';
import { useNavigate } from 'react-router-dom';

const MyStarsScreen = () => {
  const navigate = useNavigate();

  // Mock data for earned stars
  const starsEarned = 5;
  const totalStars = 10;

  return (
    <div className="w-full text-center fade-in" style={{ padding: '1rem' }}>
      <h2 style={{ color: 'var(--accent-color)', fontSize: '2.5rem', marginBottom: '1rem', textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        My Stars!
      </h2>
      <p className="mb-6 font-medium" style={{ color: 'var(--text-primary)', fontSize: '1.25rem' }}>
        Look at all the great work you've done!
      </p>

      <div className="focus-card" style={{ maxWidth: '400px', margin: '0 auto', backgroundColor: '#FFFDF0', border: '4px solid #FFF59D' }}>
        
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '1rem',
          padding: '1rem'
        }}>
          {Array.from({ length: totalStars }).map((_, index) => (
            <div 
              key={index}
              style={{
                fontSize: '3rem',
                filter: index < starsEarned ? 'drop-shadow(0 4px 8px rgba(255, 193, 7, 0.4))' : 'grayscale(100%) opacity(30%)',
                transform: index < starsEarned ? 'scale(1.1)' : 'scale(0.9)',
                transition: 'all 0.3s ease',
                animation: index < starsEarned ? 'bounce 3s infinite' : 'none',
                animationDelay: `${index * 0.2}s`
              }}
            >
              ⭐
            </div>
          ))}
        </div>

        <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#E8F5E9', borderRadius: '12px' }}>
          <h3 style={{ color: 'var(--success-color)', margin: 0, fontSize: '1.5rem' }}>
            You have {starsEarned} stars!
          </h3>
          <p style={{ margin: '0.5rem 0 0 0', color: '#2E7D32' }}>
            Keep playing to earn more!
          </p>
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <button 
          className="btn btn-primary"
          onClick={() => navigate('/dashboard')}
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default MyStarsScreen;
