import { MouseEventHandler } from "react";

const Button = ({
    title,
    leftIcon,
    midIcon,
    rightIcon,
    handleClick,
    notAllowed,
    type,
    className,
}) => (
    <button
        type={type || "button"}
        disabled={notAllowed || false}
        onClick={handleClick}
        className={`${className} p-3 text-sm rounded-lg transition-all duration-200 ${
            notAllowed ? "opacity-50 cursor-not-allowed" : ""
        }`}
    >
        {leftIcon && leftIcon}
        {title && title}
        {midIcon && midIcon}
        {rightIcon && rightIcon}
    </button>
);

export default Button;
