// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5FNPKb99cvS-I6TZHKd91egnjfbSH21Y",
  authDomain: "trygve-frontend.firebaseapp.com",
  projectId: "trygve-frontend",
  storageBucket: "trygve-frontend.firebasestorage.app",
  messagingSenderId: "397898956814",
  appId: "1:397898956814:web:a391788807634479db3c5f",
  measurementId: "G-TZQCH36ED3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);