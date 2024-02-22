import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { Bars2Icon, XMarkIcon } from "@heroicons/react/24/outline";
import "./Navbar.css";

export default function Navbar() {
    const [toggle, setToggle] = useState(false);

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
                        <Link to="/post/1" className="link">
                            <span>Designing</span>
                        </Link>
                        <Link className="link">
                            <span>Development</span>
                        </Link>
                        <span>Akash</span>
                        <span>Logout</span>
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
