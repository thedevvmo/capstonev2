
// Three types of styling - button 
import './button.styles.scss'

// Default - inverted - google sign in 

const btnTypeClasses = {
    google: 'google-sign-in',
    inverted: 'inverted',

}


// Children passes in the text, buttonType - picks the class type 
const Button = ({ children, buttonType, ...otherProps }) => {
    return(
        <button className={`button-container ${btnTypeClasses[buttonType]}`} {...otherProps}>
            {children}
        </button>
    )
}

export default Button



