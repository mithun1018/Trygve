import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/loginSuccess.css';

function LoginSuccess() {
  const navigate = useNavigate();

  return (
    <div className="loginsuccess-bg">
      <div className="loginsuccess-container">
        <img src="/assets/success-check.png" alt="Success" className="loginsuccess-icon" />
        <div className="loginsuccess-title">
          Welcome Back to<br />TRYGVE!
        </div>
        <div className="loginsuccess-subtitle">
          "Your trusted guardian of life is ready to serve you."
        </div>
        <div className="caduceus-bg"></div>
        <button className="loginsuccess-btn" onClick={() => navigate('/dashboard')}>
          Continue
        </button>
      </div>
    </div>
  );
}

export default LoginSuccess;