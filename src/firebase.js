// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getFirestore } from '@firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJKkh9-_fGn_zTNsspcEPBeGhiTGNfPBg",
  authDomain: "test-5f50e.firebaseapp.com",
  projectId: "test-5f50e",
  storageBucket: "test-5f50e.appspot.com",
  messagingSenderId: "1068568842556",
  appId: "1:1068568842556:web:297c4fa2fe43e0346ece39",
  measurementId: "G-8X4TP91Z3R"
};

firebase.initializeApp(firebaseConfig);

export const db = getFirestore(firebase.initializeApp(firebaseConfig))

export default firebase;