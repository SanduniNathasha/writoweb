import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import splashVideo from '../assets/splashAnimation.mp4';

const SplashScreen = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);

  useEffect(() => {
    // Attempt to force play if autoPlay fails (e.g. on mobile browsers)
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Autoplay was prevented:", error);
      });
    }
  }, []);

  const handleVideoEnd = () => {
    navigate('/login');
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: '#fff',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999,
    }}>
      <video
        ref={videoRef}
        src={splashVideo}
        autoPlay
        playsInline
        muted
        onEnded={handleVideoEnd}
        onClick={handleVideoEnd} // Fallback: allow user to tap to skip if video doesn't end properly
        style={{
          width: '100vw',
          height: '100vh',
          objectFit: 'cover',
          cursor: 'pointer'
        }}
      />
    </div>
  );
};

export default SplashScreen;
