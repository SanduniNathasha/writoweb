import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginScreen = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [pin, setPin] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate login
    navigate('/dashboard');
  };

  return (
    <div className="w-full text-center fade-in" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <div className="focus-card" style={{ width: '100%', maxWidth: '360px' }}>
        <h1 style={{ color: 'var(--primary-color)', fontSize: '2.5rem', marginBottom: '0.5rem' }}>
          Welcome!
        </h1>
        <p className="mb-6 font-medium" style={{ color: 'var(--text-secondary)' }}>
          Let's get ready to play.
        </p>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
          <div>
            <label htmlFor="username" style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Name</label>
            <input 
              type="text" 
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your name"
              style={{
                width: '100%',
                padding: '1rem',
                fontSize: '1.25rem',
                borderRadius: '12px',
                border: '2px solid #CFD8DC',
                fontFamily: 'var(--font-main)'
              }}
              required
            />
          </div>

          <div>
            <label htmlFor="pin" style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Secret Code</label>
            <input 
              type="password" 
              id="pin"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="****"
              style={{
                width: '100%',
                padding: '1rem',
                fontSize: '1.25rem',
                borderRadius: '12px',
                border: '2px solid #CFD8DC',
                fontFamily: 'var(--font-main)',
                letterSpacing: '0.2em'
              }}
              required
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary w-full mt-4"
          >
            Start Playing
          </button>
        </form>

        <div style={{ marginTop: '2rem' }}>
          <p style={{ color: '#78909C' }}>Don't have an account?</p>
          <button 
            className="btn btn-secondary w-full mt-2"
            onClick={() => navigate('/register')}
            style={{ padding: '0.75rem', fontSize: '1.1rem' }}
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
