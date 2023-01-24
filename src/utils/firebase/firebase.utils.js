
import { initializeApp } from "firebase/app";

import { 
    doc, 
    getDoc, 
    getFirestore, 
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs
} from 'firebase/firestore'

import { 
    getAuth, 
    GoogleAuthProvider, 
    signInWithEmailAndPassword, 
    signInWithPopup, 
    onAuthStateChanged,
    signOut, 
    createUserWithEmailAndPassword
} from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDmW_CpYiMLNePB-14DkTlu28O34utqOwI",
    authDomain: "crown-clothing-store-7fcf3.firebaseapp.com",
    projectId: "crown-clothing-store-7fcf3",
    storageBucket: "crown-clothing-store-7fcf3.appspot.com",
    messagingSenderId: "444320638671",
    appId: "1:444320638671:web:99a3de3ce88ebd9b96b9ba"
};

initializeApp(firebaseConfig)


const googleProvider = new GoogleAuthProvider()
export const auth = getAuth()


googleProvider.setCustomParameters(
    {
        prompt: 'select_account'
    }
)


export const signInWithGooglePopUp = () => signInWithPopup(auth, googleProvider)

export const signInWithAuth = (email, password) => signInWithEmailAndPassword(auth, email, password)
    


// Creating new user - pull data base
const db = getFirestore()
// Create new user doc


// Function to create userDOC
export const createUserDocumentFromAuth = async(userAuth, otherCredientials={}) => {
    if (!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid)
    const snapShot = await getDoc(userDocRef);
    if(!snapShot.exists()){
        const createdAt = new Date()
        const {displayName, email} = userAuth


        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            })
        }catch(err){
            console.log(err.message)
        }
    }

    return userDocRef;
}

export const signInUser = (email, password) => signInWithEmailAndPassword(auth, email, password)


export const createNewUser = async (email, password) => {
    if (!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password)
}

export const signOutUser = () => signOut(auth)

// Creating Listener

export const onAuthStateChangedListener = (callback) => {
    onAuthStateChanged(auth, callback)
}


// Collection Method - create a collection

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase())
        batch.set(docRef, object)
    })

    await batch.commit()
    console.log('done')
}

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories'); 
    const q = query(collectionRef);
    const querySnapshot = await getDocs(q);
    // console.log(querySnapshot)
    return querySnapshot.docs.map((docSnapshot) => docSnapshot.data())
    // const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    //     const { title, items } = docSnapshot.data();
    //     acc[title.toLowerCase()] = items;
    //     return acc;
    // }, {})

    // return categoryMap
}
