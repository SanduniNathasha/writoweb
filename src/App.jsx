import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';

import SplashScreen from './pages/SplashScreen';
import LoginScreen from './pages/LoginScreen';
import RegisterScreen from './pages/RegisterScreen';
import DashboardScreen from './pages/DashboardScreen';
import FreeWritingScreen from './pages/FreeWritingScreen';
import MyStarsScreen from './pages/MyStarsScreen';
import InstructionScreen from './pages/InstructionScreen';
import ActivityScreen from './pages/ActivityScreen';
import FeedbackScreen from './pages/FeedbackScreen';
import EmotionScreen from './pages/EmotionScreen';
import SceneryScreen from './pages/SceneryScreen';
import './index.css';

// Global Layout Component
const AppLayout = ({ children, calmMode, toggleCalmMode }) => {
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
        
        <button 
          onClick={toggleCalmMode} 
          className="btn btn-primary btn-icon-only"
          aria-label={calmMode ? "Switch to Playful Mode" : "Switch to Calm Mode"}
        >
          {calmMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>
      </header>
      
      <main className="screen-content">
        {children}
      </main>
    </div>
  );
};

function App() {
  const [calmMode, setCalmMode] = useState(false);

  useEffect(() => {
    if (calmMode) {
      document.body.classList.add('calm-mode');
    } else {
      document.body.classList.remove('calm-mode');
    }
  }, [calmMode]);

  const toggleCalmMode = () => setCalmMode(!calmMode);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/login" element={
          <AppLayout calmMode={calmMode} toggleCalmMode={toggleCalmMode}>
            <LoginScreen />
          </AppLayout>
        } />
        <Route path="/register" element={
          <AppLayout calmMode={calmMode} toggleCalmMode={toggleCalmMode}>
            <RegisterScreen />
          </AppLayout>
        } />
        <Route path="/dashboard" element={
          <AppLayout calmMode={calmMode} toggleCalmMode={toggleCalmMode}>
            <DashboardScreen />
          </AppLayout>
        } />
        <Route path="/freewrite" element={
          <AppLayout calmMode={calmMode} toggleCalmMode={toggleCalmMode}>
            <FreeWritingScreen />
          </AppLayout>
        } />
        <Route path="/stars" element={
          <AppLayout calmMode={calmMode} toggleCalmMode={toggleCalmMode}>
            <MyStarsScreen />
          </AppLayout>
        } />
        <Route path="/instruction" element={
          <AppLayout calmMode={calmMode} toggleCalmMode={toggleCalmMode}>
            <InstructionScreen />
          </AppLayout>
        } />
        <Route path="/scenery" element={
          <AppLayout calmMode={calmMode} toggleCalmMode={toggleCalmMode}>
            <SceneryScreen />
          </AppLayout>
        } />
        <Route path="/activity" element={
          <AppLayout calmMode={calmMode} toggleCalmMode={toggleCalmMode}>
            <ActivityScreen />
          </AppLayout>
        } />
        <Route path="/feedback" element={
          <AppLayout calmMode={calmMode} toggleCalmMode={toggleCalmMode}>
            <FeedbackScreen />
          </AppLayout>
        } />
        <Route path="/emotion" element={
          <AppLayout calmMode={calmMode} toggleCalmMode={toggleCalmMode}>
            <EmotionScreen />
          </AppLayout>
        } />
      </Routes>
    </Router>
  );
}

export default App;
