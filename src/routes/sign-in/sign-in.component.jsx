import { useEffect } from "react"
import { getRedirectResult } from "firebase/auth"

import { signInWithGooglePopup, createUserDocumentFromAuth, signInWithGoogleRedirect, auth } from "../../utils/firebase/firebase.utils"
import { Fragment } from "react"
import { async } from "@firebase/util"
const SignIn = () => {

    useEffect(
        async() => {
            const response = await getRedirectResult(auth)
            console.log(response)
        },[])

    const logGoogleUser = async() => {
        const { user } = await signInWithGooglePopup()
        const userDocRef = await createUserDocumentFromAuth(user)
        console.log({user})
    }
    return(

        <Fragment>
            <div>
                <h2>Sign In With Google</h2>
                <button className="px-3 py-1.5 rounded-xl border border-gray-800 bg-red-300" onClick={logGoogleUser}>Sign In</button>
            </div>
            <div>
                <h2>Sign In With Google Redirect</h2>
                <button className="px-3 py-1.5 rounded-xl border border-gray-800 bg-red-300" 
                onClick={
                  signInWithGoogleRedirect
                }
                >Sign In</button>
            </div>
        </Fragment>
    )
}

export default SignIn