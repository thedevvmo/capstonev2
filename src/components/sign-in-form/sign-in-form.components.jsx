import { signInWithEmailAndPassword, } from "firebase/auth";
import { auth } from "../../utils/firebase/firebase.utils";
import { useState } from "react"
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import './sign-in-form.styles.scss'

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
    
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const handleSubmit = async (e) => {
        e.preventDefault()

        try{
            
        }catch(err){
            console.log(err.message)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(value)
        setFormFields({...formFields, [name]:value})
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
                                type: "email", 
                                onChange: handleChange,
                                name: email, 
                                value: email,
                                required: true
                            }
                        }
                    />
                </div>

                <div>
                    <FormInput 
                        label="Password:"
                        inputOptions = {
                            {
                                type: "password", 
                                onChange: handleChange,
                                name: password, 
                                value: password,
                                required: true,
                                autoComplete: "true"
                            }
                        }
                    />
                </div>

                {/* <Button type='submit' >Sign In</Button> */}

            </form>
        </div>
    )
}

export default SignInForm