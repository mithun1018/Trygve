import React, { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import type { User } from 'firebase/auth';
import type { UserCredential } from 'firebase/auth';
import { auth, sendOtp as firebaseSendOtp, verifyOtp as firebaseVerifyOtp, setupRecaptcha } from '../FireBase/auth';

// Define the shape of the context data
interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  sendOtp: (phoneNumber: string) => Promise<void>;
  verifyOtp: (otp: string) => Promise<UserCredential | void>;
  signOut: () => Promise<void>;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to easily use the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// The provider component that wraps your app
export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    // Set up reCAPTCHA on mount
    // setupRecaptcha();

    return unsubscribe; // Cleanup subscription on unmount
  }, []);

  // Auth functions to be provided by the context
  const [confirmationResult, setConfirmationResult] = useState<any>(null);

  const sendOtp = async (phoneNumber: string) => {
    const result = await firebaseSendOtp(phoneNumber);
    setConfirmationResult(result);
  };

  const verifyOtp = (otp: string) => {
    if (!confirmationResult) {
      throw new Error('No confirmation result available. Please send OTP first.');
    }
    return firebaseVerifyOtp(confirmationResult, otp);
  };

  const signOut = () => {
    return firebaseSignOut(auth);
  };

  const value = {
    currentUser,
    loading,
    sendOtp,
    verifyOtp,
    signOut,
  };

  // Render children only after the initial loading is complete
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}