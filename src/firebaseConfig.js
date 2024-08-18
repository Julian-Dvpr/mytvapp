// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC3xXEJ0iUDHtZNv9DYR6on_hkbRnjTdpc",
  authDomain: "mytvapp-21994.firebaseapp.com",
  projectId: "mytvapp-21994",
  storageBucket: "mytvapp-21994.appspot.com",
  messagingSenderId: "368853593399",
  appId: "1:368853593399:web:a1a81ba94b0bdbc95bfeb2"
};
// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };
