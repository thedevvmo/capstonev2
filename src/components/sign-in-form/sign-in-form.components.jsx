import { createUserDocumentFromAuth, signInWithGooglePopUp } from "../../utils/firebase/firebase.utils";
import { auth, signInUser } from "../../utils/firebase/firebase.utils";
import { useState } from "react"
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import './sign-in-form.styles.scss'


const SignInForm = () => {

    const defaultFormField = {
        email: '',
        password: '',
    }

    const [formField, setFormField] = useState(defaultFormField)

    const handleChange = (e) => {
        const {name, value} = e.target
        setFormField({...formField, [name]:value})
    }
    
    const {email, password} = formField;

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            await signInUser(email, password)
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
        await signInWithGooglePopUp()
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