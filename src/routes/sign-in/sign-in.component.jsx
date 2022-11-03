
import { auth, signInWithGooglePopup, createUserDocFromAuth, signInWithGoogleRedirect } from "../../utils/firebase/firebase.utils"
import { useEffect } from "react"
import { getRedirectResult } from "firebase/auth"

const SignIn = () => {

    // Getting response from the redirect so we dont lose it
    useEffect(() =>
        async () => {
        const response = await getRedirectResult(auth)
        if(response){
            const userDocRef = await createUserDocFromAuth(response.user)
        }
    }, [])


    const logGoogleUser = async() => {
        const { user } = await signInWithGooglePopup()
        const userDocRef = await createUserDocFromAuth(user)
    }

    const logGoogleRedirectUser = async() => {
        const { user } = await signInWithGoogleRedirect()
        // Once this is called => because it redirects the website unmounts and the functions are not stored hence the value is not returned to us. 
        console.log(user)
    }

    return(
        <div>
            <h2>Sign In With Google</h2>
            <button onClick={() => {logGoogleUser()}} className="px-3 py-1.5 rounded-xl border border-gray-800 bg-red-300">Sign In</button>
            <button onClick={() => {logGoogleRedirectUser()}} className="px-3 py-1.5 rounded-xl border border-gray-800 bg-red-300">Sign In With Google Redirect</button>
        </div>
    )
}

export default SignIn