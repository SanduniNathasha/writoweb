import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SensoryBubblesScreen = ({ isMuted }) => {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  
  // A simple synthesized "pop" sound using Web Audio API
  const playPopSound = () => {
    if (isMuted) return;
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(400, audioCtx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(0.5, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
      
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.1);
    } catch (e) {
      console.log("Audio not supported or blocked");
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let bubbles = [];
    
    // Fit canvas to screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      // Subtract header height roughly
      canvas.height = window.innerHeight - 150; 
      initBubbles();
    };

    const initBubbles = () => {
      bubbles = [];
      for(let i=0; i<15; i++) {
        bubbles.push(createBubble());
      }
    };

    const createBubble = (x, y) => {
      return {
        x: x !== undefined ? x : Math.random() * canvas.width,
        y: y !== undefined ? y : canvas.height + Math.random() * 100,
        radius: 20 + Math.random() * 40,
        speed: 0.5 + Math.random() * 1.5,
        wobble: Math.random() * Math.PI * 2,
        color: `hsla(${180 + Math.random() * 60}, 70%, 70%, 0.6)`
      };
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      bubbles.forEach(b => {
        b.y -= b.speed;
        b.wobble += 0.02;
        const wobbleX = b.x + Math.sin(b.wobble) * 20;

        ctx.beginPath();
        ctx.arc(wobbleX, b.y, b.radius, 0, Math.PI * 2);
        ctx.fillStyle = b.color;
        ctx.fill();
        ctx.strokeStyle = 'rgba(255,255,255,0.8)';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Little reflection
        ctx.beginPath();
        ctx.arc(wobbleX - b.radius*0.3, b.y - b.radius*0.3, b.radius*0.2, 0, Math.PI*2);
        ctx.fillStyle = 'rgba(255,255,255,0.4)';
        ctx.fill();

        // Reset if off screen
        if (b.y < -b.radius * 2) {
          Object.assign(b, createBubble(Math.random() * canvas.width, canvas.height + b.radius));
        }
      });
      
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    // Interaction
    const handlePop = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      let popped = false;
      bubbles.forEach((b, index) => {
        const wobbleX = b.x + Math.sin(b.wobble) * 20;
        const dist = Math.hypot(wobbleX - x, b.y - y);
        if (dist < b.radius) {
          bubbles[index] = createBubble(Math.random() * canvas.width, canvas.height + 50);
          popped = true;
        }
      });

      if (popped) {
        playPopSound();
      }
    };

    canvas.addEventListener('mousedown', handlePop);
    canvas.addEventListener('touchstart', (e) => { e.preventDefault(); handlePop(e); }, {passive: false});

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('mousedown', handlePop);
      canvas.removeEventListener('touchstart', handlePop);
    };
  }, [isMuted]);

  return (
    <div className="w-full text-center fade-in" style={{ padding: '0 1rem' }}>
      <h2 style={{ color: 'var(--primary-color)', fontSize: '2rem', marginTop: '1rem', marginBottom: '0.5rem' }}>
        Pop the Bubbles!
      </h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>Tap a bubble to pop it.</p>
      
      <div style={{
        backgroundColor: '#E0F7FA', // Soft water color background
        borderRadius: '24px',
        overflow: 'hidden',
        border: '4px solid #B2EBF2',
        marginBottom: '1rem'
      }}>
        <canvas ref={canvasRef} style={{ display: 'block', touchAction: 'none' }} />
      </div>

      <button className="btn btn-secondary" onClick={() => navigate('/dashboard')}>
        Back to Dashboard
      </button>
    </div>
  );
};

export default SensoryBubblesScreen;
