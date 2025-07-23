import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import useAuth
import '../styles/signUpOtp.css';
import { setupRecaptcha } from '../FireBase/auth';

function maskNumber(number: string) {
  if (!number) return '';
  return number.replace(/^(\+\d{2})\d{4}(\d{4})$/, '$1****$2');
}

function SignUpOtp() {
  const [otp, setOtp] = useState(Array(6).fill(''));
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const { sendOtp, verifyOtp } = useAuth(); // Get auth functions from context

  const phone = location.state?.phone || localStorage.getItem('signup_phone') || '';

  // Send OTP when the component mounts
  useEffect(() => {
    if (phone) {
      localStorage.setItem('signup_phone', phone);
      handleResend(); // Use handleResend to send the initial OTP
    } else {
      // If no phone number, redirect back
      navigate('/sign-up');
    }
  }, []); // Run only once

  // reCAPTCHA setup
  useEffect(() => {
    // Ensure the container exists before calling setupRecaptcha
    if (!window.recaptchaVerifier && document.getElementById('recaptcha-container')) {
      setupRecaptcha();
    }
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>, idx: number) {
    const val = e.target.value.replace(/\D/g, '').slice(0, 1);
    const newOtp = [...otp];
    newOtp[idx] = val;
    setOtp(newOtp);
    setError('');
    if (val && idx < 5) {
      inputRefs.current[idx + 1]?.focus();
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>, idx: number) {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0) {
      inputRefs.current[idx - 1]?.focus();
    }
  }

  async function handleVerify(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const enteredOtp = otp.join('');

    if (enteredOtp.length !== 6) {
      setError('Please enter a 6-digit OTP.');
      setLoading(false);
      return;
    }

    try {
      await verifyOtp(enteredOtp);
      alert('OTP Verified!');
      navigate('/sign-up-details');
    } catch (err) {
      setError('Invalid OTP. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    setError('');
    setLoading(true);
    try {
      await sendOtp(phone);
      setOtp(Array(6).fill(''));
      inputRefs.current[0]?.focus();
      alert('A new OTP has been sent.');
    } catch (err) {
      setError('Failed to send OTP. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="otp-bg">
      <div className="otp-container">
        {/* This div is required for the invisible reCAPTCHA */}
        <div id="recaptcha-container"></div>
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
                ref={el => { inputRefs.current[idx] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                className="otp-input"
                value={digit}
                onChange={e => handleChange(e, idx)}
                onKeyDown={e => handleKeyDown(e, idx)}
                autoFocus={idx === 0}
                disabled={loading}
              />
            ))}
          </div>
          {error && <div className="otp-error">{error}</div>}
          <div className="otp-resend">
            Didn't receive code? <span className="otp-link" onClick={handleResend}>Resend</span>
          </div>
          <div className="caduceus-bg"></div>
          <button type="submit" className="otp-btn" disabled={loading}>
            {loading ? 'Verifying...' : 'Verify'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUpOtp;