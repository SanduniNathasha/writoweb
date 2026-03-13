import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const ALPHABET = [
  { upper: 'A', lower: 'a', word: 'Apple', emoji: '🍎' },
  { upper: 'B', lower: 'b', word: 'Ball', emoji: '⚽' },
  { upper: 'C', lower: 'c', word: 'Cat', emoji: '🐱' },
  { upper: 'D', lower: 'd', word: 'Dog', emoji: '🐶' },
  { upper: 'E', lower: 'e', word: 'Egg', emoji: '🥚' },
  { upper: 'F', lower: 'f', word: 'Fish', emoji: '🐟' },
  { upper: 'G', lower: 'g', word: 'Grapes', emoji: '🍇' },
  { upper: 'H', lower: 'h', word: 'Hat', emoji: '🎩' },
  { upper: 'I', lower: 'i', word: 'Ice Cream', emoji: '🍦' },
  { upper: 'J', lower: 'j', word: 'Juice', emoji: '🧃' },
  { upper: 'K', lower: 'k', word: 'Kite', emoji: '🪁' },
  { upper: 'L', lower: 'l', word: 'Lion', emoji: '🦁' },
  { upper: 'M', lower: 'm', word: 'Moon', emoji: '🌙' },
  { upper: 'N', lower: 'n', word: 'Nest', emoji: '🪺' },
  { upper: 'O', lower: 'o', word: 'Orange', emoji: '🍊' },
  { upper: 'P', lower: 'p', word: 'Penguin', emoji: '🐧' },
  { upper: 'Q', lower: 'q', word: 'Queen', emoji: '👑' },
  { upper: 'R', lower: 'r', word: 'Rainbow', emoji: '🌈' },
  { upper: 'S', lower: 's', word: 'Sun', emoji: '☀️' },
  { upper: 'T', lower: 't', word: 'Tree', emoji: '🌳' },
  { upper: 'U', lower: 'u', word: 'Umbrella', emoji: '☂️' },
  { upper: 'V', lower: 'v', word: 'Violin', emoji: '🎻' },
  { upper: 'W', lower: 'w', word: 'Whale', emoji: '🐋' },
  { upper: 'X', lower: 'x', word: 'Xylophone', emoji: '🎵' },
  { upper: 'Y', lower: 'y', word: 'Yak', emoji: '🐃' },
  { upper: 'Z', lower: 'z', word: 'Zebra', emoji: '🦓' },
];

const CONFETTI_COLORS = ['#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF', '#FF922B', '#CC5DE8', '#F06595'];
const DRAW_COLORS = ['#FF4757', '#FF9F43', '#FFD700', '#2ed573', '#1e90ff', '#a29bfe', '#222', '#fff'];

/* ══════════════════════════════════════════
   CONFETTI
══════════════════════════════════════════ */
function Confetti() {
  const [p] = useState(() => Array.from({ length: 80 }, (_, i) => ({
    id: i, x: Math.random() * 100,
    delay: Math.random() * 1.8, dur: 2 + Math.random() * 1.8,
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    size: 8 + Math.random() * 14, circle: Math.random() > .5,
  })));
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 400 }}>
      {p.map(c => (
        <div key={c.id} style={{
          position: 'absolute', left: `${c.x}%`, top: '-20px',
          width: `${c.size}px`, height: `${c.size}px`,
          backgroundColor: c.color, borderRadius: c.circle ? '50%' : '3px',
          animation: `cfFall ${c.dur}s ${c.delay}s ease-in forwards`,
        }} />
      ))}
    </div>
  );
}



/* ══════════════════════════════════════════
   CELEBRATION OVERLAY  — 3 action buttons
══════════════════════════════════════════ */
function CelebrationOverlay({ letter, onNextLetter, onTryAgain, onFinish }) {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 350,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      background: 'rgba(4,4,20,0.88)', backdropFilter: 'blur(10px)',
    }}>
      <Confetti />

      {/* orbiting stars */}
      <div style={{ position: 'relative', width: 220, height: 220, marginBottom: '.4rem' }}>
        {['⭐', '🌟', '✨', '💫', '⭐', '🌟', '✨', '💫'].map((s, i) => (
          <span key={i} style={{
            position: 'absolute', top: '50%', left: '50%',
            fontSize: 'clamp(1.1rem,2.8vw,1.7rem)',
            transform: `rotate(${i * 45}deg) translateY(-96px) translateX(-50%)`,
            animation: `sPop .5s ${i * .07}s both`,
          }}>{s}</span>
        ))}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 'clamp(5rem,13vw,8.5rem)',
          animation: 'sPop .65s .08s both',
          filter: 'drop-shadow(0 0 40px #FFD700) drop-shadow(0 0 80px #FF9F43)',
        }}>⭐</div>
      </div>

      <div style={{
        fontSize: 'clamp(2.2rem,6vw,4rem)',
        fontFamily: '"Comic Sans MS","Chalkboard SE",cursive',
        fontWeight: 900, color: '#FFD700',
        textShadow: '0 4px 24px rgba(0,0,0,.7)',
        animation: 'cText .55s .3s both', textAlign: 'center',
      }}>Wonderful! 🎉</div>

      {/* Letter tiles */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '.7rem', marginTop: '.6rem', animation: 'cText .55s .42s both' }}>
        <div style={{
          background: '#E67E00', borderRadius: '18px', padding: '.3rem 1.2rem',
          border: '3px solid #fff', fontFamily: '"Comic Sans MS",cursive',
          fontWeight: 900, fontSize: 'clamp(2rem,5.5vw,3.2rem)', color: '#fff',
          boxShadow: '0 4px 18px rgba(0,0,0,.4)',
        }}>{letter.upper}</div>
        <span style={{ color: '#fff', fontSize: '1.6rem' }}>&amp;</span>
        <div style={{
          background: '#1a8a3a', borderRadius: '18px', padding: '.3rem 1.2rem',
          border: '3px solid #fff', fontFamily: '"Comic Sans MS",cursive',
          fontWeight: 900, fontSize: 'clamp(2rem,5.5vw,3.2rem)', color: '#fff',
          boxShadow: '0 4px 18px rgba(0,0,0,.4)',
        }}>{letter.lower}</div>
      </div>

      {/* emoji + word */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '.45rem', marginTop: '.5rem', animation: 'cText .55s .52s both' }}>
        <span style={{ fontSize: 'clamp(1.5rem,3.5vw,2.2rem)', animation: 'pulse 1.2s infinite' }}>{letter.emoji}</span>
        <span style={{ fontFamily: '"Comic Sans MS",cursive', color: 'rgba(255,255,255,.9)', fontSize: 'clamp(.9rem,2.2vw,1.2rem)' }}>
          {letter.upper} for <strong style={{ color: '#FFD700' }}>{letter.word}</strong>
        </span>
      </div>

      {/* 3 stars */}
      <div style={{ display: 'flex', gap: '.35rem', marginTop: '.7rem' }}>
        {[1, 2, 3].map(i => (
          <span key={i} style={{
            fontSize: 'clamp(2rem,4.5vw,3rem)',
            animation: `sPop .4s ${.7 + i * .12}s both`,
            filter: 'drop-shadow(0 0 10px #FFD700)',
          }}>⭐</span>
        ))}
      </div>

      {/* ── 3 ACTION BUTTONS ── */}
      <div style={{
        display: 'flex', gap: '1rem', marginTop: '2rem',
        animation: 'cText .5s .95s both',
        flexWrap: 'wrap', justifyContent: 'center', padding: '0 1rem',
      }}>

        {/* Try Again */}
        <button
          onClick={onTryAgain}
          style={{
            padding: '.75rem 1.8rem', borderRadius: '50px',
            background: '#444', border: '3px solid #fff',
            color: '#fff', fontWeight: 900,
            fontSize: 'clamp(.9rem,2.2vw,1.1rem)',
            fontFamily: '"Comic Sans MS","Chalkboard SE",cursive',
            cursor: 'pointer', boxShadow: '0 4px 16px rgba(0,0,0,.5)',
          }}
        >🔄 Try Again</button>

        {/* Next Letter — biggest, gold, pulsing */}
        <button
          onClick={onNextLetter}
          style={{
            padding: '.85rem 2.4rem', borderRadius: '50px',
            background: 'linear-gradient(135deg,#FFD700,#FF9F43)',
            border: '3px solid #fff',
            color: '#fff', fontWeight: 900,
            fontSize: 'clamp(1rem,2.6vw,1.3rem)',
            fontFamily: '"Comic Sans MS","Chalkboard SE",cursive',
            cursor: 'pointer',
            boxShadow: '0 6px 28px rgba(255,160,0,.8)',
            animation: 'pulse 1.4s infinite',
          }}
        >➡️ Next Letter</button>

        {/* All Done */}
        <button
          onClick={onFinish}
          style={{
            padding: '.75rem 1.8rem', borderRadius: '50px',
            background: '#1a6b3a', border: '3px solid #fff',
            color: '#fff', fontWeight: 900,
            fontSize: 'clamp(.9rem,2.2vw,1.1rem)',
            fontFamily: '"Comic Sans MS","Chalkboard SE",cursive',
            cursor: 'pointer', boxShadow: '0 4px 16px rgba(0,0,0,.5)',
          }}
        >✅ All Done</button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   TRACE CANVAS  (single letter)
══════════════════════════════════════════ */
function TraceCanvas({ label, strokeColor, guideFill, guideStroke, resetKey, onDrawn }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const isDrawing = useRef(false);
  const hasNotified = useRef(false);
  const [drawn, setDrawn] = useState(false);

  const renderGuide = useCallback((ctx, w, h) => {
    ctx.clearRect(0, 0, w, h);
    const fs = Math.min(w * 0.80, h * 0.80);
    ctx.font = `900 ${fs}px "Comic Sans MS","Chalkboard SE",cursive`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    // ghost fill
    ctx.fillStyle = guideFill;
    ctx.fillText(label, w / 2, h / 2);
    // dashed outline
    ctx.setLineDash([Math.max(6, fs * .04), Math.max(9, fs * .06)]);
    ctx.lineWidth = Math.max(4, fs * .03);
    ctx.strokeStyle = guideStroke;
    ctx.strokeText(label, w / 2, h / 2);
    ctx.setLineDash([]);
  }, [label, guideFill, guideStroke]);

  // initial setup + resize
  useEffect(() => {
    const canvas = canvasRef.current;
    const cont = containerRef.current;
    if (!canvas || !cont) return;
    const setup = () => {
      canvas.width = cont.clientWidth;
      canvas.height = cont.clientHeight;
      renderGuide(canvas.getContext('2d'), canvas.width, canvas.height);
    };
    setup();
    const ro = new ResizeObserver(setup);
    ro.observe(cont);
    return () => ro.disconnect();
  }, [renderGuide]);

  // reset when letter changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    renderGuide(canvas.getContext('2d'), canvas.width, canvas.height);
    setDrawn(false);
    hasNotified.current = false;
  }, [resetKey, renderGuide]);

  const getPos = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const src = e.touches ? e.touches[0] : e;
    return {
      x: (src.clientX - rect.left) * (canvas.width / rect.width),
      y: (src.clientY - rect.top) * (canvas.height / rect.height),
    };
  };

  const notify = () => {
    if (!hasNotified.current) {
      hasNotified.current = true;
      setDrawn(true);
      onDrawn?.();
    }
  };

  const onPointerDown = (e) => {
    e.preventDefault();
    const ctx = canvasRef.current.getContext('2d');
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 14;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    const { x, y } = getPos(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    isDrawing.current = true;
    notify(); // count as drawn as soon as they touch down
  };

  const onPointerMove = (e) => {
    e.preventDefault();
    if (!isDrawing.current) return;
    const { x, y } = getPos(e);
    const ctx = canvasRef.current.getContext('2d');
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const onPointerUp = () => { isDrawing.current = false; };

  const clear = () => {
    const canvas = canvasRef.current;
    renderGuide(canvas.getContext('2d'), canvas.width, canvas.height);
    setDrawn(false);
    hasNotified.current = false;
  };

  return { canvasRef, containerRef, drawn, clear, onPointerDown, onPointerMove, onPointerUp };
}

/* ══════════════════════════════════════════
   FREE WRITE PANEL
══════════════════════════════════════════ */
function FreeWritePanel({ word, emoji, resetKey }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const isDrawing = useRef(false);
  const [color, setColor] = useState('#1e90ff');
  const [brush, setBrush] = useState(12);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const c = canvasRef.current;
    if (c) { c.getContext('2d').clearRect(0, 0, c.width, c.height); setDrawn(false); }
  }, [resetKey]);

  useEffect(() => {
    const canvas = canvasRef.current, cont = containerRef.current;
    if (!canvas || !cont) return;
    const setup = () => { canvas.width = cont.clientWidth; canvas.height = cont.clientHeight; };
    setup();
    const ro = new ResizeObserver(setup);
    ro.observe(cont);
    return () => ro.disconnect();
  }, []);

  const getPos = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const src = e.touches ? e.touches[0] : e;
    return {
      x: (src.clientX - rect.left) * (canvasRef.current.width / rect.width),
      y: (src.clientY - rect.top) * (canvasRef.current.height / rect.height),
    };
  };

  const onPointerDown = (e) => {
    e.preventDefault();
    const ctx = canvasRef.current.getContext('2d');
    ctx.strokeStyle = color; ctx.lineWidth = brush;
    ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    const { x, y } = getPos(e);
    ctx.beginPath(); ctx.moveTo(x, y);
    isDrawing.current = true; setDrawn(true);
  };
  const onPointerMove = (e) => {
    e.preventDefault();
    if (!isDrawing.current) return;
    const ctx = canvasRef.current.getContext('2d');
    ctx.strokeStyle = color; ctx.lineWidth = brush;
    const { x, y } = getPos(e);
    ctx.lineTo(x, y); ctx.stroke();
  };
  const onPointerUp = () => { isDrawing.current = false; };
  const clear = () => {
    const c = canvasRef.current;
    c.getContext('2d').clearRect(0, 0, c.width, c.height);
    setDrawn(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '.4rem' }}>

      {/* label */}
      <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '.4rem' }}>
        <span style={{ fontSize: 'clamp(1rem,2.5vw,1.4rem)' }}>{emoji}</span>
        <span style={{
          fontFamily: '"Comic Sans MS","Chalkboard SE",cursive',
          fontSize: 'clamp(.82rem,2vw,1rem)', fontWeight: 900, color: '#fff',
          background: 'rgba(0,0,0,0.65)', padding: '.2rem .9rem',
          borderRadius: '50px', border: '2px solid rgba(255,255,255,0.5)',
        }}>Write <span style={{ color: '#FFD700' }}>{word}</span></span>
      </div>

      {/* canvas */}
      <div ref={containerRef} style={{
        flex: 1, borderRadius: '18px', overflow: 'hidden',
        touchAction: 'none', cursor: 'crosshair', position: 'relative',
        border: '3px solid #fff', background: 'rgba(255,255,255,0.92)',
        boxShadow: '0 6px 24px rgba(0,0,0,.35)',
      }}>
        {!drawn && (
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: '.4rem',
          }}>
            <div style={{ fontSize: 'clamp(.85rem,2vw,1rem)', color: 'rgba(0,0,0,.22)', fontFamily: '"Comic Sans MS",cursive', letterSpacing: '.08em' }}>free writing area</div>
            <div style={{ fontSize: 'clamp(1.8rem,4.5vw,3rem)', color: 'rgba(0,0,0,.1)', fontFamily: '"Comic Sans MS",cursive', fontWeight: 900 }}>{word}</div>
          </div>
        )}
        <canvas ref={canvasRef}
          style={{ width: '100%', height: '100%', display: 'block', position: 'relative', zIndex: 1 }}
          onMouseDown={onPointerDown} onMouseMove={onPointerMove}
          onMouseUp={onPointerUp} onMouseLeave={onPointerUp}
          onTouchStart={onPointerDown} onTouchMove={onPointerMove} onTouchEnd={onPointerUp}
        />
        {drawn && (
          <button onClick={clear} style={{
            position: 'absolute', top: 8, right: 8, zIndex: 2,
            background: '#333', border: '2px solid #fff', borderRadius: '50px',
            padding: '.22rem .8rem', color: '#fff', fontSize: '.7rem',
            cursor: 'pointer', fontFamily: '"Comic Sans MS",cursive', fontWeight: 'bold',
          }}>🗑️ Clear</button>
        )}
      </div>

      {/* color + brush bar */}
      <div style={{
        flexShrink: 0, display: 'flex', alignItems: 'center',
        justifyContent: 'center', gap: '.38rem', flexWrap: 'wrap',
        background: 'rgba(0,0,0,0.65)', borderRadius: '50px',
        padding: '.4rem .8rem', border: '2px solid rgba(255,255,255,.35)',
      }}>
        {DRAW_COLORS.map(c => (
          <button key={c} onClick={() => setColor(c)} style={{
            width: 'clamp(22px,3vw,28px)', height: 'clamp(22px,3vw,28px)',
            borderRadius: '50%', backgroundColor: c,
            border: color === c ? '3px solid #FFD700' : '2px solid rgba(255,255,255,.6)',
            cursor: 'pointer',
            transform: color === c ? 'scale(1.35)' : 'scale(1)',
            transition: 'transform .12s',
          }} />
        ))}
        <div style={{ width: '2px', height: '22px', background: 'rgba(255,255,255,.4)', margin: '0 .1rem' }} />
        {[{ s: 5, l: 'S' }, { s: 12, l: 'M' }, { s: 22, l: 'L' }].map(({ s, l }) => (
          <button key={s} onClick={() => setBrush(s)} style={{
            width: `${s + 14}px`, height: `${s + 14}px`,
            borderRadius: '50%', backgroundColor: color,
            border: brush === s ? '3px solid #FFD700' : '2px solid rgba(255,255,255,.6)',
            cursor: 'pointer',
            transform: brush === s ? 'scale(1.22)' : 'scale(1)',
            transition: 'transform .12s',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontSize: '.6rem', fontWeight: 'bold',
            fontFamily: '"Comic Sans MS",cursive',
          }}>{l}</button>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   MAIN  SCREEN
══════════════════════════════════════════ */
export default function ActivityScreen() {
  const navigate = useNavigate();

  const [index, setIndex] = useState(0);
  const [upperDone, setUpperDone] = useState(false);
  const [lowerDone, setLowerDone] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  // 'trace' | 'analyzing' | 'celebrate'
  const [phase, setPhase] = useState('trace');

  const letter = ALPHABET[index];
  // Finish button unlocks as soon as the child draws ANYTHING on either canvas
  const anyDrawn = upperDone || lowerDone;

  const selectLetter = useCallback((i) => {
    setIndex(i);
    setUpperDone(false);
    setLowerDone(false);
    setResetKey(k => k + 1);
    setPhase('trace');
  }, []);

  const handleFinish = () => {
    setPhase('celebrate');
  };
  const handleNextLetter = () => selectLetter((index + 1) % 26);
  const handleTryAgain = () => selectLetter(index);
  const handleAllDone = () => navigate('/feedback');

  // Each canvas reports back when the child first touches it
  const upperCanvas = TraceCanvas({
    label: letter.upper, resetKey,
    strokeColor: '#E67E00',
    guideFill: 'rgba(255,160,0,0.22)',
    guideStroke: 'rgba(230,120,0,0.9)',
    onDrawn: () => setUpperDone(true),
  });

  const lowerCanvas = TraceCanvas({
    label: letter.lower, resetKey,
    strokeColor: '#1a8a3a',
    guideFill: 'rgba(46,213,115,0.18)',
    guideStroke: 'rgba(26,138,58,0.9)',
    onDrawn: () => setLowerDone(true),
  });

  const handleClear = () => {
    upperCanvas.clear();
    lowerCanvas.clear();
    setUpperDone(false);
    setLowerDone(false);
  };

  return (
    <>
      <style>{`
        @keyframes cfFall    { 0%{transform:translateY(-30px) rotate(0deg);opacity:1} 100%{transform:translateY(110vh) rotate(720deg);opacity:0} }
        @keyframes sPop      { 0%{transform:scale(0) rotate(-20deg);opacity:0} 60%{transform:scale(1.35) rotate(8deg);opacity:1} 100%{transform:scale(1) rotate(0);opacity:1} }
        @keyframes cText     { 0%{transform:scale(.5) translateY(20px);opacity:0} 70%{transform:scale(1.08) translateY(-4px);opacity:1} 100%{transform:scale(1) translateY(0);opacity:1} }
        @keyframes pulse     { 0%,100%{transform:scale(1)} 50%{transform:scale(1.09)} }
        @keyframes btnGlow   { 0%,100%{box-shadow:0 6px 24px rgba(255,160,0,.6)} 50%{box-shadow:0 6px 44px rgba(255,215,0,1)} }
        @keyframes spin      { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes dotBounce { 0%,100%{transform:translateY(0);opacity:.5} 50%{transform:translateY(-10px);opacity:1} }
      `}</style>

      <div style={{
        position: 'fixed', inset: 0,
        fontFamily: '"Comic Sans MS","Chalkboard SE",cursive',
        display: 'flex', flexDirection: 'column',
        paddingTop: 'clamp(.4rem,1vw,.7rem)',
        paddingLeft: 'clamp(.4rem,1vw,.7rem)',
        paddingRight: 'clamp(.4rem,1vw,.7rem)',
        paddingBottom: 'clamp(2rem, 4vh, 3rem)',
        gap: 'clamp(.2rem,.5vw,.35rem)',
        background: 'transparent', overflow: 'hidden',
      }}>

        {/* ── TOP BAR ── */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <button onClick={() => navigate('/dashboard')} style={{
            background: '#333', border: '2px solid #fff', borderRadius: '50px',
            padding: '.3rem 1rem', color: '#fff',
            fontSize: 'clamp(.72rem,1.8vw,.92rem)', cursor: 'pointer',
            fontWeight: 'bold', fontFamily: '"Comic Sans MS",cursive',
          }}>← Back</button>

          <div style={{ background: 'rgba(0,0,0,0.65)', border: '2px solid rgba(255,255,255,0.5)', borderRadius: '50px', padding: '.3rem 1.2rem' }}>
            <h1 style={{ margin: 0, color: '#fff', fontSize: 'clamp(.95rem,3vw,1.55rem)', textShadow: '0 2px 8px rgba(0,0,0,.8)' }}>
              ✏️ Letter Tracing
            </h1>
          </div>

          <div style={{
            background: '#E67E00', borderRadius: '50px', padding: '.3rem 1rem',
            color: '#fff', fontWeight: 'bold',
            fontSize: 'clamp(.72rem,1.8vw,.92rem)',
            border: '2px solid #fff', fontFamily: '"Comic Sans MS",cursive',
          }}>{index + 1} / 26</div>
        </div>

        {/* ── LETTER PICKER — solid white buttons, always visible ── */}
        <div style={{
          display: 'flex', gap: '.28rem', overflowX: 'auto',
          flexShrink: 0, padding: '.35rem .6rem',
          scrollbarWidth: 'none',
          background: 'rgba(0,0,0,0.62)',
          borderRadius: '50px',
          border: '2px solid rgba(255,255,255,.35)',
        }}>
          {ALPHABET.map((l, i) => (
            <button key={l.upper} onClick={() => selectLetter(i)} style={{
              minWidth: '36px', height: '36px', borderRadius: '10px', flexShrink: 0,
              border: i === index ? '2.5px solid #FFD700' : '2px solid #999',
              background: i === index ? '#E67E00' : '#ffffff',
              color: i === index ? '#fff' : '#222',
              fontWeight: 900, fontSize: '1rem', cursor: 'pointer',
              transition: 'all .12s',
              transform: i === index ? 'scale(1.2)' : 'scale(1)',
              fontFamily: '"Comic Sans MS",cursive',
              boxShadow: i === index ? '0 2px 10px rgba(0,0,0,.4)' : '0 1px 4px rgba(0,0,0,.2)',
            }}>{l.upper}</button>
          ))}
        </div>

        {/* ── MAIN COLUMNS ── */}
        <div style={{ flex: 1, display: 'flex', gap: 'clamp(.5rem,1.2vw,.8rem)', minHeight: 0 }}>

          {/* LEFT — Capital + Small side by side */}
          <div style={{ flex: 1.1, display: 'flex', flexDirection: 'column', gap: '.4rem', minHeight: 0 }}>

            {/* status row */}
            <div style={{
              flexShrink: 0, display: 'flex', alignItems: 'center',
              justifyContent: 'center', gap: '.8rem',
              background: 'rgba(0,0,0,0.62)', borderRadius: '50px',
              padding: '.3rem 1rem', border: '2px solid rgba(255,255,255,.35)',
            }}>
              <span style={{
                fontFamily: '"Comic Sans MS",cursive', fontSize: 'clamp(.75rem,1.8vw,.9rem)',
                color: upperDone ? '#FFB347' : '#bbb', fontWeight: upperDone ? 'bold' : 'normal',
              }}>{upperDone ? '✅' : '⭕'} Capital <strong>{letter.upper}</strong></span>
              <span style={{ color: 'rgba(255,255,255,.3)' }}>|</span>
              <span style={{
                fontFamily: '"Comic Sans MS",cursive', fontSize: 'clamp(.75rem,1.8vw,.9rem)',
                color: lowerDone ? '#7BED9F' : '#bbb', fontWeight: lowerDone ? 'bold' : 'normal',
              }}>{lowerDone ? '✅' : '⭕'} Small <strong>{letter.lower}</strong></span>
              {(upperDone || lowerDone) && (
                <button onClick={handleClear} style={{
                  background: '#555', border: '2px solid #fff', borderRadius: '50px',
                  padding: '.1rem .65rem', color: '#fff', fontSize: '.7rem',
                  cursor: 'pointer', fontFamily: '"Comic Sans MS",cursive', fontWeight: 'bold',
                }}>🔄 Clear</button>
              )}
            </div>

            {/* two canvas boxes */}
            <div style={{ flex: 1, display: 'flex', gap: '6px', minHeight: 0 }}>

              {/* Capital */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '.25rem', minHeight: 0 }}>
                <div style={{
                  flexShrink: 0, textAlign: 'center', background: '#E67E00',
                  borderRadius: '50px', padding: '.25rem .5rem',
                  color: '#fff', fontWeight: 'bold',
                  fontSize: 'clamp(.72rem,1.8vw,.9rem)',
                  fontFamily: '"Comic Sans MS",cursive', border: '2px solid #fff',
                }}>🔠 Capital {letter.upper}</div>
                <div ref={upperCanvas.containerRef} style={{
                  flex: 1, borderRadius: '18px', overflow: 'hidden',
                  touchAction: 'none', cursor: 'crosshair',
                  border: upperDone ? '4px solid #E67E00' : '3px solid #fff',
                  background: 'rgba(255,255,255,0.93)',
                  boxShadow: upperDone ? '0 0 24px rgba(230,126,0,.55)' : '0 4px 16px rgba(0,0,0,.3)',
                  transition: 'border-color .3s, box-shadow .3s',
                }}>
                  <canvas ref={upperCanvas.canvasRef}
                    style={{ width: '100%', height: '100%', display: 'block' }}
                    onMouseDown={upperCanvas.onPointerDown}
                    onMouseMove={upperCanvas.onPointerMove}
                    onMouseUp={upperCanvas.onPointerUp}
                    onMouseLeave={upperCanvas.onPointerUp}
                    onTouchStart={upperCanvas.onPointerDown}
                    onTouchMove={upperCanvas.onPointerMove}
                    onTouchEnd={upperCanvas.onPointerUp}
                  />
                </div>
              </div>

              {/* Small */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '.25rem', minHeight: 0 }}>
                <div style={{
                  flexShrink: 0, textAlign: 'center', background: '#1a8a3a',
                  borderRadius: '50px', padding: '.25rem .5rem',
                  color: '#fff', fontWeight: 'bold',
                  fontSize: 'clamp(.72rem,1.8vw,.9rem)',
                  fontFamily: '"Comic Sans MS",cursive', border: '2px solid #fff',
                }}>🔡 Small {letter.lower}</div>
                <div ref={lowerCanvas.containerRef} style={{
                  flex: 1, borderRadius: '18px', overflow: 'hidden',
                  touchAction: 'none', cursor: 'crosshair',
                  border: lowerDone ? '4px solid #1a8a3a' : '3px solid #fff',
                  background: 'rgba(255,255,255,0.93)',
                  boxShadow: lowerDone ? '0 0 24px rgba(26,138,58,.55)' : '0 4px 16px rgba(0,0,0,.3)',
                  transition: 'border-color .3s, box-shadow .3s',
                }}>
                  <canvas ref={lowerCanvas.canvasRef}
                    style={{ width: '100%', height: '100%', display: 'block' }}
                    onMouseDown={lowerCanvas.onPointerDown}
                    onMouseMove={lowerCanvas.onPointerMove}
                    onMouseUp={lowerCanvas.onPointerUp}
                    onMouseLeave={lowerCanvas.onPointerUp}
                    onTouchStart={lowerCanvas.onPointerDown}
                    onTouchMove={lowerCanvas.onPointerMove}
                    onTouchEnd={lowerCanvas.onPointerUp}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — free write */}
          <div style={{ flex: 1, minHeight: 0 }}>
            <FreeWritePanel
              key={`fw-${index}`}
              word={letter.word}
              emoji={letter.emoji}
              resetKey={resetKey}
            />
          </div>
        </div>

        {/* ── ACTION BUTTONS — bottom row ── */}
        <div style={{
          flexShrink: 0,
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          paddingTop: '.3rem',
          paddingBottom: '.2rem',
          minHeight: '56px',
          alignItems: 'center',
        }}>
          {anyDrawn && phase === 'trace' ? (
            <>
              <button
                onClick={handleClear}
                style={{
                  padding: '.6rem clamp(1.2rem, 3vw, 2rem)',
                  borderRadius: '50px',
                  border: '3px solid #fff',
                  background: 'rgba(255,107,107,0.8)',
                  color: '#fff',
                  fontSize: 'clamp(0.85rem, 2vw, 1.15rem)',
                  fontWeight: 900,
                  fontFamily: '"Comic Sans MS","Chalkboard SE",cursive',
                  cursor: 'pointer',
                  boxShadow: '0 2px 10px rgba(0,0,0,.3)',
                  whiteSpace: 'nowrap',
                }}
              >
                🔄 Try Again
              </button>
              <button
                onClick={handleFinish}
                style={{
                  padding: '.75rem clamp(2rem, 6vw, 4rem)',
                  borderRadius: '50px',
                  border: '3px solid #fff',
                  background: 'linear-gradient(135deg,#FFD700 0%,#FF9F43 100%)',
                  color: '#fff',
                  fontSize: 'clamp(1rem,2.6vw,1.35rem)', 
                  fontWeight: 900,
                  fontFamily: '"Comic Sans MS","Chalkboard SE",cursive',
                  cursor: 'pointer',
                  animation: 'pulse 1.3s infinite, btnGlow 1.6s infinite',
                  letterSpacing: '.02em',
                  boxShadow: '0 4px 20px rgba(255,160,0,.7)',
                  whiteSpace: 'nowrap',
                }}
              >
                🌟 Finish! 🌟
              </button>
            </>
          ) : (
            <button
              style={{
                padding: '.75rem clamp(2.5rem,8vw,4.5rem)',
                borderRadius: '50px',
                border: '3px solid rgba(255,255,255,.3)',
                background: 'rgba(0,0,0,0.6)',
                color: 'rgba(255,255,255,.4)',
                fontSize: 'clamp(1rem,2.6vw,1.35rem)', 
                fontWeight: 900,
                fontFamily: '"Comic Sans MS","Chalkboard SE",cursive',
                cursor: 'default',
                letterSpacing: '.02em',
                boxShadow: '0 2px 8px rgba(0,0,0,.4)',
                whiteSpace: 'nowrap',
              }}
            >
              ✏️ Write a letter first
            </button>
          )}
        </div>

      </div>{/* end fixed wrapper */}

      {/* ── OVERLAYS ── */}

      {phase === 'celebrate' && (
        <CelebrationOverlay
          letter={letter}
          onNextLetter={handleNextLetter}
          onTryAgain={handleTryAgain}
          onFinish={handleAllDone}
        />
      )}
    </>
  );
}
