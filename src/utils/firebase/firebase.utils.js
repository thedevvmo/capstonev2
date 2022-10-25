// Initialise app instace to use as reference for firebase to use this
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc} from 'firebase/firestore';

// Authentication library
import { getAuth, signInWithPopup, signInWithRedirect, GoogleAuthProvider} from "firebase/auth"; 

const firebaseConfig = {
    // Not secret API key
    apiKey: "AIzaSyDN4iPbeiWQz0fL1AmcAF7thSDvWhqjRkA",
    authDomain: "crownclothingstore-9b71f.firebaseapp.com",
    // Unique identifier
    projectId: "crownclothingstore-9b71f",
    storageBucket: "crownclothingstore-9b71f.appspot.com",
    messagingSenderId: "750777794259",
    appId: "1:750777794259:web:d41259995aa2149ffade26",
    measurementId: "G-G7X3X9RBHB"
};

const firebaseApp = initializeApp(firebaseConfig);
console.log(firebaseApp + 'this is firebase')

// Providers are instructions for this instance of provider for different sign in methods other providers e.g. apple
const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({
    // force user to select an account
    prompt: "select_account"
})


// >>>>>>> FIRESTORE DATABASE

export const db = getFirestore()

export const createUserDocumentFromAuth = async(userAuth) => {
    // Check if theres an exisitng document reference

    // 1. Database - 2. Collection - 3. Identifier
    // Identifier is a unique - what we have access to is user.UID
    const userDocRef = doc(db, 'users', 'userAuth.uid');

    // Get the document for the user
    const userSnapshot = await getDoc(userDocRef);

    // If user data exists - 
    if(!userSnapshot.exists()){
        // If does not exist set the data in the object!!!
        const { displayName, email } = userAuth;
        const createdAt = new Date()

        try {
            await setDoc(userDocRef,{
                displayName,
                email,
                createdAt
            });
        } catch(error){
            console.log('error creating the user', error.message)
        }

        return userDocRef;
    }
    // If user data does not exist - create / set the document with the data from userAuth in my collection
}

// >>>>>> Providers
export const auth = getAuth();

// Sign in with pop up
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

// Sign with redirect
export const signInWithGoogleRedirect = ()  => signInWithRedirect(auth, googleProvider)

