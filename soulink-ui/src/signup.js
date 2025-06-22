// 1) Importuojame Firebase modulius per CDN
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile
} from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js';

// 2) Įrašykite savo Firebase konfigą
const firebaseConfig = {
  apiKey: "JŪSŲ_API_KEY",
  authDomain: "JŪSŲ_AUTH_DOMAIN",
  projectId: "JŪSŲ_PROJECT_ID",
  storageBucket: "JŪSŲ_STORAGE_BUCKET",
  messagingSenderId: "JŪSŲ_SENDER_ID",
  appId: "JŪSŲ_APP_ID"
};

// 3) Inicializuojame Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 4) Paimame formos elementus
const form = document.getElementById('signupForm');
const messageDiv = document.getElementById('message');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  // surenkame įvestis
  const name = document.getElementById('fullName').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const agreed = document.getElementById('terms').checked;

  // validacijos
  if (password !== confirmPassword) {
    return showMessage('Passwords do not match');
  }
  if (!agreed) {
    return showMessage('You must agree to the Terms & Conditions');
  }

  // registracija
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // užpildome displayName
    await updateProfile(userCredential.user, { displayName: name });
    showMessage('Account created successfully!', 'success');
    form.reset();
  } catch (err) {
    showMessage(err.message);
  }
});

function showMessage(msg, type = 'error') {
  messageDiv.textContent = msg;
  messageDiv.className = type;   // galėsite CSS naudoti .error / .success stilizavimui
}
