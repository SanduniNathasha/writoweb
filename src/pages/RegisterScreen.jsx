import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const RegisterScreen = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    pin: '',
    confirmPin: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (formData.pin !== formData.confirmPin) {
      alert("Pins don't match! Try again.");
      return;
    }
    // Simulate registration
    navigate('/dashboard');
  };

  const inputStyle = {
    width: '100%',
    padding: '1rem',
    fontSize: '1.25rem',
    borderRadius: '12px',
    border: '2px solid #CFD8DC',
    fontFamily: 'var(--font-main)',
    letterSpacing: '0.05em'
  };

  const labelStyle = {
    display: 'block',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
    color: 'var(--text-primary)'
  };

  return (
    <div className="w-full text-center fade-in" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', padding: '1rem' }}>
      <div className="focus-card" style={{ width: '100%', maxWidth: '380px' }}>
        <h1 style={{ color: 'var(--secondary-color)', fontSize: '2.5rem', marginBottom: '0.5rem' }}>
          Join Us!
        </h1>
        <p className="mb-6 font-medium" style={{ color: 'var(--text-secondary)' }}>
          Create an account to start playing.
        </p>

        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
          <div>
            <label htmlFor="name" style={labelStyle}>What is your name?</label>
            <input 
              type="text" 
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Alex"
              style={inputStyle}
              required
            />
          </div>

          <div>
            <label htmlFor="pin" style={labelStyle}>Create a Secret Code</label>
            <input 
              type="password" 
              id="pin"
              name="pin"
              value={formData.pin}
              onChange={handleChange}
              placeholder="4 numbers"
              maxLength={4}
              pattern="\d*"
              style={{ ...inputStyle, letterSpacing: '0.3em' }}
              required
            />
          </div>

          <div>
            <label htmlFor="confirmPin" style={labelStyle}>Type the Code Again</label>
            <input 
              type="password" 
              id="confirmPin"
              name="confirmPin"
              value={formData.confirmPin}
              onChange={handleChange}
              placeholder="****"
              maxLength={4}
              pattern="\d*"
              style={{ ...inputStyle, letterSpacing: '0.3em' }}
              required
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-secondary w-full mt-4"
          >
            Create My Account
          </button>
        </form>

        <div style={{ marginTop: '2rem' }}>
          <p style={{ color: '#78909C' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: 'var(--primary-color)', fontWeight: 'bold', textDecoration: 'none' }}>
              Log in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;
