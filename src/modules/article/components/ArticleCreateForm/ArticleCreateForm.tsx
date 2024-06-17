import React, { FC, useCallback, useEffect, useState } from "react";
import { Col } from "reactstrap";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "Redux/hooks";
import { ArticleCreateInfo } from "models/article/ArticleCreateInfo";
import {
    getCategoriesRequest,
    getArticleBySlugRequest,
    createArticleRequest,
    editArticleRequest,
    checkArticleNameRequest,
    articleSelectors,
} from "modules/article";
import { changeStringField, validateStringField } from "Helpers/stringHelpers";
import { TinyEditor } from "Components/TinyEditor";
import { InputImage } from "Components/InputImage";
import { TagsSection } from "./TagsSection";
import { ModalLoading } from "ui/Modal";
import { ButtonMain } from "ui/Button";
import { Select } from "ui/Select";
import { InputMain } from "ui/Input";

import s from "./ArticleCreateForm.module.scss";

interface IArticleCreateForm {
    userId: string;
    isEdit: boolean;
    slug: string;
}

const minNameLength = 0;
const maxNameLength = 40;
const maxDescriptionLength = 300;

const ArticleCreateForm: FC<IArticleCreateForm> = ({ userId, isEdit, slug }) => {
    const { pending, pendingChange, pendingCategories, articleNameIsExist, categories } = useAppSelector(
        articleSelectors.getArticleState
    );
    const {
        id,
        name,
        description,
        content,
        category,
        coverUrl,
        tags,
        slug: currentArticleSlug,
    } = useAppSelector(articleSelectors.getArticleInfo);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {
        handleSubmit,
        control,
        setValue,
        setError,
        clearErrors,
        formState: { errors },
    } = useForm<ArticleCreateInfo>({
        values: {
            id: isEdit ? id : "",
            name: isEdit ? name : "",
            author: userId,
            description: isEdit ? description : "",
            content: isEdit ? { html: content, text: "" } : { html: "", text: "" },
            category: isEdit ? category : { id: "", name: "" },
            coverImage: isEdit ? coverUrl : "",
            tags: isEdit ? tags : [],
        },
    });
    const [timer, setTimer] = useState<NodeJS.Timer | null>(null);

    useEffect(() => {
        if (isEdit && currentArticleSlug !== slug) {
            dispatch(getArticleBySlugRequest(slug));
        }
        if (!categories.length) {
            dispatch(getCategoriesRequest());
        }
    }, []);

    const goToArticleListHandler = useCallback(() => navigate("/articles"), []);

    const saveArticleHandler = useCallback(
        (data: ArticleCreateInfo) => {
            if (isEdit) {
                dispatch(editArticleRequest({ data: { id, ...data }, successCallback: goToArticleListHandler }));
            } else {
                dispatch(createArticleRequest({ data, successCallback: goToArticleListHandler }));
            }
        },
        [isEdit, id]
    );

    const checkArticleNameHandler = (newVal: string) => {
        if (timer) {
            clearTimeout(timer);
        }
        if (newVal.length > 0) {
            const newTimer = setTimeout(() => dispatch(checkArticleNameRequest(newVal)), 500);
            setTimer(newTimer);
        }
        const isValid = validateStringField(minNameLength, maxNameLength, () => !articleNameIsExist)(newVal);
        if (!isValid) {
            setError("name", { message: "not valid" });
        } else {
            clearErrors("name");
        }
    };

    const validateArticleName = validateStringField(minNameLength, maxNameLength, () => !articleNameIsExist);

    const changeArticleNameHandler = (e: { target: { value: string } }) => {
        const res = e.target.value.replace(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/g, "");
        changeStringField(setValue, "name", checkArticleNameHandler)({ target: { value: res } });
    };

    return (
        <form onSubmit={handleSubmit(saveArticleHandler)}>
            <Col
                xl={6}
                className={s.row}
            >
                <h2>
                    Название<span className={s.required_star}>*</span>
                </h2>
                <Controller
                    control={control}
                    name={"name"}
                    rules={{
                        onChange: changeArticleNameHandler,
                        validate: validateArticleName,
                    }}
                    render={({ field: { value, onChange } }) => (
                        <InputMain
                            errorMessageClassName={s.error_message}
                            placeholder="Название статьи"
                            type={"text"}
                            value={value}
                            onChange={onChange}
                            invalid={!!errors.name || articleNameIsExist}
                            errorMessage={
                                articleNameIsExist
                                    ? "Данное имя уще существует"
                                    : errors.name
                                    ? `Название статьи не может быть пустым и превышать ${maxDescriptionLength} символов`
                                    : ""
                            }
                        />
                    )}
                />
            </Col>
            <Col
                xl={6}
                className={s.row}
            >
                <h2>
                    Описание<span className={s.required_star}>*</span>
                </h2>
                <Controller
                    control={control}
                    name={"description"}
                    rules={{
                        required: true,
                        onChange: changeStringField(setValue, "description"),
                        validate: validateStringField(0, 300),
                    }}
                    render={({ field: { value, onChange, onBlur } }) => (
                        <InputMain
                            inputClassName={s.textarea}
                            placeholder="Описание"
                            value={value}
                            rows={5}
                            invalid={!!errors.description}
                            type={"textarea"}
                            onChange={onChange}
                            errorMessage={
                                errors.description
                                    ? `Описание не может быть пустым и превышать ${maxNameLength} символов`
                                    : ""
                            }
                        />
                    )}
                />
            </Col>
            <Col
                xl={6}
                className={s.row}
            >
                <h2>
                    Добавить обложку<span className={s.required_star}>*</span>
                </h2>
                <Controller
                    control={control}
                    name={"coverImage"}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { value, onChange } }) => (
                        <InputImage
                            value={value}
                            onChange={onChange}
                            invalid={!!errors.coverImage}
                        />
                    )}
                />
            </Col>
            <Col
                xl={6}
                className={s.row}
            >
                <h2>
                    Категория<span className={s.required_star}>*</span>
                </h2>
                <Controller
                    control={control}
                    name={"category"}
                    rules={{
                        validate: value => value.id !== "",
                    }}
                    render={({ field: { value, onChange } }) => (
                        <Select
                            value={value}
                            options={categories}
                            placeholder={"Категория не выбрана"}
                            optionNameField={"name"}
                            invalid={!!errors.category}
                            onChange={onChange}
                        />
                    )}
                />
            </Col>
            <Col
                xl={12}
                className={s.row}
            >
                <h2>Теги</h2>
                <Controller
                    control={control}
                    name={"tags"}
                    render={({ field: { value, onChange } }) => (
                        <TagsSection
                            value={value}
                            onChange={onChange}
                        />
                    )}
                />
            </Col>
            <Col
                xl={12}
                className={s.row}
            >
                <h2>
                    Содержание<span className={s.required_star}>*</span>
                </h2>
                <Controller
                    control={control}
                    name={"content"}
                    rules={{
                        validate: val => val.text.length > 0, //TODO.... исправить на 100,200,300 (надо уточнить)
                    }}
                    render={({ field: { value, onChange, onBlur } }) => {
                        return (
                            <TinyEditor
                                value={value}
                                onChange={onChange}
                                invalid={!!errors.content}
                            />
                        );
                    }}
                />
            </Col>
            <Col
                xl={2}
                className={s.row}
            >
                <ButtonMain className={s.submit_button}>Сохранить</ButtonMain>
            </Col>
            <ModalLoading isOpen={pendingCategories || pending || pendingChange} />
        </form>
    );
};

export default ArticleCreateForm;
