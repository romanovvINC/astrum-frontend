import { FC } from "react";
import s from "./VerticalDivider.module.css";

interface IVerticalDividerProps {
    color?: string;
    width?: number;
    height?: number;
}

const VerticalDivider: FC<IVerticalDividerProps> = props => {
    const { color, ...rest } = props;
    return (
        <div
            style={{ ...rest, backgroundColor: color ?? "lightgray" }}
            className={s.vertical_divider}
        />
    );
};

export default VerticalDivider;
