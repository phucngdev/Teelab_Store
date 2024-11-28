import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "store-teelab.firebaseapp.com",
  projectId: "store-teelab",
  storageBucket: "store-teelab.appspot.com",
  messagingSenderId: "929760630673",
  appId: "1:929760630673:web:61f1744d74f23041472c30",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
