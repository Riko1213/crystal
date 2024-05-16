// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAz-k1G3i3PpNOAf_WZTauOSbFQ8oRkRqg",
    authDomain: "online-shop-feb9a.firebaseapp.com",
    projectId: "online-shop-feb9a",
    storageBucket: "online-shop-feb9a.appspot.com",
    messagingSenderId: "211114972592",
    appId: "1:211114972592:web:0b43b61979373edff9b275"
  };

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
