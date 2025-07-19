import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/signUpOtp.css';

function generateOTP(length = 6) {
  return Array.from({ length }, () => Math.floor(Math.random() * 10)).join('');
}

function maskNumber(number) {
  if (!number) return '';
  return number.replace(/^(\+\d{2})\d{4}(\d{4})$/, '$1****$2');
}

function SignUpOtp() {
  const [otp, setOtp] = useState(Array(6).fill(''));
  const [sentOtp, setSentOtp] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  // Get phone number from location state or localStorage
  const phone = location.state?.phone || localStorage.getItem('signup_phone') || '';

  useEffect(() => {
    // Generate and store OTP
    const newOtp = generateOTP(6);
    setSentOtp(newOtp);
    localStorage.setItem('signup_otp', newOtp);
    if (phone) localStorage.setItem('signup_phone', phone);
  }, [phone]);

  function handleChange(e, idx) {
    const val = e.target.value.replace(/\D/g, '').slice(0, 1);
    const newOtp = [...otp];
    newOtp[idx] = val;
    setOtp(newOtp);
    setError('');
    // Focus next input
    if (val && idx < 5) {
      inputRefs.current[idx + 1]?.focus();
    }
  }

  function handleKeyDown(e, idx) {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0) {
      inputRefs.current[idx - 1]?.focus();
    }
  }

  function handleVerify(e) {
    e.preventDefault();
    const entered = otp.join('');
    if (entered === sentOtp) {
      alert('OTP Verified!');
      // Redirect to next page or dashboard
      // navigate('/dashboard');
    } else {
      setError('Invalid OTP. Please try again.');
    }
  }

  function handleResend() {
    const newOtp = generateOTP(6);
    setSentOtp(newOtp);
    localStorage.setItem('signup_otp', newOtp);
    setOtp(Array(6).fill(''));
    inputRefs.current[0]?.focus();
    setError('');
    alert('OTP resent: ' + newOtp);
  }

  return (
    <div className="otp-bg">
      <div className="otp-container">
        <button className="otp-back" onClick={() => navigate(-1)}>&lt;</button>
        <div className="otp-title">OTP Verification</div>
        <div className="otp-subtitle">
          Enter the verification code we just sent to your number {maskNumber(phone)}
        </div>
        <form className="otp-form" onSubmit={handleVerify}>
          <div className="otp-inputs">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                ref={el => inputRefs.current[idx] = el}
                type="text"
                inputMode="numeric"
                maxLength={1}
                className="otp-input"
                value={digit}
                onChange={e => handleChange(e, idx)}
                onKeyDown={e => handleKeyDown(e, idx)}
                autoFocus={idx === 0}
              />
            ))}
          </div>
          {error && <div className="otp-error">{error}</div>}
          <div className="otp-resend">
            Didn't receive code? <span className="otp-link" onClick={handleResend}>Resend</span>
          </div>
          <div className="caduceus-bg"></div>
          <button type="submit" className="otp-btn">Verify</button>
        </form>
      </div>
    </div>
  );
}

export default SignUpOtp;