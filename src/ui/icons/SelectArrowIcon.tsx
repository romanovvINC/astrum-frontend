import { FC } from "react";
import { IIconProps } from "models/MainTypes";

const SelectArrowIcon: FC<IIconProps> = ({ className = "", width = 16, height = 10, color = "#707070", onClick }) => {
    return (
        <svg
            className={className}
            width={width}
            height={height}
            viewBox="0 0 16 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={onClick}
        >
            <path
                d="M1 1.5L8.36842 8.5L15 1.5"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    );
};

export default SelectArrowIcon;
