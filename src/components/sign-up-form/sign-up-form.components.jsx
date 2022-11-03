import { createUserWithEmailAndPassword, } from "firebase/auth";
import { auth } from "../../utils/firebase/firebase.utils";
import { createUserDocFromAuth } from "../../utils/firebase/firebase.utils";
import { useState } from "react"
import FormInput from "../form-input/form-input.component";
import { createUserFromSignUp } from "../../utils/firebase/firebase.utils";
import './sign-up-form.styles.scss'
import Button from "../button/button.component";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
}

const SignUpForm = () => {
    
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(password !== confirmPassword){
            alert("Passwords do not match")
            return
        }

        try{
            console.log(displayName)
            const { user } = await createUserFromSignUp(email, password)
            // User creator for all auths - passing user and display name
            user.displayName = displayName;
            await createUserDocFromAuth(user)
            console.log(user)
            
        }catch(err){
            console.log(err.message)
            if(err.code === "auth/email-already-in-use"){
                alert("you already created a user")
            }
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormFields({...formFields, [name]:value})
    }

    return(
        <div className="sign-up-container">
            <h2 className="font-bold">Dont Have An Account?</h2>
            <span className="">Sign up with your email and password</span>

            <form className="my-5" onSubmit={handleSubmit}>
                <div>
                    <FormInput 
                    label="Display Name:" 
                    inputOptions = {
                        {
                            type: "text", 
                            onChange: handleChange,
                            name: displayName, 
                            value: displayName,
                            required: true
                        }
                    }
                    />
                </div>

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

                <div>
                    <FormInput 
                        label="Confirm Password:"
                        inputOptions = {
                            {
                                type: "password", 
                                onChange: handleChange,
                                name: confirmPassword, 
                                value: confirmPassword,
                                required: true,
                                autoComplete: "true"
                            }
                        }
                    />
                </div>

                <Button type='submit'>Sign Up</Button>

            </form>
        </div>
    )
}

export default SignUpForm