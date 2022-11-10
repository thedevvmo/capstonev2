import { Outlet, Link } from "react-router-dom";
import { Fragment } from "react";
import './navigation.style.scss'
import { useContext } from "react";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import { ReactComponent as CrwnLogo}  from "./../../assets/crown(1).svg";

const Navigation = () => {
    
    const { currentUser } = useContext(UserContext)
    const { isCartOpen,  } = useContext(CartContext)

    return(
        <Fragment>
            <div className="navigation">

                <Link className="logo-container" to='/'>
                    <CrwnLogo className="logo" />
                </Link>

                <div className="nav-links-container">
                    <Link className="nav-link" to='/shop'>
                        Shop
                    </Link>
                    {
                        currentUser ? (
                            <span className="nav-link" onClick={signOutUser}>Sign Out</span>
                        ):(
                            <Link className="nav-link" to='/auth'>
                            Sign in
                            </Link>
                        )
                    }
                    <CartIcon />
                </div>
               {isCartOpen && <CartDropdown />}
            </div>

            <Outlet />
        </Fragment>
    )
}

export default Navigation