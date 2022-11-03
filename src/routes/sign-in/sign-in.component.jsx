
import { signInWithGooglePopup, createUserDocFromAuth } from "../../utils/firebase/firebase.utils"
import SignUpForm from "../../components/sign-up-form/sign-up-form.components"

const SignIn = () => {

    const logGoogleUser = async() => {
        const { user } = await signInWithGooglePopup()
        const userDocRef = await createUserDocFromAuth(user)
    }

    return(
        <div>
            <h2>Sign In With Google</h2>
            <button onClick={() => {logGoogleUser()}} className="px-3 py-1.5 rounded-xl border border-gray-800 bg-red-300">Sign In</button>

            <SignUpForm />
        </div>
    )
}

export default SignIn