
import { initializeApp } from "firebase/app";
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore'
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect } from "firebase/auth";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";



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

export const auth = getAuth()

const googleProvider = new GoogleAuthProvider()



// Set custom parameters
googleProvider.setCustomParameters({
    // Force them to select account
    prompt: "select_account"
});

// Popup
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)
export const signInWithUserEmail = () => signInWithEmailAndPassword(auth, googleProvider)

// Redirect
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider)

const db = getFirestore()


// Creating/Reading New User
export const createUserDocFromAuth = async(user, displayName) => {
    const userDocRef = doc(db, 'users', user.uid)

    const userSnapshot = await getDoc(userDocRef)
    // If user data exists - if it does exist - do nothing
    if(!userSnapshot.exists()){
        const { displayName, email } = user;
        const createdAt = new Date();

        try{ 
            await 
            setDoc(userDocRef, {displayName, email, createdAt});
            }
        catch(err){
            console.log(err.message)
        }}
        
    return userDocRef;
    // If user data does not exists - create/set the data 
}


// Our function
export const createUserFromSignUp = async (email, password) => {
    // Ways to protect our code 
    if(!email || !password) return;
    // Creating user with firebase function
    return await createUserWithEmailAndPassword(auth, email, password);
}


