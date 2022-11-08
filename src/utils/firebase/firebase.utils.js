
import { initializeApp } from "firebase/app";
import { collection, doc, getDoc, getFirestore, setDoc } from 'firebase/firestore'
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect, createUserWithEmailAndPassword} from "firebase/auth";

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

    console.log(snapShot)
    console.log(snapShot.exists())

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

