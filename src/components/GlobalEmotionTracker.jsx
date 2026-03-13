import React, { useState, useEffect, useRef } from 'react';
import * as faceapi from '@vladmandic/face-api';

const GlobalEmotionTracker = () => {
  const [emotions, setEmotions] = useState(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [hasError, setHasError] = useState(false);
  
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const timerRef = useRef(null);

  // 1. Load Face-API Models
  useEffect(() => {
    const loadModels = async () => {
      try {
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
          faceapi.nets.faceExpressionNet.loadFromUri('/models')
        ]);
        setModelsLoaded(true);
      } catch (err) {
        console.error("Failed to load models inside Global Tracker", err);
        setHasError(true);
      }
    };
    loadModels();
  }, []);

  // 2. Start Camera Once Models Loaded
  useEffect(() => {
    if (modelsLoaded) {
      startVideo();
    }
    
    return () => {
      stopVideo();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [modelsLoaded]);

  const startVideo = () => {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } })
      .then((stream) => {
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setIsCameraActive(true);
      })
      .catch((err) => {
        console.error("Camera access denied for Global Tracker", err);
        setHasError(true);
      });
  };

  const stopVideo = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    setIsCameraActive(false);
  };

  // 3. Continually Analyze Feed
  const handleVideoPlay = () => {
    // Analyze every 800ms to stay extremely lightweight while running globally
    timerRef.current = setInterval(async () => {
      if (videoRef.current && videoRef.current.readyState === 4 && isCameraActive) {
        try {
          const detections = await faceapi.detectSingleFace(
            videoRef.current,
            new faceapi.TinyFaceDetectorOptions()
          ).withFaceExpressions();

          if (detections) {
            setEmotions(detections.expressions);
          } else {
             // Lost face tracking
            setEmotions(null);
          }
        } catch(e) { /* ignore single frame errors */ }
      }
    }, 800);
  };

  const getDominantEmotion = (expr) => {
    if (!expr) return null;
    return Object.entries(expr).reduce((max, current) => 
      current[1] > max[1] ? current : max
    , ["", 0]);
  };

  const getEmotionEmoji = (emotion) => {
    switch(emotion) {
      case 'happy': return '😃';
      case 'sad': return '😢';
      case 'angry': return '😠';
      case 'fearful': return '😨';
      case 'disgusted': return '🤢';
      case 'surprised': return '😲';
      case 'neutral': 
      default: return '🙂';
    }
  };

  const dominant = emotions ? getDominantEmotion(emotions) : null;
  const emoji = dominant ? getEmotionEmoji(dominant[0]) : '👀';

  if (hasError) return null; // Hide widget silently on error

  return (
    <>
      <div style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 9999, // Ensure it sits on top of all activities
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'end',
        gap: '8px',
        pointerEvents: 'none', // Prevent from blocking clicks on elements underneath
      }}>
        
        {/* Hidden Camera Feed (Needed for analysis) */}
        <div style={{ 
          width: '60px', height: '80px', 
          borderRadius: '12px', overflow: 'hidden', 
          border: '2px solid rgba(255,255,255,0.5)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          background: '#000',
          position: 'relative',
          opacity: 0.8 // slight transparency
        }}>
           <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            onPlay={handleVideoPlay}
            style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)' }}
          />

          {!modelsLoaded && (
            <div style={{ position: 'absolute', inset: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '0.6rem', color: '#fff', textAlign: 'center', background: 'rgba(0,0,0,0.7)' }}>
              Loading AI...
            </div>
          )}
        </div>

        {/* Emotion Indicator Bubble */}
        <div style={{
           background: '#fff',
           borderRadius: '50px',
           padding: '8px 16px',
           display: 'flex',
           alignItems: 'center',
           gap: '8px',
           boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
           border: '2px solid var(--primary-color)'
        }}>
           <span style={{ fontSize: '1.5rem' }}>{emoji}</span>
           <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', minWidth: '50px' }}>
              <span style={{ fontSize: '0.7rem', fontWeight: 'bold', color: '#64748B', textTransform: 'uppercase' }}>Feeling</span>
              <span style={{ fontSize: '0.8rem', fontWeight: 900, color: 'var(--text-primary)', textTransform: 'capitalize' }}>
                {dominant ? dominant[0] : 'Looking...'}
              </span>
           </div>
        </div>

      </div>
    </>
  );
};

export default GlobalEmotionTracker;
