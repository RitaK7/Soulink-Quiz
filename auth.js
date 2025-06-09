// auth.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCb0TOXVrP1dQe16T6RNRvAg8lwu9QPnf4",
  authDomain: "soulink-342bb.firebaseapp.com",
  projectId: "soulink-342bb",
  storageBucket: "soulink-342bb.firebasestorage.app",
  messagingSenderId: "541312933178",
  appId: "1:541312933178:web:239cbbb60e68b183f48403",
  measurementId: "G-7DQPK8J701"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export function createUser(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      console.log("User created:", userCredential.user);
      document.getElementById('signupMsg').classList.remove('hidden');
      setTimeout(() => window.location.href = "my-soul.html", 1500);
    })
    .catch(error => alert("Error: " + error.message));
}

export function loginUser(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      console.log("Logged in:", userCredential.user);
      window.location.href = "my-soul.html";
    })
    .catch(error => alert("Login failed: " + error.message));
}

export function logoutUser() {
  signOut(auth).then(() => {
    alert("Logged out");
    window.location.href = "login.html";
  });
}

export function checkAuth() {
  onAuthStateChanged(auth, user => {
    if (!user) {
      window.location.href = "login.html";
    }
  });
}