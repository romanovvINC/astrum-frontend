import React, { FC, useCallback, useContext, useState } from "react";
import { useAppDispatch, useAppSelector } from "Redux/hooks";
import { useParams } from "react-router-dom";
import { PhotoPreviewContext } from "contexts/PhotoPreviewContext";
import { authSelectors } from "modules/auth";
import { changeAvatarRequest, profileSelectors } from "modules/profile";
import { socialNetworkIcons, socialNetworkUrl } from "Constants/SocialNetworkConstants";
import { getDefaultAvatar } from "Mocks/MockFunctions";
import { AchievementItem } from "./AchievementItem";
import { ChangeImageModal } from "Components/ChangeImageModal";
import { UserAvatar } from "Components/UserAvatar";
import { SocialNetworkLink } from "ui/SocialNetworkLink";

import s from "./InfoBox.module.scss";

const InfoBox: FC = () => {
    const [changeAvatarModalIsOpen, setChangeAvatarOpen] = useState(false);
    const { username: accountUsername } = useAppSelector(authSelectors.getBasicInfo);
    const { userId, username, name, surname, position, socialNetworks, achievements, avatarUrl } = useAppSelector(
        profileSelectors.getProfileInfo
    );
    const socialNetworksKeys = socialNetworks
        ? Object.keys(socialNetworks).filter(k => socialNetworks?.[k] && socialNetworkIcons[k])
        : [];
    const profileUsername = useParams().username!;
    const dispatch = useAppDispatch();
    const { setPhotoPreviewModalData, openPhotoPreviewModal } = useContext(PhotoPreviewContext);

    const clickImageHandler = useCallback(() => {
        setPhotoPreviewModalData({
            currentImage: avatarUrl!,
            images: [],
            user: {
                userId,
                username,
                nameWithSurname: `${name} ${surname}`,
                avatarUrl,
            },
            dateCreated: null,
        });
        openPhotoPreviewModal();
    }, [userId, avatarUrl, username, name, surname]);

    const clickEditHandler = useCallback(() => setChangeAvatarOpen(true), []);

    const saveAvatarHandler = useCallback((image: Blob) => {
        dispatch(changeAvatarRequest({ image }));
        setChangeAvatarOpen(false);
    }, []);

    const closeChangeAvatarModalHandler = useCallback(() => setChangeAvatarOpen(false), []);

    return (
        <div className={`userpro-box ${s.user_box}`}>
            <UserAvatar
                avatarUrl={avatarUrl ?? getDefaultAvatar()}
                canEdit={accountUsername === profileUsername}
                onClick={avatarUrl ? clickImageHandler : undefined}
                onClickEdit={clickEditHandler}
            />
            <a
                className={s.user_link}
                href={`/profile/${profileUsername}`}
            >
                <h4>{`${name} ${surname}`}</h4>
                <h6>{position}</h6>
            </a>
            {socialNetworks && (
                <ul className={s.social_networks__list}>
                    {socialNetworksKeys?.map((k, i) => {
                        return (
                            <li key={`${k} ${i}`}>
                                <SocialNetworkLink
                                    href={`${socialNetworkUrl[k]}/${socialNetworks[k]}`}
                                    icon={socialNetworkIcons[k]}
                                />
                            </li>
                        );
                    })}
                </ul>
            )}
            <hr style={{ height: 1, width: "100%", marginTop: "10px", marginBottom: "8px" }} />
            <ul className={s.achievements__list}>
                {achievements && achievements.length !== 0 ? (
                    achievements?.map(a => {
                        return (
                            <li key={`${a.name}_${a.id}`}>
                                <AchievementItem
                                    {...a}
                                    username={profileUsername}
                                />
                            </li>
                        );
                    })
                ) : (
                    <li className={s.empty_achievement}>Нет достижений</li>
                )}
            </ul>
            <ChangeImageModal
                isOpen={changeAvatarModalIsOpen}
                imageAspectRatio={1}
                title={"Изменение аватара"}
                onSave={saveAvatarHandler}
                onClose={closeChangeAvatarModalHandler}
            />
        </div>
    );
};

export default InfoBox;
