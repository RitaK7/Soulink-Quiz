// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCb0TOXVrP1dQe16T6RNRvAg8lwu9QPnf4",
  authDomain: "soulink-342bb.firebaseapp.com",
  projectId: "soulink-342bb",
  storageBucket: "soulink-342bb.firebasestorage.app",
  messagingSenderId: "541312933178",
  appId: "1:541312933178:web:239cbbb60e68b183f48403",
  measurementId: "G-7DQPK8J701"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Function to save quiz data
export function saveQuizData(userId, data) {
  set(ref(db, 'soulink/quizAnswers/' + userId), {
    ...data,
    timestamp: Date.now()
  });
}