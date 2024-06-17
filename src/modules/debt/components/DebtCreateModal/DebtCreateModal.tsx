import React, { FC, useCallback, useEffect, useId, useMemo, useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Controller, useForm } from "react-hook-form";
import { ReactComponent as CrossIcon } from "assets/svg/cross-gray-icon.svg";
import { DebtCreateInfo, DebtCreateInfoForm } from "models/debt/DebtCreateInfo";
import { useAppDispatch, useAppSelector } from "Redux/hooks";
import { createDebtRequest, debtSelectors, getDebtUserListRequest } from "modules/debt";
import { ButtonMain } from "ui/Button";
import { Select } from "ui/Select";
import { InputMain } from "ui/Input";

import s from "./DebtCreateModal.module.scss";
import { authSelectors } from "modules/auth";
import { ShortProfileInfo } from "models/profile/ShortProfileInfo";
import { Tabs } from "ui/Tabs";

interface IModalLayout {
    isOpen: boolean;
    toggle: () => void;
}

const startDate = new Date();

const DebtCreateModal: FC<IModalLayout> = ({ isOpen, toggle }) => {
    const { users } = useAppSelector(debtSelectors.getDebtState);
    const { userId } = useAppSelector(authSelectors.getBasicInfo);
    const formId = useId();
    const tabsData = useMemo(
        () => [
            { title: "Номер телефона", value: "phoneNumber", id: "phone" },
            { title: "Номер карты", value: "cardNumber", id: "card" },
        ],
        []
    );
    const [activeTab, setActiveTab] = useState(tabsData[0].value);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getDebtUserListRequest());
    }, []);

    const {
        control,
        formState: { errors },
        reset,
        handleSubmit,
    } = useForm<DebtCreateInfoForm>({
        values: {
            dateDebt: startDate,
            sumDebt: 100,
            description: "",
            borrowerId: userId,
            debtor: null,
            phoneNumber: "",
            cardNumber: "",
            bank: "",
        },
    });

    const submitHandler = useCallback(
        (data: DebtCreateInfoForm) => {
            dispatch(
                createDebtRequest({
                    data: {
                        debtorId: data.debtor!.userId,
                        dateDebt: data.dateDebt,
                        sumDebt: data.sumDebt,
                        borrowerId: userId,
                        description: data.description,
                    },
                    successCallback: () => {
                        reset();
                        toggle();
                    },
                })
            );
        },
        [toggle]
    );

    return (
        <Modal
            isOpen={isOpen}
            toggle={toggle}
            centered={true}
            contentClassName={s.modal}
        >
            <ModalHeader
                className={s.header}
                tag={"h2"}
                toggle={toggle}
                close={<CrossIcon onClick={toggle} />}
            >
                Добавление записи
            </ModalHeader>
            <ModalBody
                id={formId}
                className={s.body}
                tag={"form"}
                onSubmit={handleSubmit(submitHandler)}
            >
                <Controller
                    control={control}
                    name={"dateDebt"}
                    render={({ field: { value, onChange } }) => (
                        <InputMain
                            inputClassName={s.input}
                            type={"date"}
                            value={value}
                            onChange={onChange}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name={"debtor"}
                    rules={{
                        validate: value => value !== null,
                    }}
                    render={({ field: { value, onChange } }) => (
                        <Select
                            selectClassName={s.input}
                            options={users}
                            placeholder={"Кому долг"}
                            optionNameField={"nameWithSurname"}
                            value={value ?? ""}
                            invalid={!!errors.debtor}
                            onChange={onChange}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name={"sumDebt"}
                    rules={{
                        validate: value => value >= 100,
                    }}
                    render={({ field: { value, onChange } }) => (
                        <InputMain
                            inputClassName={s.input}
                            type={"number"}
                            placeholder={"Сумма"}
                            value={String(value)}
                            invalid={!!errors.sumDebt}
                            onChange={onChange}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name={"description"}
                    rules={{
                        validate: value => value.length > 3,
                    }}
                    render={({ field: { value, onChange } }) => (
                        <InputMain
                            inputClassName={s.input}
                            placeholder={"За что долг"}
                            value={value}
                            invalid={!!errors.description}
                            onChange={onChange}
                        />
                    )}
                />
                <h2 className={s.modal_title}>Реквизиты</h2>
                <Tabs
                    tabsData={tabsData}
                    activeTab={activeTab}
                    onClickTab={setActiveTab}
                >
                    <>
                        {activeTab === "phoneNumber" ? (
                            <div className={s.tab_items}>
                                <Controller
                                    control={control}
                                    name={"bank"}
                                    rules={{
                                        validate: value => value !== null,
                                    }}
                                    render={({ field: { value, onChange } }) => (
                                        <InputMain
                                            inputClassName={s.input}
                                            placeholder={"Банк"}
                                            value={value}
                                            invalid={!!errors.description}
                                            onChange={onChange}
                                        />
                                    )}
                                />
                                <Controller
                                    control={control}
                                    name={"phoneNumber"}
                                    rules={{
                                        validate: value => value !== null,
                                    }}
                                    render={({ field: { value, onChange } }) => (
                                        <InputMain
                                            inputClassName={s.input}
                                            placeholder={"Номер телефона"}
                                            value={value}
                                            invalid={!!errors.description}
                                            onChange={onChange}
                                        />
                                    )}
                                />
                            </div>
                        ) : (
                            <Controller
                                control={control}
                                name={"cardNumber"}
                                rules={{
                                    validate: value => value !== null,
                                }}
                                render={({ field: { value, onChange } }) => (
                                    <InputMain
                                        inputClassName={s.input}
                                        placeholder={"Номер карты"}
                                        value={value}
                                        invalid={!!errors.description}
                                        onChange={onChange}
                                    />
                                )}
                            />
                        )}
                    </>
                </Tabs>
            </ModalBody>
            <ModalFooter className={s.footer}>
                <ButtonMain
                    className={s.button}
                    form={formId}
                >
                    Добавить
                </ButtonMain>
            </ModalFooter>
        </Modal>
    );
};

export default DebtCreateModal;
