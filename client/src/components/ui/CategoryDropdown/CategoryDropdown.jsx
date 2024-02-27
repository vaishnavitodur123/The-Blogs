import React, { useEffect, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import styles from "./CategoryDropdown.module.css";
import gsap from "gsap";

const CategoryDropdown = ({ onSelect }) => {
    const [active, setActive] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const tl = gsap.timeline();

    const options = [
        "Technology",
        "Business",
        "Lifestyle",
        "Education",
        "CreativeArts",
    ];

    // TODO: Make a global state for category and import into Write.jsx
    const handleOptionClick = (index) => {
        const selectedCategory = options[index];
        setSelectedOption(selectedCategory);
        onSelect(selectedCategory);
    };

    useEffect(() => {
        if (active) {
            tl.to("#menuOptions", {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "expo.out",
            });
            tl.to("#menuOption", {
                y: 0,
                opacity: 1,
                stagger: 0.1,
                delay: -0.5,
                ease: "power4.out",
            });
        }
    }, [active]);

    return (
        <>
            <div
                onClick={() => setActive(!active)}
                className={styles.selectMenu}
            >
                <div className={styles.selectBtn}>
                    <span>{selectedOption || "Select category"}</span>
                    <ChevronDownIcon className={styles.downarrowIcon} />
                </div>

                {active && (
                    <div style={{ overflow: "hidden" }}>
                        <ul id="menuOptions" className={styles.options}>
                            {options.map((option, index) => (
                                <div key={index} style={{ overflow: "hidden" }}>
                                    <li
                                        id="menuOption"
                                        className={styles.option}
                                        onClick={() => handleOptionClick(index)}
                                    >
                                        {option}
                                    </li>
                                </div>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </>
    );
};

export default CategoryDropdown;
