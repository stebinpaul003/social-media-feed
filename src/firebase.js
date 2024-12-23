import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCPR-tgd8kDkSgSUoMHuqjNGN7Mu9_G2D0",
    authDomain: "social-media-feed-8014b.firebaseapp.com",
    projectId: "social-media-feed-8014b",
    storageBucket: "social-media-feed-8014b.firebasestorage.app",
    messagingSenderId: "508442546446",
    appId: "1:508442546446:web:bf87427c4ee8e6bb4dc75f"
  };

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export const googleProvider = new GoogleAuthProvider();