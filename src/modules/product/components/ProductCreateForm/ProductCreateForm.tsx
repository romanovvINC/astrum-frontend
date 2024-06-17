import React, { FC, useCallback, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Row } from "reactstrap";
import { Controller, useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { useAppDispatch, useAppSelector } from "Redux/hooks";
import { ProductCreateInfo } from "models/product/ProductCreateInfo";
import { ProductEditInfo } from "models/product/ProductEditInfo";
import {
    createProductRequest,
    editProductRequest,
    getProductCustomerListRequest,
    getProductRequest,
    productSelectors,
} from "modules/product";
import { InputImage } from "Components/InputImage";
import { ProjectListSection } from "./ProjectListSection";
import { ButtonMain } from "ui/Button";
import { ModalLoading } from "ui/Modal";
import { InputMain } from "ui/Input";
import { Select } from "ui/Select";

import s from "./ProductCreateForm.module.scss";
import { changeStringField, removeUnnecessarySpaces, validateStringField } from "Helpers/stringHelpers";

interface IProductCreateFormProps {
    id?: string;
    isEdit: boolean;
}

const defaultDate = new Date();

const ProductCreateForm: FC<IProductCreateFormProps> = ({ isEdit, id }) => {
    const { pending, pendingChange, pendingCustomers, customers } = useAppSelector(productSelectors.getProductState);
    const {
        id: currentProductId,
        name,
        customer,
        startDate,
        endDate,
        description,
        coverUrl,
        projects,
    } = useAppSelector(productSelectors.getProductInfo);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const options = useMemo(() => customers.filter(c => c.name), [customers]);

    const {
        control,
        reset,
        formState: { errors },
        handleSubmit,
        setValue,
    } = useForm<ProductCreateInfo | ProductEditInfo>({
        values: {
            id: isEdit ? currentProductId : "",
            customer: isEdit ? customer : { id: "", name: "" },
            name: isEdit ? name : "",
            startDate: isEdit ? startDate : defaultDate,
            endDate: isEdit ? endDate : null,
            description: isEdit ? description : "",
            coverImage: isEdit ? coverUrl : "",
            projects: isEdit ? projects : [],
        },
    });

    useEffect(() => {
        if (customers.length === 0) {
            dispatch(getProductCustomerListRequest());
        }

        if (isEdit && id && id !== currentProductId) {
            dispatch(getProductRequest(id));
        }
    }, []);

    const successCallback = useCallback((navigateUrl: string) => {
        return () => {
            navigate(navigateUrl);
            reset();
        };
    }, []);

    const submitHandler = useCallback(
        (data: ProductCreateInfo | ProductEditInfo) => {
            if (isEdit) {
                dispatch(
                    editProductRequest({
                        data: data as ProductEditInfo,
                        successCallback: successCallback(`/products/${id}`),
                    })
                );
            } else {
                dispatch(
                    createProductRequest({
                        data: data as ProductCreateInfo,
                        successCallback: successCallback("/products"),
                    })
                );
            }
        },
        [isEdit]
    );

    return (
        <form onSubmit={handleSubmit(submitHandler)}>
            <Col
                xl={6}
                className={s.row}
            >
                <h2>
                    Название продукта<span className={s.required_star}>*</span>
                </h2>
                <Controller
                    control={control}
                    name={"name"}
                    rules={{
                        onChange: changeStringField(setValue, "name"),
                        validate: validateStringField(),
                    }}
                    render={({ field: { value, onChange } }) => (
                        <InputMain
                            value={value}
                            onChange={onChange}
                            placeholder={"Название продукта"}
                            invalid={!!errors.name}
                        />
                    )}
                />
            </Col>
            <Col
                xl={6}
                className={s.row}
            >
                <h2>
                    Заказчик<span className={s.required_star}>*</span>
                </h2>
                <Controller
                    control={control}
                    name={"customer"}
                    rules={{
                        validate: value => value.id !== "",
                    }}
                    render={({ field: { value, onChange } }) => (
                        <Select
                            value={value}
                            options={options}
                            invalid={!!errors.customer}
                            onChange={onChange}
                        />
                    )}
                />
            </Col>
            <Col xl={6}>
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
                        validate: validateStringField(-1, 400),
                    }}
                    render={({ field: { value, onChange } }) => (
                        <InputMain
                            value={value}
                            onChange={onChange}
                            type={"textarea"}
                            rows={5}
                            placeholder={"Описане"}
                            invalid={!!errors.description}
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
                        validate: value => value !== null && value !== "",
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
            <Col>
                <h2>
                    Проекты<span className={s.required_star}>*</span>
                </h2>
                <Controller
                    control={control}
                    name={"projects"}
                    rules={{
                        validate: value => value.length > 0,
                    }}
                    render={({ field: { value, onChange } }) => (
                        <ProjectListSection
                            projects={value}
                            invalid={!!errors.projects}
                            onChange={onChange}
                        />
                    )}
                />
            </Col>
            <Col
                xl={2}
                className={s.row}
            >
                <ButtonMain className={s.submit_button}>Сохранить</ButtonMain>
            </Col>
            <ModalLoading isOpen={pending || pendingChange || pendingCustomers} />
        </form>
    );
};

export default ProductCreateForm;
