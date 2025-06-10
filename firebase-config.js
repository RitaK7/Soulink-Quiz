import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCb0TOXVrP1dQe16T6RNRvAg8lwu9QPnf4",
  authDomain: "soulink-342bb.firebaseapp.com",
  projectId: "soulink-342bb",
  storageBucket: "soulink-342bb.appspot.com",
  messagingSenderId: "541312933178",
  appId: "1:541312933178:web:239cbbb60e68b183f48403",
  measurementId: "G-7DQPK8J701"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };