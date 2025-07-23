import './App.css';
import LandingPage from './pages/landingPage';
import WelcomePage from './pages/welcomePage';
import NumberInputPage from './pages/numberInputPage';
import LoginVerificationPage from './pages/loginVerficationPage';
import SignUpOtp from './pages/signUpOtp'; 
import SignUpDetails from './pages/signUpDetails';
import SignupSuccess from './pages/signupSuccess';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';


function App() {
  return (
    <BrowserRouter>
<<<<<<< Updated upstream
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/number-input" element={<NumberInputPage />} />
        <Route path="/login-verification" element={<LoginVerificationPage />} />
        <Route path="/sign-up-otp" element={<SignUpOtp />} />
        <Route path="/sign-up-details" element={<SignUpDetails />} />
        <Route path="/signup-success" element={<SignupSuccess />} />
      </Routes>
=======
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/number-input" element={<NumberInputPage />} />
          <Route path="/login-verification" element={<LoginVerificationPage />} />
          <Route path="/sign-up-otp" element={<SignUpOtp />} />
          <Route path="/sign-up-details" element={<SignUpDetails />} />
          <Route path="/signup-success" element={<SignupSuccess />} />
          <Route path="/login-otp" element={<LoginOtp />} />
          <Route path="/login-success" element={<LoginSuccess />} />
        </Routes>
      </AuthProvider>
>>>>>>> Stashed changes
    </BrowserRouter>
  );
}

export default App;