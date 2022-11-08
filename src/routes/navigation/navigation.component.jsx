import { Outlet, Link } from "react-router-dom";
import { Fragment, useContext } from "react";
import './navigation.style.scss'
import { UserContext } from "../../contexts/user.context";
import { ReactComponent as CrwnLogo}  from "./../../assets/crown(1).svg";
import { UserContext } from "../../contexts/user.context";

const Navigation = () => {
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
                    <Link className="nav-link" to='/auth'>
                        Sign in
                    </Link>
                </div>
            </div>

            <Outlet />
        </Fragment>
    )
}

export default Navigation