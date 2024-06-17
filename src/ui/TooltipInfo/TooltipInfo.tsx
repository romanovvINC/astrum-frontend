import { FC } from "react";
import { Tooltip, TooltipProps } from "reactstrap";

import classNames from "classnames";
import s from "./TooltipInfo.module.scss";

interface IToolTipInfoProps extends TooltipProps {
    header: string;
    text: string;
}

const TooltipInfo: FC<IToolTipInfoProps> = props => {
    const { header, text, innerClassName, popperClassName, ...rest } = props;
    return (
        <Tooltip
            {...rest}
            innerClassName={classNames(s.tooltip_body, innerClassName)}
            popperClassName={classNames(s.popper, popperClassName)}
        >
            <div>
                <b>{header}</b>
            </div>
            <div>
                <span>{text}</span>
            </div>
        </Tooltip>
    );
};

export default TooltipInfo;
