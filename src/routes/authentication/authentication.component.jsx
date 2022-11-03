
import { signInWithGooglePopup, createUserDocFromAuth, signInWithUserEmail } from "../../utils/firebase/firebase.utils"
import SignUpForm from "../../components/sign-up-form/sign-up-form.components"
import SignInForm from "../../components/sign-in-form/sign-in-form.components"
import { useState } from "react"

const Authentication = () => {
    // const signDefaultFormField = {
    //     email: '',
    //     password: ''
    // }

    // const [signFormField, setFormField] = useState(signDefaultFormField)
    // const {email, password} = signFormField

    // const signHandleChange = (e) => {
    //     const {name, value} = e.target
    //     setFormField({...signFormField , [name]: value})
        
    // }

    // const ourUser = {...signFormField}
    // console.log(ourUser)

    // const logUser = async() => {
    //     const {email, password} = ourUser
    //     const { user } = await signInWithUserEmail(email, password)
    //     console.log(user)
    //     // const { ...signFormField } = await signInWithEmailAndPassword()
    //     // console.log(user)
    //     // // const userDocRef = await createUserDocFromAuth(user)
    //     // console.log(userDocRef)
    // }

    // // const logGoogleUser = async() => {
    // //     const { user } = await signInWithGooglePopup()
    // //     const userDocRef = await createUserDocFromAuth(user)
    // //     console.log(userDocRef)
    // // }


    return(
        <div className="px-5 max-w-full">
            <SignInForm />
            <SignUpForm />
        </div>
    )
}

export default Authentication