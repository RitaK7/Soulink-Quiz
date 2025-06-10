import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { firebaseConfig } from './firebase-config.js';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Callback funkcija naudotojo stebėsenai
function observeUser(callback) {
  onAuthStateChanged(auth, (user) => {
    callback(user);
  });
}

// Atsijungimo funkcija
function logout() {
  return signOut(auth);
}

export { auth, observeUser, logout };