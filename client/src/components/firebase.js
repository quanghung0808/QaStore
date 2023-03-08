// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDRyUemAWbtEmEPsomVLfV3lIm84rR3GtU",
  authDomain: "assignment-3-9e1d7.firebaseapp.com",
  projectId: "assignment-3-9e1d7",
  storageBucket: "assignment-3-9e1d7.appspot.com",
  messagingSenderId: "543493785452",
  appId: "1:543493785452:web:129772443509b418269549",
  measurementId: "G-E24RJR1SVV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
