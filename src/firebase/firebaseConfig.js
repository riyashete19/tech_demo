import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDRzeDmRNsvVXhk6hWPIViJBHrdssdsh2U",
  authDomain: "healthcare-1f835.firebaseapp.com",
  projectId: "healthcare-1f835",
  storageBucket: "healthcare-1f835.appspot.com",
  messagingSenderId: "211281943401",
  appId: "1:211281943401:web:9b5736bf9dd20355273bf8"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };