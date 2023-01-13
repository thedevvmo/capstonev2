import { Outlet } from "react-router-dom";
import { Fragment } from "react";
import { NavigationContainer, LogoContainer, NavLinks, NavLink } from './navigation.style'
import { useContext } from "react";
import CartDropdown from "../../components/cart/cart-dropdown/cart-dropdown.component";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import { CartContext } from "../../contexts/cart.context";
import CartIcon from "../../components/cart/cart-icon/cart-icon.component";
import { ReactComponent as CrwnLogo}  from "./../../assets/crown(1).svg";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";

const Navigation = () => {

    const user = useSelector(selectCurrentUser)
    const { isCartOpen,  } = useContext(CartContext)

    return(
        <Fragment>
            <NavigationContainer>

                <LogoContainer className="logo-container" to='/'>
                    <CrwnLogo className="logo" />
                </LogoContainer>

                <NavLinks>
                    <NavLink to='/shop'>
                        Shop
                    </NavLink>
                    {
                        user ? (
                            <NavLink as='span' onClick={signOutUser}>Sign Out</NavLink>
                        ):(
                            <NavLink to='/auth'>
                            Sign in
                            </NavLink>
                        )
                    }
                    <CartIcon />
                </NavLinks>
               {isCartOpen && <CartDropdown />}
            </NavigationContainer>

            <Outlet />
        </Fragment>
    )
}

export default Navigation