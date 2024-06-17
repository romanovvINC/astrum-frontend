import { FC } from "react";
import { IIconProps } from "models/MainTypes";

const ArrowDown: FC<IIconProps> = ({ className = "", height = 24, width = 24, color = "#6362E7", onClick }) => {
    return (
        <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox="0 0 36 35"
            fill="none"
            onClick={onClick}
        >
            <path
                d="M26.8521 21.0437L18 29.8958L9.14795 21.0437"
                stroke={color}
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M18 5.10417V29.6479"
                stroke={color}
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default ArrowDown;
