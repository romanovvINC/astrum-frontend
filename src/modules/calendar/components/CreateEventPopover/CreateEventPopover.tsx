import { FC, useCallback, useMemo, useRef } from "react";
import { Col, Popover, PopoverBody } from "reactstrap";
import { Controller, useForm } from "react-hook-form";
import DatePicker, { registerLocale } from "react-datepicker";
import { useAppSelector } from "Redux/hooks";
import Select from "react-select";

import { useOnClickOutside } from "Helpers/Hooks/useClickOutside";

import type { CalendarEventCreate } from "../../store/Types/CalendarEventCreate";
import ru from "date-fns/locale/ru";

import { ButtonMain } from "ui/Button";
import { InputMain } from "ui/Input";

import classNames from "classnames";
import s from "./CreateEventPopover.module.css";

registerLocale("ru", ru);

interface ICreateEventPopoverProps {
    defaultStart: Date;
    defaultEnd: Date;
    defaultTitle?: string;
    defaultDescription?: string;
    defaultCalendarId?: string;
    isOpen: boolean;
    target: string | HTMLElement;
    onClickCreate: (event: { calendarId: string; title: string; start: Date; end: Date; description: string }) => void;
    onClickCancel: () => void;
    onClickOutside: () => void;
}

const CreateEventPopover: FC<ICreateEventPopoverProps> = ({
    isOpen,
    target,
    defaultTitle,
    defaultDescription,
    defaultCalendarId,
    defaultStart,
    defaultEnd,
    onClickCreate,
    onClickCancel,
    onClickOutside,
}) => {
    const calendars = useAppSelector(state => state.CalendarReducer.calendars);
    const options = useMemo(
        () => calendars.map(c => ({ label: c.name, value: c.id, color: c.backgroundColor })),
        [calendars]
    );
    const defaultOption = useMemo(
        () => options.filter(o => o.value === defaultCalendarId)[0],
        [options, defaultCalendarId]
    );

    const {
        control,
        reset,
        formState: { errors },
        handleSubmit,
        getValues,
        setError,
        clearErrors,
    } = useForm<CalendarEventCreate>({
        values: {
            calendar: defaultOption ?? options[0] ?? null,
            title: defaultTitle ?? "",
            description: defaultDescription ?? "",
            start: defaultStart,
            end: defaultEnd,
        },
    });

    const ref = useRef(null);

    useOnClickOutside(ref, onClickOutside);

    const clickCancelHandler = useCallback(() => {
        reset();
        onClickCancel();
    }, [onClickCancel]);

    const OptionLabel: FC<{ data: { label: string; value: string; color: string } }> = ({ data }) => {
        return (
            <div style={{ display: "flex", alignItems: "center", gap: 20, justifyContent: "left" }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: data.color }} />
                <span>{data.label}</span>
            </div>
        );
    };

    const validateStartAndEndHandler = useCallback(() => {
        if (getValues().end.getTime() - getValues().start.getTime() < 0) {
            setError("start", { message: "Время начала должно быть меньше окончания" });
            setError("end", { message: "Время окончания должно быть больше начала" });
        } else {
            clearErrors("start");
            clearErrors("end");
        }
    }, []);

    const validateResultHandler = useCallback(() => getValues().end.getTime() - getValues().start.getTime() >= 0, []);

    const submitHandler = useCallback(
        (data: CalendarEventCreate) => {
            const { calendar, ...rest } = data;
            console.log(data)
            onClickCreate({
                calendarId: calendar?.value ?? "",
                ...rest,
            });
        },
        [onClickCreate]
    );

    return (
        <Popover
            className={s.popover}
            isOpen={isOpen}
            target={target}
            toggle={onClickCancel}
            placementPrefix={s.popover}
            
        >
            <div ref={ref}>
                <PopoverBody
                    className={s.popover_body}
                    tag={"form"}
                    onSubmit={handleSubmit(submitHandler)}
                >
                    <Col xl={12}>
                        <Controller
                            control={control}
                            name={"calendar"}
                            render={({ field: { value, onChange } }) => (
                                <Select
                                    options={options}
                                    value={value}
                                    //eslint-disable-next-line
                                    //@ts-ignore
                                    formatOptionLabel={(data, e) => <OptionLabel data={data} />}
                                    onChange={onChange}
                                />
                            )}
                        />
                    </Col>
                    <Col xl={12}>
                        <Controller
                            control={control}
                            name={"title"}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { value, onChange, onBlur } }) => (
                                <InputMain
                                    value={value}
                                    placeholder="Заголовок"
                                    invalid={!!errors.title}
                                    errorMessage={"Поле не может быть пустым"}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                />
                            )}
                        />
                    </Col>
                    <Col xl={12}>
                        <Controller
                            control={control}
                            name={"description"}
                            render={({ field: { value, onChange, onBlur } }) => (
                                <InputMain
                                    value={value}
                                    placeholder="Описание"
                                    type={"textarea"}
                                    invalid={!!errors.description}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                />
                            )}
                        />
                    </Col>
                    <Col
                        xl={12}
                        className={s.date_picker_container}
                    >
                        <Col>
                            <Controller
                                control={control}
                                name={"start"}
                                rules={{
                                    onChange: validateStartAndEndHandler,
                                    validate: validateResultHandler,
                                }}
                                render={({ field: { value, onChange } }) => (
                                    <DatePicker
                                        className={classNames("form-control", { "is-invalid": !!errors.start })}
                                        placeholderText="Дата начала"
                                        timeCaption="Время"
                                        timeFormat="p"
                                        dateFormat="Pp"
                                        locale="ru"
                                        showTimeSelect={true}
                                        showTimeSelectOnly={true}
                                        selected={value}
                                        onChange={onChange}
                                        selectsStart
                                        maxDate={getValues().end}
                                    />
                                )}
                            />
                        </Col>
                        {" - "}
                        <Col>
                            <Controller
                                control={control}
                                name={"end"}
                                rules={{
                                    onChange: validateStartAndEndHandler,
                                    validate: validateResultHandler,
                                }}
                                render={({ field: { value, onChange } }) => (
                                    <DatePicker
                                        className={classNames("form-control", { "is-invalid": !!errors.end })}
                                        placeholderText="Дата завершения"
                                        timeCaption={"Время"}
                                        timeFormat="p"
                                        dateFormat="Pp"
                                        locale="ru"
                                        showTimeSelect={true}
                                        showTimeSelectOnly={true}
                                        selected={value}
                                        onChange={onChange}
                                        selectsEnd
                                        minDate={getValues().start}
                                    />
                                )}
                            />
                        </Col>
                    </Col>
                    <div className={s.action_container}>
                        <ButtonMain>Сохранить</ButtonMain>
                        <ButtonMain
                            onClick={clickCancelHandler}
                            variant={"invert"}
                            type={"button"}
                        >
                            Отменить
                        </ButtonMain>
                    </div>
                </PopoverBody>
            </div>
        </Popover>
    );
};

export default CreateEventPopover;
