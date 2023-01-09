import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';

import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCsEmvQQZz5T-CdVbQsVz6WIWirs4-ngms",
  authDomain: "crwn-clothing-cb978.firebaseapp.com",
  projectId: "crwn-clothing-cb978",
  storageBucket: "crwn-clothing-cb978.appspot.com",
  messagingSenderId: "392782066770",
  appId: "1:392782066770:web:1c57495010e3801765db8b"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);

  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot.exists())
  console.log(userSnapshot)

  if (!userSnapshot.exists()) {
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName, email, createdAt
      })
    } catch (error) {
      console.log("error created user", error.message)
    }
  }

  return userDocRef;

  //if user data exists

  //create set the doc with data
}
