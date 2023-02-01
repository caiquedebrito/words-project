import { FirebaseOptions, getApps, initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore"

let CLIENT_CONFIG: FirebaseOptions = {
  apiKey: "AIzaSyCfrP8INRMhy0K0yQzjx5UcW1dFw27a0go",
  authDomain: "words-project-c63f6.firebaseapp.com",
  projectId: "words-project-c63f6",
  storageBucket: "words-project-c63f6.appspot.com",
  messagingSenderId: "321029034853",
  appId: "1:321029034853:web:0af3f33a5695b7ee05078c"
}

if (!getApps().length) {
  initializeApp(CLIENT_CONFIG)
}

export const firestore = getFirestore()
export const authClient = getAuth()

if (process.env.NODE_ENV !== "production") {
  connectAuthEmulator(authClient, "http://localhost:9099");
  connectFirestoreEmulator(firestore, 'localhost', 9090);
}