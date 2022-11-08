import { createUserDocumentFromAuth, signInWithGooglePopUp } from "../../utils/firebase/firebase.utils";
import { auth, signInUser } from "../../utils/firebase/firebase.utils";
import { useState } from "react"
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import './sign-in-form.styles.scss'
// Gives us back whatever value
import { useContext } from "react";
import { UserContext } from "../../contexts/user.context";


const SignInForm = () => {

    const defaultFormField = {
        email: '',
        password: '',
    }

    const { setCurrentUser } = useContext(UserContext)

    const [formField, setFormField] = useState(defaultFormField)

    const handleChange = (e) => {
        const {name, value} = e.target
        setFormField({...formField, [name]:value})
    }
    
    const {email, password} = formField;

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const { user } = await signInUser(email, password)
            setCurrentUser( user )
        }catch(err){
            switch(err.code){
                case  'auth/wrong-password':
                    alert('incorrect password');
                    break;
                case 'auth/user-not-found':
                    alert('no user associated with this email')
                    break;

                default: console.log(err.message)
            }
        }

        e.target.reset()
        
    }


    const signInWithG = async () => {
        const { user } = await signInWithGooglePopUp()
        const userDocRef = await createUserDocumentFromAuth(user)
    } 

    
    return(
        <div className="sign-up-container">
            <h2 className="font-bold text-xl">Have An Account?</h2>
            <span className="">Sign in with your email and password</span>

            <form className="my-5" onSubmit={handleSubmit}>

                <div>
                    <FormInput 
                        label="Email:" 
                        inputOptions = {
                            {
                                name: 'email',
                                type: "email", 
                                required: true,
                                onChange: handleChange,
                                value: email,
                            }
                        }
                    />
                </div>

                <div>
                    <FormInput 
                        label="Password:"
                        inputOptions = {
                            {
                                name:'password',
                                type: "password", 
                                required: true,
                                onChange: handleChange,
                                value: password,
                            }
                        }
                    />
                </div>

            <div className="flex gap-2">
                <Button type='submit' >Sign In</Button>
                <Button type='button' onClick={signInWithG} buttonType={'google'}>Sign In With Google</Button>
            </div>

            </form>
        </div>
    )
}

export default SignInForm