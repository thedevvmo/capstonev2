import SignUpForm from "../../components/sign-up-form/sign-up-form.components"
import SignInForm from "../../components/sign-in-form/sign-in-form.components"

const Authentication = () => {

    return(
        <div className="px-5 max-w-full">
            <SignInForm />
            <SignUpForm />
        </div>
    )
}

export default Authentication