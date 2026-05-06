import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, setPersistence, browserLocalPersistence } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBZtT7r-2m_4IXj_e3xXc0H5-zJS2G4FQ0",
  authDomain: "softsafe-company.firebaseapp.com",
  databaseURL: "https://softsafe-company-default-rtdb.firebaseio.com",
  projectId: "softsafe-company",
  messagingSenderId: "660443243088",
  appId: "1:660443243088:web:8a2ad56dcea7c95cdd2755",
  measurementId: "G-HCTSMFD4N9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

setPersistence(auth, browserLocalPersistence).catch(console.error);

export { app, auth, db };