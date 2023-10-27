// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjpghrInIk8v3rvrz09JiCg2mbRv87QXE",
  authDomain: "keijiban-94bd5.firebaseapp.com",
  projectId: "keijiban-94bd5",
  storageBucket: "keijiban-94bd5.appspot.com",
  messagingSenderId: "77297593310",
  appId: "1:77297593310:web:d491c1cc29d73341844b4f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export {app, auth, db}
