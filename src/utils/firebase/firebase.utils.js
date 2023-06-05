import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCgSixLvXorIYTfAPUUQtmhPmID9kmMxQY",
  authDomain: "crown-clothing-db-89fb4.firebaseapp.com",
  projectId: "crown-clothing-db-89fb4",
  storageBucket: "crown-clothing-db-89fb4.appspot.com",
  messagingSenderId: "644867199794",
  appId: "1:644867199794:web:2cd70cd114181636cc7d2b",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
