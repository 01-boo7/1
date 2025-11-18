import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAYjrTUahyT4vr_CDWpeeOOzU9GI_QS7kI",
  authDomain: "prandhima.firebaseapp.com",
  projectId: "prandhima",
  storageBucket: "prandhima.firebasestorage.app",
  messagingSenderId: "696702554012",
  appId: "1:696702554012:web:49f6006604ceb3b0418259",
  measurementId: "G-J384WT0S4W"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);