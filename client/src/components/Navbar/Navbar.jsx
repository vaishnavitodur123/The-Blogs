import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { Bars2Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { AuthContext } from "../../context/authContext.jsx";
import "./Navbar.css";
import Cookies from "js-cookie";
import { toast } from "sonner";

export default function Navbar() {
    const [toggle, setToggle] = useState(false);

    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        if (toggle) {
            gsap.to(".mobile-nav-container", {
                x: 0,
                opacity: 1,
                duration: 1,
                ease: "expo.out",
            });
        } else {
            gsap.to(".mobile-nav-container", {
                x: 100,
                opacity: 0,
                duration: 0.7,
                ease: "expo.out",
            });
        }
    }, [toggle]);

    const handleLogout = () => {
        Cookies.remove("access_token");
        localStorage.clear();
        toast.success("We hope to see you again soon!");
        navigate("/login");
    };

    return (
        <>
            <nav className="nav-main">
                <div className="nav-container">
                    <div className="nav-left">
                        <Link className="link" to="/">
                            <span>The Blogs</span>
                        </Link>
                    </div>
                    <div className="nav-right">
                        {currentUser && <span>{currentUser.username}</span>}
                        <span onClick={handleLogout}>Logout</span>
                        <Link className="link" to="/write">
                            <span>Write</span>
                        </Link>
                    </div>
                    <div className="nav-menu-icon">
                        {toggle ? (
                            <XMarkIcon
                                onClick={() => setToggle(false)}
                                className="menu-icon"
                            />
                        ) : (
                            <Bars2Icon
                                onClick={() => setToggle(true)}
                                className="menu-icon"
                            />
                        )}

                        {/* mobile Navbar */}
                        <div className="mobile-nav-container">
                            <ul>
                                <li>
                                    <Link
                                        onClick={() => setToggle(false)}
                                        className="link"
                                    >
                                        Designing
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        onClick={() => setToggle(false)}
                                        className="link"
                                    >
                                        Development
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        onClick={() => setToggle(false)}
                                        className="link"
                                    >
                                        Akash
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        onClick={() => setToggle(false)}
                                        className="link"
                                    >
                                        Write
                                    </Link>
                                </li>
                                <li>
                                    <button>Log-Out</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}
