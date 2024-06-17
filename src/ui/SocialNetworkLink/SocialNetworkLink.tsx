import React, { FC, ReactNode } from "react";
import s from "./SocialNetworkLink.module.scss";
interface ISocialNetworkLinkProps {
    href: string;
    icon: ReactNode;
}

const SocialNetworkLink: FC<ISocialNetworkLinkProps> = ({ href, icon }) => {
    return (
        <a
            style={{ background: "none", padding: 0 }}
            className={s.link}
            target="_blank"
            rel="noreferrer"
            href={href}
        >
            {icon}
        </a>
    );
};

export default SocialNetworkLink;
