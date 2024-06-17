import { FC } from "react";
import { IIconProps } from "models/MainTypes";

const MouseIcon: FC<IIconProps> = ({ width = 33, height = 46, color = "#242934", ...rest }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 33 46"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...rest}
        >
            <path
                d="M17.3162 45.3157H14.8444C6.65952 45.3157 0 38.6562 0 30.4713V15.2102C0 7.02524 6.65952 0.365723 14.8444 0.365723H17.3162C25.5011 0.365723 32.1606 7.02524 32.1606 15.2102V30.4713C32.1606 38.6562 25.5011 45.3157 17.3162 45.3157ZM14.8444 2.24894C7.69764 2.24894 1.88322 8.06337 1.88322 15.2102V30.4713C1.88322 37.6181 7.69764 43.4325 14.8444 43.4325H17.3162C24.463 43.4325 30.2774 37.6181 30.2774 30.4713V15.2102C30.2774 8.06337 24.463 2.24894 17.3162 2.24894H14.8444Z"
                fill={color}
            />
            <path
                d="M31.219 18.9765H0.941608C0.421369 18.9765 0 18.5551 0 18.0349C0 17.5146 0.421369 17.0933 0.941608 17.0933H31.2214C31.7416 17.0933 32.163 17.5146 32.163 18.0349C32.163 18.5551 31.7392 18.9765 31.219 18.9765Z"
                fill={color}
            />
            <path
                d="M16.0808 13.8143C14.7485 13.8143 13.668 12.7338 13.668 11.4014V8.51541C13.668 7.18303 14.7485 6.10254 16.0808 6.10254C17.4132 6.10254 18.4937 7.18303 18.4937 8.51541V11.4014C18.4937 12.7338 17.4132 13.8143 16.0808 13.8143Z"
                fill={color}
            />
            <path
                d="M16.0802 5.04548C15.8212 5.04548 15.6094 4.83361 15.6094 4.57467V1.42735C15.6094 1.1684 15.8212 0.956543 16.0802 0.956543C16.3391 0.956543 16.551 1.1684 16.551 1.42735V4.57467C16.551 4.83597 16.3391 5.04548 16.0802 5.04548Z"
                fill={color}
            />
            <path
                d="M16.0802 18.5059C15.8212 18.5059 15.6094 18.2941 15.6094 18.0351V15.0196C15.6094 14.7607 15.8212 14.5488 16.0802 14.5488C16.3391 14.5488 16.551 14.7607 16.551 15.0196V18.0351C16.551 18.2964 16.3391 18.5059 16.0802 18.5059Z"
                fill={color}
            />
        </svg>
    );
};

export default MouseIcon;