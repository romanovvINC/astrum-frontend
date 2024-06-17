import React, { FC, FormEvent, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Row } from "reactstrap";
import DatePicker, { registerLocale } from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import ru from "date-fns/locale/ru";
import { useAppDispatch, useAppSelector } from "Redux/hooks";
import { editProjectRequest, getProjectRequest, productSelectors } from "modules/product";
import { ProjectCreateInfo } from "models/product/ProjectCreateInfo";
import { ProjectEditInfo } from "models/product/ProjectEditInfo";
import { CustomFieldsSection } from "./CustomFieldsSection";
import { AddMemberSection } from "./AddMemberSection";
import { ButtonMain } from "ui/Button";
import { InputMain } from "ui/Input";

registerLocale("ru", ru);

import s from "./ProjectCreateForm.module.scss";
import { changeStringField, validateStringField } from "Helpers/stringHelpers";

interface IProjectCreateFormProps {
    id: string;
    needSendRequestToGetProject?: boolean;
    isEdit: boolean;
    existProjectNames?: string[];
    onSave?: (data: ProjectCreateInfo | ProjectEditInfo) => void;
}

const defaultDate = new Date();

const ProjectCreateForm: FC<IProjectCreateFormProps> = ({
    id,
    needSendRequestToGetProject = true,
    isEdit,
    existProjectNames = [],
    onSave,
}) => {
    const {
        id: currentProjectId,
        productId,
        name,
        startDate,
        endDate,
        description,
        members,
        customFields,
    } = useAppSelector(productSelectors.getProjectInfo);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {
        control,
        reset,
        formState: { errors },
        handleSubmit,
        setValue,
        setError,
        clearErrors,
    } = useForm<ProjectCreateInfo>({
        values: {
            id: isEdit ? id : "",
            productId: isEdit ? productId : "",
            name: isEdit ? name : "",
            startDate: isEdit ? startDate : defaultDate,
            endDate: isEdit ? endDate : null,
            description: isEdit ? description : "",
            members: isEdit ? members : [],
            customFields: isEdit ? customFields : [],
        },
    });

    useEffect(() => {
        if (isEdit && needSendRequestToGetProject && currentProjectId !== id && id) {
            dispatch(getProjectRequest(id));
        }
    }, []);

    const validateProjectName = (val: string) => {
        if (existProjectNames.some(p => p === val)) {
            setError("name", { message: "Такое имя уже сущесвует", type: "validate" });
            return false;
        } else {
            const validateResult = validateStringField()(val);
            if (validateResult) {
                clearErrors("name");
                return true;
            } else {
                setError("name", {
                    message: "Длина названия должна быть не больше 40 символов и не может состоять из пробелов",
                    type: "validate",
                });
                return false;
            }
        }
    };

    const submitHandler = useCallback(
        (data: ProjectCreateInfo) => {
            if (isEdit) {
                const result = { ...data, id };
                if (onSave) {
                    onSave(result);
                } else {
                    dispatch(editProjectRequest({ data: result, successCallback: () => navigate(`/projects/${id}`) }));
                }
            } else {
                onSave?.(data);
            }
        },
        [id]
    );

    const wrapHandleSubmit = useCallback(
        (e: FormEvent) => {
            e.preventDefault();
            e.stopPropagation();
            return handleSubmit(submitHandler)();
        },
        [submitHandler]
    );

    return (
        <form onSubmit={wrapHandleSubmit}>
            <Col
                xl={6}
                className={s.row}
            >
                <h2>
                    Название проекта<span className={s.required_star}>*</span>
                </h2>
                <Controller
                    control={control}
                    name={"name"}
                    rules={{
                        onChange: changeStringField(setValue, "name", validateProjectName),
                        validate: validateProjectName,
                    }}
                    render={({ field: { value, onChange } }) => (
                        <InputMain
                            value={value}
                            onChange={onChange}
                            placeholder={"Название проекта"}
                            invalid={!!errors.name}
                            errorMessage={errors.name?.message ?? ""}
                        />
                    )}
                />
            </Col>
            <Col
                xl={6}
                className={s.row}
            >
                <Row>
                    <Col>
                        <h2>
                            Дата начала<span className={s.required_star}>*</span>
                        </h2>
                        <Controller
                            control={control}
                            name={"startDate"}
                            rules={{
                                validate: value => value !== null,
                            }}
                            render={({ field: { value, onChange } }) => (
                                <DatePicker
                                    className="form-control"
                                    placeholderText="Дата начала"
                                    dateFormat="P"
                                    locale="ru"
                                    selected={value}
                                    onChange={onChange}
                                    selectsStart
                                />
                            )}
                        />
                    </Col>
                    <Col>
                        <h2>Дата Завершения</h2>
                        <Controller
                            control={control}
                            name={"endDate"}
                            render={({ field: { value, onChange } }) => (
                                <DatePicker
                                    className="form-control"
                                    placeholderText="Дата завершения"
                                    dateFormat="P"
                                    locale="ru"
                                    selected={value}
                                    onChange={onChange}
                                    selectsStart
                                />
                            )}
                        />
                    </Col>
                </Row>
            </Col>
            <Col
                xl={6}
                className={s.row}
            >
                <h2>Описание</h2>
                <Controller
                    control={control}
                    name={"description"}
                    rules={{
                        onChange: changeStringField(setValue, "description"),
                    }}
                    render={({ field: { value, onChange } }) => (
                        <InputMain
                            value={value}
                            onChange={onChange}
                            type={"textarea"}
                            rows={5}
                            placeholder={"Описание"}
                        />
                    )}
                />
            </Col>
            <Col className={s.row}>
                <h2>
                    Команда<span className={s.required_star}>*</span>
                </h2>
                <Controller
                    control={control}
                    name={"members"}
                    rules={{
                        validate: value => value.length > 0,
                    }}
                    render={({ field: { value, onChange } }) => (
                        <AddMemberSection
                            value={value}
                            invalid={!!errors.members}
                            onChange={onChange}
                        />
                    )}
                />
            </Col>
            <Col className={s.row}>
                <h2>Дополнительные поля</h2>
                <Controller
                    control={control}
                    name={"customFields"}
                    render={({ field: { value, onChange } }) => (
                        <CustomFieldsSection
                            fields={value}
                            onChange={onChange}
                        />
                    )}
                />
            </Col>
            <Col
                xl={2}
                className={s.row}
            >
                <ButtonMain
                    className={s.submit_button}
                    disabled={!!errors.name}
                >
                    Сохранить
                </ButtonMain>
            </Col>
        </form>
    );
};

export default ProjectCreateForm;
