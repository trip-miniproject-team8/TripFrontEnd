import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCJzRxAPw_1_OgGiNWvUvmo8TBE0uF6iuY",
  authDomain: "magazine-a1053.firebaseapp.com",
  projectId: "magazine-a1053",
  storageBucket: "magazine-a1053.appspot.com",
  messagingSenderId: "643013821029",
  appId: "1:643013821029:web:cab4a6064a06487f3a3c8c",
  measurementId: "G-LFMZPQB9XW"
};

firebase.initializeApp(firebaseConfig);

const apiKey = firebaseConfig.apiKey;
const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();

export { auth, apiKey, firestore, storage };