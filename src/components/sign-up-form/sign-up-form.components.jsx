import { useState } from "react"
import FormInput from "../form-input/form-input.component";
import './sign-up-form.styles.scss'
import Button from "../button/button.component";
import { createNewUser, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";


const SignUpForm = () => {


    const defaultFormField = {
        displayName: '',
        email: '',
        password: '',
        confirmPassword: '',
    }

    const [formField, setFormField] = useState(defaultFormField)
    const {displayName, email, password, confirmPassword} = formField;

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormField({...formField, [name]:value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(password !== confirmPassword){
            alert('Your passwords do not match')
            console.log('user has entered mismatching passwords')
            return;
        }

        try{
            // Creats the user doc with CreateNewUserWithEmailAndPassword
            const {user} = await createNewUser(email, password)
            // Creates the document within the collection
            user.displayName = displayName
            await createUserDocumentFromAuth(user)
            e.reset()

        }catch(err){
            if(err.code === "auth/email-already-in-use"){
                alert('You already have an account!')
            }
        }

        e.target.reset()
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
                            required: true,
                            name: 'displayName',
                            value: displayName,
                            onChange: handleChange,
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
                                required: true,
                                name: 'email',
                                value: email,
                                onChange: handleChange,
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
                                required: true,
                                name: 'password',
                                value: password,
                                onChange: handleChange,
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
                                required: true,
                                name: 'confirmPassword',
                                value: confirmPassword,
                                onChange: handleChange,
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