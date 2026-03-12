import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Moon, Sun, Volume2, VolumeX } from 'lucide-react';

import SplashScreen from './pages/SplashScreen';
import LoginScreen from './pages/LoginScreen';
import RegisterScreen from './pages/RegisterScreen';
import DashboardScreen from './pages/DashboardScreen';
import ScheduleScreen from './pages/ScheduleScreen';
import SensoryBubblesScreen from './pages/SensoryBubblesScreen';
import ShapeMatchScreen from './pages/ShapeMatchScreen';
import FreeWritingScreen from './pages/FreeWritingScreen';
import MyStarsScreen from './pages/MyStarsScreen';
import InstructionScreen from './pages/InstructionScreen';
import ActivityScreen from './pages/ActivityScreen';
import FeedbackScreen from './pages/FeedbackScreen';
import EmotionScreen from './pages/EmotionScreen';
import SceneryScreen from './pages/SceneryScreen';
import './index.css';

// Global Layout Component
const AppLayout = ({ children, calmMode, toggleCalmMode, isMuted, toggleMute }) => {
  const navigate = useNavigate();

  return (
    <div className="app-container">
      <header className="top-bar">
        <button 
          onClick={() => navigate(-1)} 
          className="btn btn-secondary btn-icon-only"
          aria-label="Go Back"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button 
            onClick={toggleMute} 
            className="btn btn-secondary btn-icon-only"
            aria-label={isMuted ? "Unmute Sound" : "Mute Sound"}
            style={{ backgroundColor: isMuted ? '#FFCDD2' : '#C8E6C9', color: isMuted ? '#D32F2F' : '#2E7D32', borderColor: 'transparent' }}
          >
            {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
          </button>
          
          <button 
            onClick={toggleCalmMode} 
            className="btn btn-primary btn-icon-only"
            aria-label={calmMode ? "Switch to Playful Mode" : "Switch to Calm Mode"}
          >
            {calmMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>
      </header>
      
      <main className="screen-content">
        {children}
      </main>
    </div>
  );
};

function App() {
  const [calmMode, setCalmMode] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (calmMode) {
      document.body.classList.add('calm-mode');
    } else {
      document.body.classList.remove('calm-mode');
    }
  }, [calmMode]);

  const toggleCalmMode = () => setCalmMode(!calmMode);
  const toggleMute = () => setIsMuted(!isMuted);

  const LayoutProps = { calmMode, toggleCalmMode, isMuted, toggleMute };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/login" element={
          <AppLayout {...LayoutProps}>
            <LoginScreen />
          </AppLayout>
        } />
        <Route path="/register" element={
          <AppLayout {...LayoutProps}>
            <RegisterScreen />
          </AppLayout>
        } />
        <Route path="/dashboard" element={
          <AppLayout {...LayoutProps}>
            <DashboardScreen />
          </AppLayout>
        } />
        <Route path="/schedule" element={
          <AppLayout {...LayoutProps}>
            <ScheduleScreen />
          </AppLayout>
        } />
        <Route path="/bubbles" element={
          <AppLayout {...LayoutProps}>
            <SensoryBubblesScreen isMuted={isMuted} />
          </AppLayout>
        } />
        <Route path="/shapes" element={
          <AppLayout {...LayoutProps}>
            <ShapeMatchScreen isMuted={isMuted} />
          </AppLayout>
        } />
        <Route path="/freewrite" element={
          <AppLayout {...LayoutProps}>
            <FreeWritingScreen />
          </AppLayout>
        } />
        <Route path="/stars" element={
          <AppLayout {...LayoutProps}>
            <MyStarsScreen />
          </AppLayout>
        } />
        <Route path="/instruction" element={
          <AppLayout {...LayoutProps}>
            <InstructionScreen />
          </AppLayout>
        } />
        <Route path="/scenery" element={
          <AppLayout {...LayoutProps}>
            <SceneryScreen />
          </AppLayout>
        } />
        <Route path="/activity" element={
          <AppLayout {...LayoutProps}>
            <ActivityScreen />
          </AppLayout>
        } />
        <Route path="/feedback" element={
          <AppLayout {...LayoutProps}>
            <FeedbackScreen />
          </AppLayout>
        } />
        <Route path="/emotion" element={
          <AppLayout {...LayoutProps}>
            <EmotionScreen />
          </AppLayout>
        } />
      </Routes>
    </Router>
  );
}

export default App;
