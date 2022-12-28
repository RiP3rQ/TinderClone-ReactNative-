// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOmDhBnKmzN5SQ5gviarXDf05cEDrRJmg",
  authDomain: "tinder-clone-app-yt-82dd1.firebaseapp.com",
  projectId: "tinder-clone-app-yt-82dd1",
  storageBucket: "tinder-clone-app-yt-82dd1.appspot.com",
  messagingSenderId: "296531923790",
  appId: "1:296531923790:web:e1635f365291e05d1f441f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { auth, db };
