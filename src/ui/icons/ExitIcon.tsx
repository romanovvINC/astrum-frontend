import { FC } from "react";
import { IIconProps } from "models/MainTypes";

const ExitIcon: FC<IIconProps> = ({ className = "", width = 24, height = 24, color = "#6362E7", onClick }) => {
    return (
        <svg
            className={className}
            width={width}
            height={height}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={onClick}
        >
            <path
                d="M13 10.9998L21.2 2.7998"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M22 6.8V2H17.2"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M11 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H15C20 22 22 20 22 15V13"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default ExitIcon;
