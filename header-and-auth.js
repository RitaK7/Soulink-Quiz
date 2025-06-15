// -- header-and-auth.js --
document.addEventListener('DOMContentLoaded', () => {
  // 1) Įkeliam header
  fetch('header.html')
    .then(r => r.text())
    .then(html => {
      document.getElementById('site-header').innerHTML = html;
      // 2) APrašom Sign In/Out mygtukus
      const btnLogin   = document.getElementById('btn-login');
      const btnSignUp  = document.getElementById('btn-signup');
      const btnSignOut = document.getElementById('btn-signout');

      // 3) Stebim auth
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          btnLogin.style.display   = 'none';
          btnSignUp.style.display  = 'none';
          btnSignOut.style.display = 'inline-block';
        } else {
          btnLogin.style.display   = 'inline-block';
          btnSignUp.style.display  = 'inline-block';
          btnSignOut.style.display = 'none';
        }
      });

      btnLogin.addEventListener('click',   () => window.location.href = 'login.html');
      btnSignUp.addEventListener('click',  () => window.location.href = 'signup.html');
      btnSignOut.addEventListener('click', () => firebase.auth().signOut());
    })
    .catch(console.error);
});
