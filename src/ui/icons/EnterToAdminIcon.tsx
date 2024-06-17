import { FC } from "react";
import { IIconProps } from "models/MainTypes";

const EnterToAdminIcon: FC<IIconProps> = ({ className = "", height = 24, width = 24, color = "#6362E7", onClick }) => {
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
                d="M21.9998 2L13.7998 10.2"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M13 6.16992V10.9999H17.83"
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

export default EnterToAdminIcon;
