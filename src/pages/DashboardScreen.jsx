import React from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardScreen = () => {
  const navigate = useNavigate();

  const activityCardStyle = {
    backgroundColor: '#FFFFFF',
    borderRadius: '24px',
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 8px 16px rgba(0,0,0,0.08)',
    cursor: 'pointer',
    border: '4px solid transparent',
    transition: 'transform 0.2s, border-color 0.2s',
  };

  const getHoverStyle = (e, color) => {
    e.currentTarget.style.transform = 'translateY(-4px)';
    e.currentTarget.style.borderColor = color;
  };

  const removeHoverStyle = (e) => {
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.borderColor = 'transparent';
  };

  return (
    <div className="w-full text-center fade-in" style={{ padding: '1rem' }}>
      <h1 style={{ color: 'var(--primary-color)', fontSize: '2.5rem', marginBottom: '0.5rem' }}>
        My Dashboard
      </h1>
      <p className="mb-6 font-medium" style={{ color: 'var(--text-secondary)' }}>
        What would you like to play today?
      </p>

      {/* Grid of activities */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
        gap: '1rem',
        maxWidth: '400px',
        margin: '0 auto'
      }}>
        
        {/* Visual Schedule */}
        <div 
          style={activityCardStyle}
          onClick={() => navigate('/schedule')}
          onMouseEnter={(e) => getHoverStyle(e, '#9C27B0')}
          onMouseLeave={removeHoverStyle}
          role="button"
          tabIndex={0}
        >
          <div style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>📅</div>
          <h3 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', margin: 0 }}>My Schedule</h3>
        </div>

        {/* Letter Trace */}
        <div 
          style={activityCardStyle}
          onClick={() => navigate('/instruction')}
          onMouseEnter={(e) => getHoverStyle(e, '#4CAF50')}
          onMouseLeave={removeHoverStyle}
          role="button"
          tabIndex={0}
        >
          <div style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>🔤</div>
          <h3 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', margin: 0 }}>Letter Trace</h3>
        </div>

        {/* Free Writing */}
        <div 
          style={activityCardStyle}
          onClick={() => navigate('/freewrite')}
          onMouseEnter={(e) => getHoverStyle(e, '#FF9800')}
          onMouseLeave={removeHoverStyle}
          role="button"
          tabIndex={0}
        >
          <div style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>🖍️</div>
          <h3 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', margin: 0 }}>Free Writing</h3>
        </div>

        {/* Feeling Face */}
        <div 
          style={activityCardStyle}
          onClick={() => navigate('/emotion')}
          onMouseEnter={(e) => getHoverStyle(e, '#2196F3')}
          onMouseLeave={removeHoverStyle}
          role="button"
          tabIndex={0}
        >
          <div style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>😊</div>
          <h3 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', margin: 0 }}>Feeling Face</h3>
        </div>

        {/* My Stars */}
        <div 
          style={activityCardStyle}
          onClick={() => navigate('/stars')}
          onMouseEnter={(e) => getHoverStyle(e, '#FFC107')}
          onMouseLeave={removeHoverStyle}
          role="button"
          tabIndex={0}
        >
          <div style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>⭐</div>
          <h3 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', margin: 0 }}>My Stars</h3>
        </div>

        {/* Sensory Bubbles */}
        <div 
          style={activityCardStyle}
          onClick={() => navigate('/bubbles')}
          onMouseEnter={(e) => getHoverStyle(e, '#00BCD4')}
          onMouseLeave={removeHoverStyle}
          role="button"
          tabIndex={0}
        >
          <div style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>🫧</div>
          <h3 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', margin: 0 }}>Sensory Bubbles</h3>
        </div>

        {/* Shape Match */}
        <div 
          style={activityCardStyle}
          onClick={() => navigate('/shapes')}
          onMouseEnter={(e) => getHoverStyle(e, '#FF5722')}
          onMouseLeave={removeHoverStyle}
          role="button"
          tabIndex={0}
        >
          <div style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>🔺</div>
          <h3 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', margin: 0 }}>Shape Match</h3>
        </div>

      </div>

      <div style={{ marginTop: '3rem' }}>
        <button 
          className="btn"
          onClick={() => navigate('/scenery')}
          style={{ backgroundColor: '#E1BEE7', color: '#6A1B9A', border: 'none' }}
        >
          Explore the Room
        </button>
      </div>
    </div>
  );
};

export default DashboardScreen;
