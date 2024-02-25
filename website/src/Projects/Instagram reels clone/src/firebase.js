import firebase from "firebase";


const firebaseConfig = {
  apiKey: "AIzaSyAfcBAW8lOedU8GKFYH7w9UepDfcX0AfVc",
  authDomain: "insta-reels-f9c4e.firebaseapp.com",
  projectId: "insta-reels-f9c4e",
  storageBucket: "insta-reels-f9c4e.appspot.com",
  messagingSenderId: "17652250372",
  appId: "1:17652250372:web:f4f0299d0a9382aa6e0251",
  measurementId: "G-N934NVSWEC"
};


const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

export default db;