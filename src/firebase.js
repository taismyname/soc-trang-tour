// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB3tCioB4Cbvlss-y5CqRVFpDf67GB6UJc",
  authDomain: "soc-trang-tour.firebaseapp.com",
  projectId: "soc-trang-tour",
  storageBucket: "soc-trang-tour.firebasestorage.app",
  messagingSenderId: "54714574287",
  appId: "1:54714574287:web:e436ec70a1970ec93f5eba",
  measurementId: "G-56P09YPVGQ"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
