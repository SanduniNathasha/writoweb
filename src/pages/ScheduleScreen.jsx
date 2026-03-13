import React from 'react';
import { useNavigate } from 'react-router-dom';

const ScheduleScreen = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      background: 'transparent',
    }}>
      {/* Header */}
      <h2 style={{
        color: 'var(--primary-color, #fff)',
        fontSize: 'clamp(2rem, 5vw, 3rem)',
        marginBottom: '0.5rem',
        textAlign: 'center',
        textShadow: '0 2px 12px rgba(0,0,0,0.25)',
      }}>
        What are we doing today?
      </h2>
      <p style={{
        color: 'var(--text-secondary, rgba(255,255,255,0.85))',
        fontSize: 'clamp(1rem, 2.5vw, 1.35rem)',
        marginBottom: '2.5rem',
        textAlign: 'center',
        fontWeight: 600,
        textShadow: '0 1px 8px rgba(0,0,0,0.2)',
      }}>
        First we work, Then we play!
      </p>

      {/* Cards */}
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '2rem',
        width: '100%',
        maxWidth: '800px',
        justifyContent: 'center',
        flexWrap: 'wrap',
      }}>

        {/* FIRST Card */}
        <div
          onClick={() => navigate('/activity')}
          style={{
            flex: '1 1 280px',
            maxWidth: '340px',
            backgroundColor: 'rgba(232, 245, 233, 0.88)',
            border: '4px solid #4CAF50',
            borderRadius: '28px',
            padding: '2.5rem 2rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: '0 12px 40px rgba(0,0,0,0.18)',
            cursor: 'pointer',
            backdropFilter: 'blur(8px)',
            transition: 'transform 0.18s ease, box-shadow 0.18s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-6px) scale(1.03)';
            e.currentTarget.style.boxShadow = '0 20px 50px rgba(0,0,0,0.25)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.18)';
          }}
        >
          <div style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '0.5rem 1.75rem',
            borderRadius: '20px',
            fontSize: '1.4rem',
            fontWeight: 'bold',
            marginBottom: '1.25rem',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}>
            First
          </div>
          <div style={{ fontSize: 'clamp(4rem, 8vw, 6rem)', marginBottom: '1rem', lineHeight: 1 }}>
            🔤
          </div>
          <h3 style={{ fontSize: '1.5rem', color: '#2E7D32', margin: 0, fontWeight: 700 }}>
            Letter Trace
          </h3>
        </div>

        {/* THEN Card */}
        <div
          onClick={() => navigate('/bubbles')}
          style={{
            flex: '1 1 280px',
            maxWidth: '340px',
            backgroundColor: 'rgba(255, 243, 224, 0.88)',
            border: '4px solid #FF9800',
            borderRadius: '28px',
            padding: '2.5rem 2rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: '0 12px 40px rgba(0,0,0,0.18)',
            cursor: 'pointer',
            backdropFilter: 'blur(8px)',
            transition: 'transform 0.18s ease, box-shadow 0.18s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-6px) scale(1.03)';
            e.currentTarget.style.boxShadow = '0 20px 50px rgba(0,0,0,0.25)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.18)';
          }}
        >
          <div style={{
            backgroundColor: '#FF9800',
            color: 'white',
            padding: '0.5rem 1.75rem',
            borderRadius: '20px',
            fontSize: '1.4rem',
            fontWeight: 'bold',
            marginBottom: '1.25rem',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}>
            Then
          </div>
          <div style={{ fontSize: 'clamp(4rem, 8vw, 6rem)', marginBottom: '1rem', lineHeight: 1 }}>
            🫧
          </div>
          <h3 style={{ fontSize: '1.5rem', color: '#E65100', margin: 0, fontWeight: 700 }}>
            Pop Bubbles
          </h3>
        </div>

      </div>

      {/* Back Button */}
      <div style={{ marginTop: '2.5rem' }}>
        <button
          className="btn btn-secondary"
          onClick={() => navigate('/dashboard')}
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default ScheduleScreen;
