import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/signUpDetails.css';

function SignUpDetails() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('Arasur, Coimbatore');
  const [secondaryPhone, setSecondaryPhone] = useState('');
  const navigate = useNavigate();

function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  if (!fullName || !email || !location) {
    alert('Please fill all required fields');
    return;
  }
  localStorage.setItem('signup_fullName', fullName);
  localStorage.setItem('signup_email', email);
  localStorage.setItem('signup_location', location);
  localStorage.setItem('signup_secondaryPhone', secondaryPhone);
  alert('Account Created!');
  navigate('/signup-success'); // <-- Add this line
}

  return (
    <div className="details-bg">
      <div className="details-container">
        <button className="details-back" onClick={() => navigate(-1)}>&lt;</button>
        <div className="details-title">Almost Done!</div>
        <div className="details-subtitle">
          Please enter your details in the following section.
        </div>
        <form className="details-form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="details-input"
            placeholder="Enter Full Name"
            value={fullName}
            onChange={e => setFullName(e.target.value)}
            required
          />
          <input
            type="email"
            className="details-input"
            placeholder="Enter Email Address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <div className="details-location-row">
            <input
              type="text"
              className="details-input location-input"
              placeholder="Location"
              value={location}
              onChange={e => setLocation(e.target.value)}
              required
            />
            <span className="location-icon">
              <svg width="22" height="22" fill="#2563eb" viewBox="0 0 24 24"><path d="M12 2C8.13401 2 5 5.13401 5 9C5 13.25 11.11 21.13 11.41 21.5C11.6 21.73 11.8 21.88 12 21.88C12.2 21.88 12.4 21.73 12.59 21.5C12.89 21.13 19 13.25 19 9C19 5.13401 15.866 2 12 2ZM12 12C10.3431 12 9 10.6569 9 9C9 7.34315 10.3431 6 12 6C13.6569 6 15 7.34315 15 9C15 10.6569 13.6569 12 12 12Z"/></svg>
            </span>
          </div>
          <input
            type="tel"
            className="details-input"
            placeholder="Enter Secondary Phone Number"
            value={secondaryPhone}
            onChange={e => setSecondaryPhone(e.target.value.replace(/[^\d+ ]/g, ''))}
          />
          <div className="caduceus-bg"></div>
          <button type="submit" className="details-btn">Create Account</button>
        </form>
      </div>
    </div>
  );
}

export default SignUpDetails;