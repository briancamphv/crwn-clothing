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

export const addCollectionsAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    console.log(collectionRef);

    const batch = firestore.batch();
    objectsToAdd.forEach( obj =>{
        const newDocRef = collectionRef.doc(obj.title)
        batch.set(newDocRef,obj);

    });

    return await batch.commit();

}
export const createUserProfileDocument = async (userAuth, additionalData) => {

    console.log(userAuth);
    console.log(additionalData);

    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        
        const { email, displayName } = userAuth;
        
        const createdAt = new Date();

        
        try {
            await userRef.set({                
                displayName,
                email,
                createdAt,
                ...additionalData
                

            })

        } catch (error) {

            console.log('error create data', error);

        }

    }

return userRef;

}

if (!firebase.apps.length) {
    firebase.initializeApp(config);
} else {
    firebase.app(); // if already initialized, use that one
}

export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map(doc => {
        const {title, items} = doc.data();
        return {
            routeName: encodeURI(title.toLowerCase(title)),
            id: doc.id,
            title,
            items
        }
    })

    return transformedCollection.reduce((accumulator,collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    },{})
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const SignInWithGoogle = () => auth.signInWithPopup(googleProvider);

export const getCurrenUser = () => {
    return new Promise((resolve,reject)=>  {
        const unsubscribe = auth.onAuthStateChanged(userAuth=>{
            unsubscribe();
            resolve(userAuth);
        }, reject)
    })
}

export default firebase;