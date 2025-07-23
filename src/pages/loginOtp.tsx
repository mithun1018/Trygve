import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/loginOtp.css';

function generateOTP(length = 4) {
  return Array.from({ length }, () => Math.floor(Math.random() * 10)).join('');
}

function LoginOtp() {
  const [otp, setOtp] = useState(Array(4).fill(''));
  const [sentOtp, setSentOtp] = useState('');
  const [error, setError] = useState('');
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Generate and store OTP
    const newOtp = generateOTP(4);
    setSentOtp(newOtp);
    localStorage.setItem('login_otp', newOtp);
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>, idx: number) {
    const val = e.target.value.replace(/\D/g, '').slice(0, 1);
    const newOtp = [...otp];
    newOtp[idx] = val;
    setOtp(newOtp);
    setError('');
    // Focus next input
    if (val && idx < 3) {
      inputRefs.current[idx + 1]?.focus();
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>, idx: number) {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0) {
      inputRefs.current[idx - 1]?.focus();
    }
  }

 function handleContinue(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  const entered = otp.join('');
  if (entered === sentOtp) {
    alert('OTP Verified!');
    navigate('/login-success'); // Redirect to login success page
  } else {
    setError('Invalid OTP. Please try again.');
  }
}

  return (
    <div className="loginotp-bg">
      <div className="loginotp-container">
        <button className="loginotp-back" onClick={() => navigate(-1)}>&lt;</button>
        <div className="loginotp-title">Verification Code</div>
        <div className="loginotp-subtitle">
          We have sent the verification code to your email address
        </div>
        <form className="loginotp-form" onSubmit={handleContinue}>
          <div className="loginotp-inputs">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                ref={el => { inputRefs.current[idx] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                className="loginotp-input"
                value={digit}
                onChange={e => handleChange(e, idx)}
                onKeyDown={e => handleKeyDown(e, idx)}
                autoFocus={idx === 0}
              />
            ))}
          </div>
          {error && <div className="loginotp-error">{error}</div>}
          <div className="caduceus-bg"></div>
          <button type="submit" className="loginotp-btn">Continue</button>
        </form>
      </div>
    </div>
  );
}

export default LoginOtp;