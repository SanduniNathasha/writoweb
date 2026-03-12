import React from 'react';
import { useNavigate } from 'react-router-dom';

const FeedbackScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full text-center">
      <div className="focus-card">
        <div style={{
          fontSize: '5rem',
          marginBottom: '1rem',
          animation: 'bounce 2s infinite'
        }}>
          😊
        </div>

        <h2 style={{ color: 'var(--success-color)', fontSize: '2rem' }}>
          You did great!
        </h2>

        <p className="mb-6 font-medium" style={{ fontSize: '1.25rem' }}>
          I think you wrote <span style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>Apple</span>.
          Let's do it again like this!
        </p>

        <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
          <button
            className="btn btn-primary"
            onClick={() => navigate('/activity')}
          >
            Play Again
          </button>

          <button
            className="btn btn-secondary"
            onClick={() => navigate('/dashboard')}
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackScreen;
