import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
    apiKey: "AIzaSyAeSVDfFb9DFBiqRi0o6mw6n8zMxvJ6-so",
    authDomain: "shopping-4a515.firebaseapp.com",
    projectId: "shopping-4a515",
    storageBucket: "shopping-4a515.appspot.com",
    messagingSenderId: "181443360907",
    appId: "1:181443360907:web:da8b74ca8d3b58bca33c8e",
    measurementId: "G-0WKVX3DYHR"
  };
  const firebaseApp = initializeApp(firebaseConfig);  
  getAnalytics(firebaseApp); 
  const db = getFirestore(firebaseApp);

export { db };