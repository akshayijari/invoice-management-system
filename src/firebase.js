// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { getFirestore } from 'firebase/firestore'; //for access to Firestore
import { EmailAuthProvider } from 'firebase/auth'; //for email and password authentication
import { getAuth } from 'firebase/auth'; // for access to authentication
import { getStorage } from 'firebase/storage'; //for access to Firebase storage


const firebaseConfig = {
  apiKey: "AIzaSyDCu6yLyNP9v96_8g8pOWZHMqY8-R7XNHI",
  authDomain: "invoice-management-syste-8973d.firebaseapp.com",
  projectId: "invoice-management-syste-8973d",
  storageBucket: "invoice-management-syste-8973d.appspot.com",
  messagingSenderId: "414466438657",
  appId: "1:414466438657:web:e6adc20206f97229d8f200",
  measurementId: "G-TRTT4N2YV4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const provider = new EmailAuthProvider();
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
export { provider, auth, storage };
export default db;
