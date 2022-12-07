
// Three types of styling - button 
import {BaseButton, GoogleSignInButton, InvertedButton} from './button.styles'


// Default - inverted - google sign in 

export const BUTTON_TYPE_CLASSES = {
    base: 'base',
    google: 'google-sign-in',
    inverted: 'inverted',

}

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) => (
    {
        [BUTTON_TYPE_CLASSES.base]: BaseButton,
        [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
        [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
    }[buttonType]
)

// Children passes in the text, buttonType - picks the class type 
const Button = ({ children, buttonType, ...otherProps }) => {
    const CustomButton = getButton(buttonType)

    return(
        <CustomButton {...otherProps}>
            {children}
        </CustomButton>
    )
}

export default Button



