import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/welcomePage.css';

function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div
      className="welcome-bg"
      style={{
        backgroundImage: "url('/assets/5.png')", // <-- Change path as needed
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="welcome-container">
        <div className="welcome-title">Welcome to</div>
        <div className="welcome-logo">
          <span className="trygve-logo">trygve</span>
          <span className="logo-bg"></span>
        </div>
        <div className="welcome-tagline">
          "Your trusted partner for personalized healthcare, right at your doorstep."
        </div>
        <button className="welcome-btn primary" onClick={() => navigate('/number-input')}>
          Sign up
        </button>
       <button className="welcome-btn secondary" onClick={() => navigate('/login-verification')}>
  Log in
</button>
      </div>
    </div>
  );
}

export default WelcomePage;