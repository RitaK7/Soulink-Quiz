// auth.js

// 1) Priklausomybė: firebase.initializeApp(...) jau turi būti paleista iš firebase-config.js
const auth = firebase.auth();

// Funkcija header.html įkrovimui
function loadHeader() {
  fetch('header.html')
    .then(response => response.text())
    .then(html => {
      document.getElementById('site-header').innerHTML = html;
      setupAuthButtons();
    })
    .catch(err => console.error('Error loading header:', err));
}

// Auth mygtukų logika
function setupAuthButtons() {
  const btnSignUp  = document.getElementById('sign-up');
  const btnLogin   = document.getElementById('login');
  const btnSignOut = document.getElementById('sign-out');

  // Rodyti / slėpti mygtukus pagal vartotojo būseną
  auth.onAuthStateChanged(user => {
    if (user) {
      btnSignUp.style.display  = 'none';
      btnLogin.style.display   = 'none';
      btnSignOut.style.display = 'inline-block';
    } else {
      btnSignUp.style.display  = 'inline-block';
      btnLogin.style.display   = 'inline-block';
      btnSignOut.style.display = 'none';
    }
  });

  // Mygtukų event'ai
  btnSignUp.addEventListener('click',  () => window.location.href = 'signup.html');
  btnLogin.addEventListener('click',   () => window.location.href = 'login.html');
  btnSignOut.addEventListener('click', () => auth.signOut());
}

// Palaukiame, kol DOM sukrautas, ir kviečiame header įkrovimą
document.addEventListener('DOMContentLoaded', loadHeader);
