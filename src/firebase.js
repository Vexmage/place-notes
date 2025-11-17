import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {

  apiKey: "AIzaSyAwy4GboCLncgSMU6AcD4jptOLhkFTHuKQ",

  authDomain: "placenotes-7896b.firebaseapp.com",

  projectId: "placenotes-7896b",

  storageBucket: "placenotes-7896b.firebasestorage.app",

  messagingSenderId: "533261447876",

  appId: "1:533261447876:web:ca8fea43590f7e7c23cf91"

};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
