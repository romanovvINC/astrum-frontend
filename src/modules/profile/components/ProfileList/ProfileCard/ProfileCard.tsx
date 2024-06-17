import { FC } from "react";
import { Card, CardFooter, CardHeader } from "reactstrap";
import { Link } from "react-router-dom";
import { ProfileShortInfo } from "models/profile/ProfileShortInfo";
import { socialNetworkIcons, socialNetworkUrl } from "Constants/SocialNetworkConstants";
import { getDefaultAvatar } from "Mocks/MockFunctions";
import { UserAvatar } from "Components/UserAvatar";
import { SocialNetworkLink } from "ui/SocialNetworkLink";

import classNames from "classnames";
import s from "./ProfileCard.module.scss";

const ProfileCard: FC<ProfileShortInfo> = ({
    name,
    surname,
    username,
    position,
    birthDate,
    avatarUrl,
    socialNetworks,
    competencies,
}) => {
    const socialNetworksKeys = socialNetworks
        ? Object.keys(socialNetworks).filter(k => socialNetworks?.[k] && socialNetworkIcons[k])
        : [];

    return (
        <div
            className={s.employee_card}
            style={{ height: "100%" }}
        >
            <Card
                className={classNames("custom-card", s.card_body)}
                style={{ height: "100%" }}
            >
                <CardHeader></CardHeader>
                <UserAvatar
                    containerClassName={s.employee_avatar__container}
                    className={s.employee_avatar}
                    avatarUrl={avatarUrl ?? getDefaultAvatar()}
                />
                <Link to={`/profile/${username}`}>
                    <div className="text-center profile-details">
                        <h4>{`${name} ${surname}`}</h4>
                        <h6>{position}</h6>
                        {birthDate && (
                            <h6>
                                День рождения:{" "}
                                {birthDate.toLocaleString("ru", {
                                    day: "numeric",
                                    month: "long",
                                })}
                            </h6>
                        )}
                    </div>
                </Link>
                {socialNetworks && socialNetworksKeys.length !== 0 && (
                    <ul className={classNames("simple-list", "card-social", "flex-row", s.social_network__list)}>
                        {socialNetworksKeys?.map((k, i) => {
                            return (
                                <li
                                    key={`${k} ${i}`}
                                    className={s.social_network__item}
                                >
                                    <SocialNetworkLink
                                        href={`${socialNetworkUrl[k]}/${socialNetworks?.[k]}`}
                                        icon={socialNetworkIcons[k]}
                                    />
                                </li>
                            );
                        })}
                    </ul>
                )}
                <CardFooter>
                    <div className={s.competencies__list}>
                        {competencies?.slice(0, 4).map((c, i) => {
                            return (
                                <div
                                    key={`${c}-${i}`}
                                    className={s.competence}
                                >
                                    {c}
                                </div>
                            );
                        })}
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
};

export default ProfileCard;
