import React from 'react';
import { useNavigate } from 'react-router-dom';

const activities = [
  { emoji: '📅', label: 'My Schedule', route: '/schedule', color: '#9C27B0' },
  { emoji: '🔤', label: 'Letter Trace', route: '/activity', color: '#4CAF50' }, 
  { emoji: '😊', label: 'Feeling Face', route: '/emotion', color: '#2196F3' },
  { emoji: '⭐', label: 'My Stars', route: '/stars', color: '#FFC107' },
  { emoji: '🫧', label: 'Sensory Bubbles', route: '/bubbles', color: '#00BCD4' },
  { emoji: '🔺', label: 'Shape Match', route: '/shapes', color: '#FF5722' },
];

const DashboardScreen = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.wrapper}>
      {/* Background Video */}
      <video autoPlay loop muted playsInline style={styles.video}>
        <source src="/bg-video.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div style={styles.overlay} />

      {/* Content */}
      <div style={styles.content}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>🌈 My Dashboard</h1>
          <p style={styles.subtitle}>What would you like to play today?</p>
        </div>

        {/* Activity Grid */}
        <div style={styles.grid}>
          {activities.map((activity, index) => (
            <ActivityCard
              key={activity.route}
              emoji={activity.emoji}
              label={activity.label}
              color={activity.color}
              delay={index * 80}
              onClick={() => navigate(activity.route)}
            />
          ))}
        </div>
 
      </div>
    </div>
  );
};

const ActivityCard = ({ emoji, label, color, delay, onClick }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="button"
      tabIndex={0}
      aria-label={label}
      style={{
        ...styles.card,
        borderColor: isHovered ? color : 'transparent',
        transform: isVisible
          ? isHovered
            ? 'translateY(-6px) scale(1.05)'
            : 'translateY(0) scale(1)'
          : 'scale(0.3)',
        opacity: isVisible ? 1 : 0,
        boxShadow: isHovered
          ? `0 12px 28px ${color}30`
          : '0 8px 16px rgba(0,0,0,0.08)',
      }}
    >
      <span
        style={{
          ...styles.emoji,
          transform: isHovered ? 'rotate(-8deg) scale(1.15)' : 'rotate(0) scale(1)',
        }}
      >
        {emoji}
      </span>
      <span style={styles.label}>{label}</span>
    </button>
  );
};

const styles = {
  wrapper: {
    position: 'relative',
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    zIndex: 0,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%', 
  },
  content: {
    position: 'relative',
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '100vh',
    padding: '2rem 1rem',
    overflowY: 'auto',
  },
  header: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  title: {
    fontSize: 'clamp(2rem, 5vw, 3rem)',
    fontWeight: 800,
    color: '#4A148C',
    textShadow: '0 2px 8px rgba(0,0,0,0.1)',
    margin: 0,
  },
  subtitle: {
    fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
    color: '#6A1B9A',
    fontWeight: 500,
    marginTop: '0.5rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
    gap: '1rem',
    width: '100%',
    maxWidth: '900px',
    padding: '0 1rem',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: '24px',
    padding: '1.5rem 1rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.75rem',
    border: '4px solid transparent',
    cursor: 'pointer',
    transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
    outline: 'none',
    WebkitTapHighlightColor: 'transparent',
  },
  emoji: {
    fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
    transition: 'transform 0.3s ease',
    display: 'block',
  },
  label: {
    fontSize: 'clamp(0.85rem, 2vw, 1.1rem)',
    fontWeight: 700,
    color: '#333',
    letterSpacing: '0.02em',
    textAlign: 'center',
  },
  exploreButton: {
    marginTop: '2rem',
    padding: '1rem 2.5rem',
    fontSize: '1.1rem',
    fontWeight: 700,
    color: '#FFFFFF',
    backgroundColor: '#7B1FA2',
    border: 'none',
    borderRadius: '50px',
    cursor: 'pointer',
    boxShadow: '0 8px 24px rgba(106, 27, 154, 0.3)',
    transition: 'all 0.3s ease',
    WebkitTapHighlightColor: 'transparent',
  },
};

export default DashboardScreen;
