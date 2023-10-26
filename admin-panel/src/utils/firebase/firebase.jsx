import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDzymsqEsnsvi88QV54cn3EiiryaMyafa0",
  authDomain: "leverance-oxygen.firebaseapp.com",
  projectId: "leverance-oxygen",
  storageBucket: "leverance-oxygen.appspot.com",
  messagingSenderId: "970394873814",
  appId: "1:970394873814:web:d37fad18dccac4c8607e77",
  measurementId: "G-BJGY5XGE5J"
};


const firebaseApp = initializeApp(firebaseConfig);


export const auth = getAuth();

export const db = getFirestore();

