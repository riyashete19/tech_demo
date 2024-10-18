import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBAe0fqnhgNAm4yxY6v3GR5ajWaHZGqlhI",
  authDomain: "careindiaapp-795fe.firebaseapp.com",
  projectId: "careindiaapp-795fe",
  storageBucket: "careindiaapp-795fe.appspot.com",
  messagingSenderId: "1069706010650",
  appId: "1:1069706010650:web:b54030d127afc7b9bc71a3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Auth
export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;