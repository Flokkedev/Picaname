import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where
} from "firebase/firestore";

// Firebase konfiguration
const firebaseConfig = {
  apiKey: "API_KEY",
  authDomain: "picaname-app.firebaseapp.com",
  projectId: "picaname-app",
  storageBucket: "picaname-app.appspot.com",
  messagingSenderId: "984689023810",
  appId: "1:984689023810:android:7a7045147eb1fbbf3446db",
};

console.log("Initializing Firebase...");
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
console.log("Firebase initialized.");

// Google Auth Provider
const googleProvider = new GoogleAuthProvider();

// Export functions
export {
  auth,
  db,
  googleProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  collection,
  addDoc,
  getDocs,
  query,
  where
};
