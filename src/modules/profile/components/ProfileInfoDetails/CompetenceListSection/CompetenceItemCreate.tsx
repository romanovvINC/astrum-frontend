import { FC, useCallback, useState } from "react";
import { Spinner } from "reactstrap";
import { Controller, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "Redux/hooks";
import { createProfileCompetenceRequest, profileSelectors } from "modules/profile";
import { ReactComponent as PlusGrayIcon } from "assets/svg/plus-gray-icon.svg";
import { ReactComponent as CrossGrayIcon } from "assets/svg/cross-gray-icon.svg";
import { ReactComponent as CheckGrayIcon } from "assets/svg/check-gray-icon.svg";
import { InputMain } from "ui/Input";
import { ButtonMain } from "ui/Button";

import s from "./CompetenceListSection.module.scss";

const CompetenceItemCreate: FC = () => {
    const { pendingCompetenceChange } = useAppSelector(profileSelectors.getProfileState);
    const [editMode, setEditMode] = useState(false);
    const dispatch = useAppDispatch();
    const {
        control,
        reset,
        formState: { errors },
        handleSubmit,
    } = useForm<{ value: string }>({
        values: {
            value: "",
        },
    });

    const successCallback = useCallback(() => {
        setEditMode(false);
        reset();
    }, []);

    const toggleEditModeHandler = useCallback(() => setEditMode(prev => !prev), []);

    const createCompetenceHandler = useCallback(
        (data: { value: string }) => dispatch(createProfileCompetenceRequest({ data: data.value, successCallback })),
        []
    );

    const cancelCreateCompetenceHandler = useCallback(() => {
        setEditMode(false);
        reset();
    }, []);

    return (
        <div>
            {!editMode && (
                <div
                    className={`${s.skill} ${s.competence_create}`}
                    onClick={toggleEditModeHandler}
                >
                    <PlusGrayIcon className={s.plus_icon} />
                </div>
            )}
            {editMode && (
                <form
                    className={s.add_competence_container}
                    onSubmit={handleSubmit(createCompetenceHandler)}
                >
                    <Controller
                        control={control}
                        name={"value"}
                        rules={{
                            validate: value => value.length > 0 && value.length <= 25,
                        }}
                        render={({ field: { value, onChange } }) => (
                            <InputMain
                                inputClassName={s.input}
                                placeholder="Новая компетенция..."
                                value={value}
                                invalid={!!errors.value || value.length > 25}
                                onChange={onChange}
                            />
                        )}
                    />
                    {pendingCompetenceChange ? (
                        <div className={s.spinner_container}>
                            <Spinner
                                color="secondary"
                                className={s.spinner}
                            />
                        </div>
                    ) : (
                        <>
                            <ButtonMain
                                className={s.action_container}
                                variant={"secondary"}
                            >
                                <CheckGrayIcon className={s.plus_icon} />
                            </ButtonMain>
                            <ButtonMain
                                className={s.action_container}
                                variant={"secondary"}
                                type={"button"}
                                onClick={cancelCreateCompetenceHandler}
                            >
                                <CrossGrayIcon className={s.plus_icon} />
                            </ButtonMain>
                        </>
                    )}
                </form>
            )}
        </div>
    );
};

export default CompetenceItemCreate;
