
document.addEventListener("DOMContentLoaded", function () {
  const signUpBtn = document.getElementById("sign-up");
  const loginBtn = document.getElementById("login");
  const signOutBtn = document.getElementById("sign-out");

  const auth = firebase.auth();

  auth.onAuthStateChanged(user => {
    if (user) {
      signUpBtn.style.display = "none";
      loginBtn.style.display = "none";
      signOutBtn.style.display = "inline-block";
    } else {
      signUpBtn.style.display = "inline-block";
      loginBtn.style.display = "inline-block";
      signOutBtn.style.display = "none";
    }
  });

  signUpBtn.onclick = () => alert("Redirect to Sign Up page or modal.");
  loginBtn.onclick = () => alert("Redirect to Login page or modal.");
  signOutBtn.onclick = () => auth.signOut();
});
