// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Header from './components/header';
import WebcamCapture from './components/webcamcapture';
import ProfileDisplay from './components/profileDisplay';
import SidePanel from './components/sidepanel';
import './style/index.css';

const App = () => {
  const [profile, setProfile] = useState(null);

  const handleProfileSubmit = (submittedProfile) => {
    setProfile(submittedProfile);
  };

  return (
    <StrictMode>
      <Header />
      <div className="main-content">
        <SidePanel side="left" />
        {profile ? (
          <ProfileDisplay profile={profile} />
        ) : (
          <WebcamCapture onSubmitProfile={handleProfileSubmit} />
        )}
        <SidePanel side="right" />
      </div>
    </StrictMode>
  );
};

createRoot(document.getElementById('root')).render(<App />);
