
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyC_KkyrmroKFeP3sT8c7HeLVuO8XqF2Lsc",
  authDomain: "ecommerce-villanueva.firebaseapp.com",
  projectId: "ecommerce-villanueva",
  storageBucket: "ecommerce-villanueva.appspot.com",
  messagingSenderId: "472924951502",
  appId: "1:472924951502:web:55ea7e0d98f216013ad19f"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
 