import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration
// You'll need to replace these with your actual Firebase project credentials
// For production, use environment variables: VITE_FIREBASE_*
const firebaseConfig = {
  apiKey: "AIzaSyDJkOJW0eRJnH6ytTVp3EsYEfyBy2TmQp4",
  authDomain: "babamsite-fe51d.firebaseapp.com",
  projectId: "babamsite-fe51d",
  storageBucket: "babamsite-fe51d.appspot.com",
  messagingSenderId: "623565355193",
  appId: "1:623565355193:web:53d15e6d5b8357a7b20368",
  measurementId: "G-HR2SXF65X7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;