import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/numberInputPage.css';

function NumberInputPage() {
  const [countryCode, setCountryCode] = useState('+91');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  function handleSendCode(e: React.FormEvent) {
    e.preventDefault();
    // Add your phone validation and code sending logic here
    if (phone.trim().length >= 10) {
      // Redirect to code verification page or show success
      alert('Code sent to ' + countryCode + ' ' + phone);
      // Example: navigate('/verify-code');
    } else {
      alert('Please enter a valid phone number');
    }
  }

  return (
    <div
      className="number-bg"
      style={{
        backgroundImage: "url('/assets/5.png')", // <-- Change path as needed
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="number-container">
        <button className="back-btn" onClick={() => navigate(-1)}>&lt;</button>
        <div className="number-title">Can you input your number?</div>
        <div className="number-subtitle">
          You will be sent a code on this number to verify if you are the owner of the number.
        </div>
        <form className="number-form" onSubmit={handleSendCode}>
          <div className="input-row">
            <div className="country-code">
              {/* <img src="/assets/india-flag.png" alt="IN" className="flag" /> */}
              <span>{countryCode}</span>
            </div>
            <input
              type="tel"
              className="phone-input"
              placeholder="12345 67890"
              value={phone}
              onChange={e => setPhone(e.target.value.replace(/\D/g, ''))}
              maxLength={10}
              required
            />
          </div>
          <div className="caduceus-bg"></div>
          <button type="submit" className="send-btn" onClick={() => navigate('/sign-up-otp', { state: { phone } })}>
  Send Code
</button>
        </form>
        <div className="login-link">
          Already have an account?{' '}
          <span className="link" onClick={() => navigate('/login')}>Log in</span>
        </div>
      </div>
    </div>
  );
}

export default NumberInputPage;