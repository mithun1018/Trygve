import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  type ConfirmationResult,
  type UserCredential,
} from "firebase/auth";
import { app } from "./config";

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Extend the window object to store the reCAPTCHA verifier
// This helps prevent re-rendering issues in frontend frameworks
declare global {
  interface Window {
    recaptchaVerifier?: RecaptchaVerifier;
  }
}

/**
 * Configures and returns a reCAPTCHA verifier.
 * It will be rendered in the HTML element with the ID 'recaptcha-container'.
 * @returns {RecaptchaVerifier} The reCAPTCHA verifier instance.
 */
export const setupRecaptcha = (): RecaptchaVerifier => {
  if (!window.recaptchaVerifier) {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container", // This ID must match an element in your component
      {
        size: "invisible",
        callback: (response: any) => {
          // reCAPTCHA solved, you can proceed with sign-in
          console.log("reCAPTCHA solved");
        },
        "expired-callback": () => {
          // Response expired. User needs to solve reCAPTCHA again.
          console.log("reCAPTCHA expired");
        },
      }
    );
  }
  return window.recaptchaVerifier;
};

/**
 * Sends a verification code to the provided phone number.
 * @param {string} phoneNumber - The user's phone number in E.164 format.
 * @returns {Promise<ConfirmationResult>} A promise that resolves with the confirmation result.
 */
export const sendOtp = async (
  phoneNumber: string
): Promise<ConfirmationResult> => {
  const appVerifier = setupRecaptcha();
  try {
    const confirmationResult = await signInWithPhoneNumber(
      auth,
      phoneNumber,
      appVerifier
    );
    return confirmationResult;
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw error;
  }
};

/**
 * Verifies the OTP code entered by the user.
 * @param {ConfirmationResult} confirmationResult - The object received after sending the OTP.
 * @param {string} otp - The 6-digit code entered by the user.
 * @returns {Promise<UserCredential>} A promise that resolves with the user's credentials upon success.
 */
export const verifyOtp = async (
  confirmationResult: ConfirmationResult,
  otp: string
): Promise<UserCredential> => {
  try {
    const userCredential = await confirmationResult.confirm(otp);
    return userCredential;
  } catch (error) {
    console.error("Error verifying OTP:", error);
    throw error;
  }
};