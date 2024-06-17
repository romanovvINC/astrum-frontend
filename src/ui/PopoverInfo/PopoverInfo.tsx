import { FC, ReactNode, RefObject } from "react";
import { Popover, PopoverBody } from "reactstrap";
import s from "./PopoverInfo.module.css";

interface IPopoverInfoProps {
    isOpen: boolean;
    target: string | HTMLElement | RefObject<HTMLElement>;
    className?: string;
    placement?: "bottom" | "top" | "left" | "right";
    children: ReactNode;
}

const PopoverInfo: FC<IPopoverInfoProps> = ({ isOpen, target, children, className, placement = "bottom" }) => {
    return (
        <Popover
            className={s.popover}
            isOpen={isOpen}
            target={target}
            placement={placement}
        >
            <PopoverBody className={`${s.popover_body} ${className}`}>{children}</PopoverBody>
        </Popover>
    );
};

export default PopoverInfo;
