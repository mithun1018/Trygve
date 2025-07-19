import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/signupSuccess.css';

function SignupSuccess() {
  const navigate = useNavigate();

  return (
    <div className="success-bg">
      <div className="success-container">
        <button className="success-back" onClick={() => navigate(-1)}>&lt;</button>
        <img src="/assets/success-check.png" alt="Success" className="success-icon" />
        <div className="success-title">
          You're Now with Your<br />Trusted Guardian of Life!
        </div>
        <div className="success-subtitle">
          Welcome to the TRYVE Family!<br />
          Your journey to better health starts here.
        </div>
        <div className="caduceus-bg"></div>
       <button className="success-btn" onClick={() => navigate('/welcome')}>
  Back to Login
</button>
      </div>
    </div>
  );
}

export default SignupSuccess;