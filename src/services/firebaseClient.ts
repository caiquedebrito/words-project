import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

const CLIENT_CONFIG = {
  apiKey: "AIzaSyCfrP8INRMhy0K0yQzjx5UcW1dFw27a0go",
  authDomain: "words-project-c63f6.firebaseapp.com",
  projectId: "words-project-c63f6",
  storageBucket: "words-project-c63f6.appspot.com",
  messagingSenderId: "321029034853",
  appId: "1:321029034853:web:0af3f33a5695b7ee05078c"
};

const app = initializeApp(CLIENT_CONFIG)

export const authClient = getAuth()

