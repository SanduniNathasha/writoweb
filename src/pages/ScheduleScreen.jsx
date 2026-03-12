import React from 'react';
import { useNavigate } from 'react-router-dom';

const ScheduleScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full text-center fade-in" style={{ padding: '1rem' }}>
      <h2 style={{ color: 'var(--primary-color)', fontSize: '2.5rem', marginBottom: '1rem' }}>
        What are we doing today?
      </h2>
      <p className="mb-6 font-medium" style={{ color: 'var(--text-secondary)', fontSize: '1.25rem' }}>
        First we work, Then we play!
      </p>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        maxWidth: '500px',
        margin: '0 auto',
      }}>
        
        {/* FIRST Card */}
        <div style={{
          backgroundColor: '#E8F5E9',
          border: '4px solid #4CAF50',
          borderRadius: '24px',
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxShadow: '0 8px 16px rgba(0,0,0,0.05)',
          cursor: 'pointer'
        }}
        onClick={() => navigate('/instruction')}>
          <div style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '0.5rem 1.5rem',
            borderRadius: '20px',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            marginBottom: '1rem',
            textTransform: 'uppercase'
          }}>
            First
          </div>
          <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>🔤</div>
          <h3 style={{ fontSize: '1.5rem', color: '#2E7D32', margin: 0 }}>
            Letter Trace
          </h3>
        </div>

        {/* THEN Card */}
        <div style={{
          backgroundColor: '#FFF3E0',
          border: '4px solid #FF9800',
          borderRadius: '24px',
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxShadow: '0 8px 16px rgba(0,0,0,0.05)',
          cursor: 'pointer'
        }}
        onClick={() => navigate('/bubbles')}>
          <div style={{
            backgroundColor: '#FF9800',
            color: 'white',
            padding: '0.5rem 1.5rem',
            borderRadius: '20px',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            marginBottom: '1rem',
            textTransform: 'uppercase'
          }}>
            Then
          </div>
          <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>🫧</div>
          <h3 style={{ fontSize: '1.5rem', color: '#E65100', margin: 0 }}>
            Pop Bubbles
          </h3>
        </div>

      </div>

      <div style={{ marginTop: '3rem' }}>
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
