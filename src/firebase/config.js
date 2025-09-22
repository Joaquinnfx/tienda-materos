// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3k5QCEVswu5lUpiIIT_KZDsFpSjuJfSI",
  authDomain: "tiendamateros-567d9.firebaseapp.com",
  projectId: "tiendamateros-567d9",
  storageBucket: "tiendamateros-567d9.firebasestorage.app",
  messagingSenderId: "600818454514",
  appId: "1:600818454514:web:045ea571293a6ab2e9e56b",
  measurementId: "G-GJSMXB4KKL"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Inicializar servicios
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;