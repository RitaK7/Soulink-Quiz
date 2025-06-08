// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

// Saugūs kintamieji iš .env failo (naudojant Vite ar kitą bundlerį)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Inicializuojame Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Funkcija duomenų išsaugojimui
export function saveQuizData(userId, data) {
  set(ref(db, 'soulink/quizAnswers/' + userId), {
    ...data,
    timestamp: Date.now()
  });
}
