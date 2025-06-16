// firebase-config.js
// (no real keys here—just reads from env)
import firebase from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app-compat.js";
import "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth-compat.js";

const firebaseConfig = {
  apiKey:             process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
  authDomain:         process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,
  projectId:          process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
  storageBucket:      process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET,
  messagingSenderId:  process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID,
  appId:              process.env.NEXT_PUBLIC_FIREBASE_APPID,
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export default firebase;
