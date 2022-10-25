import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils"

const SignIn = () => {

    const logGoogleUser = async() => {
        const { user } = await signInWithGooglePopup()
        const userDocRef = await createUserDocumentFromAuth(user)
        console.log({user})
    }
    return(
        <div>
            <h2>Sign In With Google</h2>
            <button className="px-3 py-1.5 rounded-xl border border-gray-800 bg-red-300" onClick={logGoogleUser}>Sign In</button>
        </div>
    )
}

export default SignIn