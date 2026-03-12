import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const FreeWritingScreen = () => {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const context = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      canvas.width = container.clientWidth;
      canvas.height = 300; // Larger area for free writing
      
      context.lineCap = 'round';
      context.lineJoin = 'round';
      context.strokeStyle = getComputedStyle(document.body).getPropertyValue('--primary-color') || '#00897B';
      context.lineWidth = 8;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  const getCoordinates = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    
    const clientX = event.touches ? event.touches[0].clientX : event.clientX;
    const clientY = event.touches ? event.touches[0].clientY : event.clientY;
    
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  const startDrawing = (event) => {
    event.preventDefault();
    const { x, y } = getCoordinates(event);
    const context = canvasRef.current.getContext('2d');
    
    context.beginPath();
    context.moveTo(x, y);
    setIsDrawing(true);
    setHasDrawn(true);
  };

  const draw = (event) => {
    event.preventDefault();
    if (!isDrawing) return;
    
    const { x, y } = getCoordinates(event);
    const context = canvasRef.current.getContext('2d');
    
    context.lineTo(x, y);
    context.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  return (
    <div className="w-full text-center fade-in">
      <h2 style={{ color: 'var(--secondary-color)', fontSize: '2rem' }}>
        Free Writing!
      </h2>
      <p className="mb-4">Draw or write whatever you like.</p>

      <div className="focus-card">
        <div 
          ref={containerRef}
          style={{
            border: '2px dashed #B0BEC5',
            borderRadius: '16px',
            marginBottom: '1rem',
            backgroundColor: '#FFFDE7', // Soft yellow background for blank canvas
            overflow: 'hidden',
            touchAction: 'none',
            position: 'relative',
            boxShadow: 'inset 0 0 10px rgba(0,0,0,0.05)'
          }}
        >
          <canvas
            ref={canvasRef}
            style={{ width: '100%', height: '300px', cursor: 'pointer' }}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
          />
        </div>

        <button 
          className="btn"
          onClick={clearCanvas}
          style={{
            fontSize: '1rem',
            padding: '0.5rem 1.5rem',
            backgroundColor: '#ECEFF1',
            color: '#546E7A',
            borderRadius: '100px',
            border: 'none',
            marginTop: '0.5rem'
          }}
        >
          Clear Board
        </button>
      </div>

      <div style={{ marginTop: '2rem' }}>
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

export default FreeWritingScreen;
