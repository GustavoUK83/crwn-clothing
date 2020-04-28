import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBtIFpDyH7JjyDmHyKAjDDayaMpzYA7zRg",
  authDomain: "crwn-db-ce657.firebaseapp.com",
  databaseURL: "https://crwn-db-ce657.firebaseio.com",
  projectId: "crwn-db-ce657",
  storageBucket: "crwn-db-ce657.appspot.com",
  messagingSenderId: "863410733982",
  appId: "1:863410733982:web:5567a05644303d6b5c8c8f"
}

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
