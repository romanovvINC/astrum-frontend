import React from "react";

export type Attachment = {
    name: string;
    type: string;
    url: string;
};

export interface IIconProps {
    className?: string;
    width?: number;
    height?: number;
    color?: string;
    onClick?: (e: React.MouseEvent<SVGElement>) => void;
}

export type Mods = Record<string, boolean | string | undefined>;
