import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDAB7xpdUb6APaLmgwD8A_Ny37vA2bSZaQ",
    authDomain: "crwn-db-743d6.firebaseapp.com",
    projectId: "crwn-db-743d6",
    storageBucket: "crwn-db-743d6.appspot.com",
    messagingSenderId: "81613914964",
    appId: "1:81613914964:web:f44b3d3f6a7422ca57fec1",
    measurementId: "G-80BLW3QK8X"
  };

  

  if (!firebase.apps.length) {
    firebase.initializeApp(config);
 }else {
    firebase.app(); // if already initialized, use that one
 }

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});
  export const SignInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;