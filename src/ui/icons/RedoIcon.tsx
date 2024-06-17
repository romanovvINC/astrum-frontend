import { FC } from "react";
import { IIconProps } from "models/MainTypes";

const RedoIcon: FC<IIconProps> = ({ className = "", width = 24, height = 24, color = "#6362E7" }) => {
    return (
        <svg
            className={className}
            width={width}
            height={height}
            viewBox="0 0 27 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M20.6009 20.7022H8.93424C4.90924 20.7022 1.64258 17.4355 1.64258 13.4105C1.64258 9.3855 4.90924 6.11884 8.93424 6.11884H24.9759"
                stroke={color}
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M21.6233 9.7645L25.3566 6.03116L21.6233 2.29783"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default RedoIcon;
