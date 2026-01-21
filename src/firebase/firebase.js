// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBFbvtlNRAKpumRIbKTeRFuSR8l9zeyAEY",
  authDomain: "code-espresso.firebaseapp.com",
  projectId: "code-espresso",
  storageBucket: "code-espresso.firebasestorage.app",
  messagingSenderId: "286363891743",
  appId: "1:286363891743:web:a99a5b45102e63a7937d2a",
  measurementId: "G-5N2ZJ7ZK9J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export {app , analytics,auth , db};