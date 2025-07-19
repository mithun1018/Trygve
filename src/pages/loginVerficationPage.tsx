import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/loginVerficationPage.css';

function LoginVerificationPage() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  function handleContinue(e: React.FormEvent) {
    e.preventDefault();
    // Simple validation
    if (!email || !phone) {
      alert('Please enter both email and phone number');
      return;
    }
    // Add your OTP logic here
    alert(`OTP sent to ${email} and ${phone}`);
    // Example: navigate('/otp-input');
  }

  return (
    <div className="login-bg">
      <div className="login-container">
        <img src="/assets/otp-illustration.png" alt="OTP" className="login-illustration" />
        <div className="login-title">OTP Verification</div>
        <div className="login-subtitle">
          Enter email and phone number to send one time Password
        </div>
        <form className="login-form" onSubmit={handleContinue}>
          <div className="input-label">Email Id</div>
          <div className="input-row">
            <input
              type="email"
              className="login-input"
              placeholder="dscode@gmail.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <span className="input-icon">
              <svg width="20" height="20" fill="#2563eb" viewBox="0 0 24 24"><path d="M2 6.5v11c0 .825.675 1.5 1.5 1.5h17c.825 0 1.5-.675 1.5-1.5v-11c0-.825-.675-1.5-1.5-1.5h-17c-.825 0-1.5.675-1.5 1.5zm1.5-.5h17c.275 0 .5.225.5.5v.511l-9 6.75-9-6.75v-.511c0-.275.225-.5.5-.5zm-.5 2.489 8.5 6.375c.175.131.425.131.6 0l8.5-6.375v9.011c0 .275-.225.5-.5.5h-17c-.275 0-.5-.225-.5-.5v-9.011z"/></svg>
            </span>
          </div>
          <div className="input-label">Phone Number</div>
          <div className="input-row">
            <input
              type="tel"
              className="login-input"
              placeholder="+91 79041 62755"
              value={phone}
              onChange={e => setPhone(e.target.value.replace(/[^\d+ ]/g, ''))}
              required
            />
            <span className="input-icon">
              <svg width="20" height="20" fill="#2563eb" viewBox="0 0 24 24"><path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21c1.21.49 2.53.76 3.88.76a1 1 0 011 1v3.5a1 1 0 01-1 1C10.07 22 2 13.93 2 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.35.27 2.67.76 3.88a1 1 0 01-.21 1.11l-2.2 2.2z"/></svg>
            </span>
          </div>
          <div className="caduceus-bg"></div>
          <button type="submit" className="login-btn">Continue</button>
        </form>
      </div>
    </div>
  );
}

export default LoginVerificationPage;