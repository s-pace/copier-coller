import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD1dy_NO1fe_6ggfQZSFzbYjWY6145zFxg",
  authDomain: "print-jam-1cfe8.firebaseapp.com",
  projectId: "print-jam-1cfe8",
  storageBucket: "print-jam-1cfe8.appspot.com",
  messagingSenderId: "1056753917329",
  appId: "1:1056753917329:web:78d2d48ce6930845f70e30",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

export default app;
