// src/signup.js
import { auth } from "./firebase-config.js";
import { 
  createUserWithEmailAndPassword, 
  updateProfile 
} from "firebase/auth";

function showMessage(msg, isError = true) {
  const el = document.getElementById("message");
  el.textContent = msg;
  el.style.color = isError ? "#ffcccb" : "#9fffb4";
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signupForm");
  form.addEventListener("submit", async e => {
    e.preventDefault();
    const name     = form.displayName.value.trim();
    const email    = form.email.value.trim();
    const password = form.password.value;
    const confirm  = form.confirmPassword.value;
    const terms    = form.terms.checked;

    if (password !== confirm)     return showMessage("Passwords do not match.");
    if (!terms)                   return showMessage("Please accept terms.");
    if (password.length < 6)      return showMessage("Password must be ≥6 chars.");

    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(user, { displayName: name });
      // **Išsaugome localStorage**:
      localStorage.setItem("soulinkUser", JSON.stringify({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName
      }));
      // Redirect
      window.location.href = "/dashboard.html";
    } catch (err) {
      showMessage(err.message);
    }
  });
});
