// db.js
import { db } from './firebase-config.js';
import { doc, setDoc } from "firebase/firestore";

export async function saveUserProfile(email, data) {
  try {
    await setDoc(doc(db, "users", email, "profile", "info"), data);
    console.log("✅ Profile saved to Firestore");
  } catch (error) {
    console.error("❌ Error saving profile:", error);
  }
}

export async function saveUserResults(email, data) {
  try {
    await setDoc(doc(db, "users", email, "results", "latest"), data);
    console.log("✅ Results saved to Firestore");
  } catch (error) {
    console.error("❌ Error saving results:", error);
  }
}