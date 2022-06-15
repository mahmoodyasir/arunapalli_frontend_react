import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useGlobalState} from "../state/provider";
import * as GiIcon from "react-icons/gi";
import '../user_component/nav.css'

const Navbar = () => {
    const [{profile, page_reload}, dispatch] = useGlobalState()

    const [toggleMenu, setToggleMenu] = useState(false)
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)


    const toggleNav = () => {
        setToggleMenu(!toggleMenu)
    }

    useEffect(() => {

        const changeWidth = () => {
            setScreenWidth(window.innerWidth);
        }

        window.addEventListener('resize', changeWidth)

        return () => {
            window.removeEventListener('resize', changeWidth)
        }

    }, [])


    // console.log(profile, " From Navbar Page")

    const logout = () => {
        window.localStorage.clear()
        dispatch({
            type: "ADD_PROFILE",
            profile: null
        })
        window.location.href = '/'
    }
    return (
        <div>
            <div className="head">
                <Link className="navbar-brand head_font" to="/">Arunapalli Housing</Link>
            </div>


            <nav className="flex-row">
            {(toggleMenu || screenWidth > 600) && (
                <div>
                    <ul className="list">

                        {
                            profile !== null ?
                                (
                                    <>
                                        <Link className="nav-link items text-white" to="/user_home">Home</Link>
                                        <Link className="nav-link items text-white" to="/cart">Profile</Link>
                                        <Link className="nav-link items text-white" to="/profile">Payment Status</Link>
                                        <Link onClick={logout} className="nav-link items text-white" to="">Logout</Link>
                                    </>
                                )
                                :
                                ("")
                        }

                    </ul>
                </div>
            )}

            {screenWidth <= 600 ? (
                <GiIcon.GiHamburgerMenu onClick={toggleNav} className="icon"/>
            ) : ("")}

        </nav>
        </div>
    )
}

export default Navbar