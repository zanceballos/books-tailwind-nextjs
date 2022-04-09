// Import the functions you need from the SDKs you need
import firebase from "firebase";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtjWxnIHYlKKbO3c3EyNP3fu3nf7ARLCI",
  authDomain: "bookify-nextjs.firebaseapp.com",
  projectId: "bookify-nextjs",
  storageBucket: "bookify-nextjs.appspot.com",
  messagingSenderId: "299741871977",
  appId: "1:299741871977:web:ca2cb358bfb59a9632c7f8",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Initialize Firebase
const auth = firebase.app().auth();
const db = firebase.app().firestore();

export { auth, db };
