// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

let firebaseConfig = {
  apiKey: "AIzaSyCQHaJQF3gUnC-6L5VblaHicPkncJdd914",
  authDomain: "web-db289.firebaseapp.com",
  databaseURL: "https://web-db289.firebaseio.com",
  projectId: "web-db289",
  storageBucket: "web-db289.appspot.com",
  messagingSenderId: "1079406355159",
  appId: "1:1079406355159:web:7593c2bd0ff3f798748692",
  measurementId: "G-X7S5GV88R0",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const firebaseStorage = firebase.storage();
const firebaseFirestore = firebase.firestore();

export { firebaseStorage, firebaseFirestore };
