import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDkVcN-3Dsu26YsUv50hrTrkDNhdLuDW9g",
    authDomain: "rentnex-36f4e.firebaseapp.com",
    projectId: "rentnex-36f4e",
    storageBucket: "rentnex-36f4e.firebasestorage.app",
    messagingSenderId: "727459813356",
    appId: "1:727459813356:web:d69bd99573343a605e12c9"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)