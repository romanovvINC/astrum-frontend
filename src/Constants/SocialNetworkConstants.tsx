import { ReactComponent as TelegramIcon } from "assets/svg/profileSocialNetworksIcons/telegram-icon.svg";
import { ReactComponent as InstagramIcon } from "assets/svg/profileSocialNetworksIcons/instagram-icon.svg";
import { ReactComponent as BehanceIcon } from "assets/svg/profileSocialNetworksIcons/behance-icon.svg";
import { ReactComponent as GithubIcon } from "assets/svg/profileSocialNetworksIcons/github-icon.svg";
import { ReactComponent as VkIcon } from "assets/svg/profileSocialNetworksIcons/vk-icon.svg";
import { ReactNode } from "react";

type Readonly = {
    readonly [index: string]: ReactNode;
};

enum SocialNetworks {
    vk = "vk",
    telegram = "telegram",
    github = "gitHub",
    gitlab = "gitlab",
    behance = "behance",
    instagram = "instagram",
}

export const socialNetworkIcons: Readonly = {
    [SocialNetworks.vk]: <VkIcon />,
    [SocialNetworks.telegram]: <TelegramIcon />,
    [SocialNetworks.instagram]: <InstagramIcon />,
    [SocialNetworks.behance]: <BehanceIcon />,
    [SocialNetworks.github]: <GithubIcon />,
    [SocialNetworks.gitlab]: "",
};

export const socialNetworkUrl: Readonly = {
    [SocialNetworks.telegram]: "https://t.me",
    [SocialNetworks.vk]: "https://vk.com",
    [SocialNetworks.instagram]: "https://instagram.com",
    [SocialNetworks.behance]: "https://behance.net",
    [SocialNetworks.github]: "https://github.com",
    [SocialNetworks.gitlab]: "https://gitlab.com",
};
