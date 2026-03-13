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
import MyStarsScreen from './pages/MyStarsScreen'; 
import ActivityScreen from './pages/ActivityScreen';
import FeedbackScreen from './pages/FeedbackScreen';
import SceneryScreen from './pages/SceneryScreen';
import './index.css';
import backgroundVideo from './assets/Background.mp4';

import GlobalEmotionTracker from './components/GlobalEmotionTracker';

// Global Layout Component
const AppLayout = ({ children, calmMode, toggleCalmMode, isMuted, toggleMute }) => {
  const navigate = useNavigate();

  return (
    <div className="app-container">
      
      <GlobalEmotionTracker />
      
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
    <>
      <video
        autoPlay
        loop
        muted
        playsInline
        className={`background-video ${calmMode ? 'hidden' : ''}`}
      >
        <source src={backgroundVideo} type="video/mp4" />
      </video>
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
        <Route path="/stars" element={
          <AppLayout {...LayoutProps}>
            <MyStarsScreen />
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
      </Routes>
    </Router>
    </>
  );
}

export default App;
