// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";
import { firebaseConfig } from './config.js'; // Saugus importas

// Inicializuojam Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Funkcija duomenų išsaugojimui
export function saveQuizData(userId, data) {
  set(ref(db, 'soulink/quizAnswers/' + userId), {
    ...data,
    timestamp: Date.now()
  });
}
