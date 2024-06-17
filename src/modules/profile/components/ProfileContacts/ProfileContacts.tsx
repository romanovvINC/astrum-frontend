import { FC } from "react";
import { Card } from "reactstrap";
import { useAppSelector } from "Redux/hooks";
import { profileSelectors } from "modules/profile";
import ProfileContactsSkeleton from "./ProfileContactsSkeleton";

import s from "./ProfileContacts.module.scss";

const ProfileContacts: FC = () => {
    const { pending } = useAppSelector(profileSelectors.getProfileState);
    const { contacts } = useAppSelector(profileSelectors.getProfileInfo);
    const keysWithNotNullValues = Object.keys(contacts).filter(k => contacts[k]);

    if (pending) {
        return <ProfileContactsSkeleton />;
    }

    if (keysWithNotNullValues.length === 0) {
        return null;
    }

    return (
        <Card>
            <div className={`profile-post ${s.contacts}`}>
                <h5>Контакты</h5>
                <ul className={`simple-list ${s.contacts_list}`}>
                    {keysWithNotNullValues.map(k => (
                        <li
                            key={k}
                            className={s.contact_el}
                        >
                            {contacts[k]}
                        </li>
                    ))}
                </ul>
            </div>
        </Card>
    );
};

export default ProfileContacts;
