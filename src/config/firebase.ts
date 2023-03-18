// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCkbT1coB2QEupcsqLMn0UfXNf1y_sQKt0",
  authDomain: "social-media-react-app-5b90c.firebaseapp.com",
  projectId: "social-media-react-app-5b90c",
  storageBucket: "social-media-react-app-5b90c.appspot.com",
  messagingSenderId: "959148760171",
  appId: "1:959148760171:web:50fb8adc90991d5619a52e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();