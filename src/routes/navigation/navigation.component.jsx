import { Outlet, Link } from "react-router-dom";
import { Fragment } from "react";
import './navigation.style.scss'
import { useContext } from "react";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import { UserContext } from "../../contexts/user.context";
import { ReactComponent as CrwnLogo}  from "./../../assets/crown(1).svg";

const Navigation = () => {
    
    const { currentUser } = useContext(UserContext)

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
                </div>
            </div>

            <Outlet />
        </Fragment>
    )
}

export default Navigation