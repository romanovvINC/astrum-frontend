import { FC, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "Redux/hooks";
import { authSelectors } from "modules/auth";
import { deleteProfileCompetenceRequest, profileSelectors } from "modules/profile";
import { ReactComponent as SkillsIcon } from "assets/svg/profileFreeFiledsIcons/skills_icon.svg";
import CompetenceItemCreate from "./CompetenceItemCreate";
import CompetenceItem from "./CompetenceItem";
import { CustomFieldWrap } from "../CustomFieldWrap";

import s from "./CompetenceListSection.module.scss";

const CompetenceListSection: FC = () => {
    const { username, competencies } = useAppSelector(profileSelectors.getProfileInfo);
    const { username: accountUsername } = useAppSelector(authSelectors.getBasicInfo);
    const dispatch = useAppDispatch();
    const isPersonalAccount = accountUsername === username;

    const deleteCompetenceHandler = useCallback(
        (competence: string) => dispatch(deleteProfileCompetenceRequest(competence)),
        [username]
    );

    return (
        <>
            {((competencies && competencies.length !== 0) || isPersonalAccount) && (
                <CustomFieldWrap
                    iconElement={<SkillsIcon />}
                    title="Компетенции"
                >
                    <ul className={`simple-list ${s.skills}`}>
                        {competencies?.map((c, i) => {
                            return (
                                <li
                                    key={`${c}-${i}`}
                                    style={{ margin: 0 }}
                                >
                                    <CompetenceItem
                                        value={c}
                                        onDelete={isPersonalAccount ? deleteCompetenceHandler : undefined}
                                    />
                                </li>
                            );
                        })}
                        {isPersonalAccount && (
                            <li style={{ margin: 0 }}>
                                <CompetenceItemCreate />
                            </li>
                        )}
                    </ul>
                </CustomFieldWrap>
            )}
        </>
    );
};

export default CompetenceListSection;
