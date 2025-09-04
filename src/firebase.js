// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCDBTDoSP78jr_UKtVOcqxBxmqcWb61pZg",
    authDomain: "microsite-promo.firebaseapp.com",
    projectId: "microsite-promo",
    storageBucket: "microsite-promo.firebasestorage.app",
    messagingSenderId: "983380149477",
    appId: "1:983380149477:web:fdab7b019f29278e8a000c",
    measurementId: "G-F8FR03QLTZ"
};

const firebaseApp = initializeApp(firebaseConfig);

export { firebaseApp, firebaseConfig };
export const db = getFirestore(firebaseApp); 