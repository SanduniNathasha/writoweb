import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ActivityScreen = () => {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  
  // Set up canvas context and sizing
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const context = canvas.getContext('2d');
    
    // Auto-size canvas to container
    const resizeCanvas = () => {
      canvas.width = container.clientWidth;
      canvas.height = 200; // Fixed tracing height initially
      
      // Setup drawing style
      context.lineCap = 'round';
      context.lineJoin = 'round';
      context.strokeStyle = getComputedStyle(document.body).getPropertyValue('--primary-color') || '#00897B';
      context.lineWidth = 12;
      
      drawTracingGuide(context, canvas.width, canvas.height);
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  // Draw the dotted background text "APPLE"
  const drawTracingGuide = (ctx, width, height) => {
    ctx.font = 'bold 80px "Quicksand", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Draw guide text
    ctx.fillStyle = '#CFD8DC';
    ctx.setLineDash([10, 15]); // Dotted look
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#90A4AE';
    
    ctx.fillText('APPLE', width / 2, height / 2);
    ctx.strokeText('APPLE', width / 2, height / 2);
    
    // Reset path settings for drawing
    ctx.setLineDash([]);
    ctx.lineWidth = 12;
    ctx.strokeStyle = getComputedStyle(document.body).getPropertyValue('--primary-color') || '#00897B';
  };

  const getCoordinates = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    
    // Support for both mouse and touch events
    const clientX = event.touches ? event.touches[0].clientX : event.clientX;
    const clientY = event.touches ? event.touches[0].clientY : event.clientY;
    
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  const startDrawing = (event) => {
    event.preventDefault(); // Prevent scrolling on touch
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
    drawTracingGuide(context, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  return (
    <div className="w-full text-center fade-in">
      <h2 style={{ color: 'var(--secondary-color)', fontSize: '2rem' }}>
        Let's write APPLE!
      </h2>
      <p className="mb-4">Trace the letters below carefully.</p>

      <div className="focus-card">
        <div 
          ref={containerRef}
          style={{
            border: '2px dashed #B0BEC5',
            borderRadius: '16px',
            marginBottom: '1rem',
            backgroundColor: '#FAFAFA',
            overflow: 'hidden',
            touchAction: 'none', // Prevent browser handling of pinch/zoom over canvas
            position: 'relative'
          }}
        >
          <canvas
            ref={canvasRef}
            style={{ width: '100%', height: '200px', cursor: 'pointer' }}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
          />
        </div>
        
        {hasDrawn && (
          <p style={{ color: 'var(--success-color)', fontWeight: 'bold' }}>
            Great job!
          </p>
        )}

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
          Clear and try again
        </button>
      </div>

      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
        <button 
          className="btn btn-secondary"
          onClick={() => navigate('/emotion')}
        >
          Check Emotion
        </button>
        <button 
          className="btn btn-primary"
          onClick={() => navigate('/feedback')}
          disabled={!hasDrawn}
          style={{ opacity: hasDrawn ? 1 : 0.5 }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ActivityScreen;
