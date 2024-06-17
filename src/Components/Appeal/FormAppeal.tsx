import React, { Fragment, useCallback, useState } from "react";
import { Col, Form, FormGroup, Input, Label } from "reactstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import Dropzone from "react-dropzone-uploader";
import { useAppDispatch, useAppSelector } from "Redux/hooks";
import { addAppealRequest, setCoverImage, setImageUrl } from "Redux/Reducers/AppealReducer/AppealReducer";
import { AppealStatus } from "Redux/Reducers/AppealReducer/Types/Appeal";
import s from "../../MyPages/AppealPage/AppealPage.module.css";
import { useNavigate } from "react-router-dom";
import { authSelectors } from "modules/auth";
import { ButtonMain } from "../../ui/Button";

const FormAppeal = (props: any) => {
    const [title, setTitle] = useState("");
    const { coverUrl } = useAppSelector(state => state.appealReducer.appealCreatePageData);
    const [appealCategories, setCategories] = useState([]);
    const [receiver, setReceiver] = useState("");
    const [content, setContent] = useState("");
    const dispatch = useAppDispatch();
    const { userId } = useAppSelector(authSelectors.getBasicInfo);
    const history = useNavigate();
    const createAppeal = () => {
        dispatch(
            addAppealRequest({
                title: title,
                request: content,
                categories: appealCategories,
                from: userId,
                to: receiver,
                status: AppealStatus.Requested,
            })
        );
        history(`${process.env.PUBLIC_URL}/appeals/my`);
    };

    const onCategoryChange = (cats: any) => {
        setCategories(cats);
    };

    const onReceiverChange = (rec: any) => {
        if (rec[0]) setReceiver(rec[0].id);
    };
    const onChange = (newContent: string) => {
        setContent(newContent);
    };

    const categories = props.createData.appealCategories.map((item: any) => {
        return { id: item.id, category: item.category };
    });
    const receivers = props.createData.profileSummaries.map((item: any) => {
        return { id: item.userId, name: `${item.name} ${item.surname}` };
    });

    const changeImageUrl = useCallback((e: any) => {
        const reader = new FileReader();
        reader.readAsBinaryString(e.target.files[0]);
        const a = [...e.target.files];
        if (a.length < 1) return;
        const newImageUrls: any = [];
        a.forEach(im => newImageUrls.push(URL.createObjectURL(im)));
        const file = e.target.files[0];
        dispatch(setImageUrl(newImageUrls[0]));
        dispatch(setCoverImage(file));
    }, []);

    return (
        <Fragment>
            <Form className="row needs-validation">
                <Col sm="12">
                    <FormGroup className="mb-3">
                        <Label for="validationCustom01">{"Тема"}:</Label>
                        <Input
                            className="form-control"
                            id="validationCustom01"
                            type="text"
                            placeholder="Тема"
                            onChange={e => setTitle(e.target.value)}
                            required={true}
                        />
                        <div className="valid-feedback">{"Looks good!"}</div>
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <div className="col-form-Label">
                            {"Получатель"}:
                            <Typeahead
                                id="multiple-typeahead"
                                className="mt-2"
                                //clearButtons
                                labelKey="name"
                                options={receivers}
                                onChange={e => onReceiverChange(e)}
                                placeholder="Выберите получателя"
                            />
                        </div>
                    </FormGroup>
                    {/*<FormGroup className="mb-3">*/}
                    {/*    <Label>{Type}:</Label>*/}
                    {/*    <div className="m-checkbox-inline">*/}
                    {/*        <Label for="edo-ani">*/}
                    {/*            <Input*/}
                    {/*                className="radio_animated"*/}
                    {/*                id="edo-ani"*/}
                    {/*                type="radio"*/}
                    {/*                name="rdo-ani"*/}
                    {/*            />*/}
                    {/*            {Text}*/}
                    {/*        </Label>*/}
                    {/*        <Label for="edo-ani1">*/}
                    {/*            <Input*/}
                    {/*                className="radio_animated"*/}
                    {/*                id="edo-ani1"*/}
                    {/*                type="radio"*/}
                    {/*                name="rdo-ani"*/}
                    {/*            />*/}
                    {/*            {Image}*/}
                    {/*        </Label>*/}
                    {/*        <Label for="edo-ani2">*/}
                    {/*            <Input*/}
                    {/*                className="radio_animated"*/}
                    {/*                id="edo-ani2"*/}
                    {/*                type="radio"*/}
                    {/*                name="rdo-ani"*/}
                    {/*                defaultChecked*/}
                    {/*            />*/}
                    {/*            {Audio}*/}
                    {/*        </Label>*/}
                    {/*        <Label for="edo-ani3">*/}
                    {/*            <Input*/}
                    {/*                className="radio_animated"*/}
                    {/*                id="edo-ani3"*/}
                    {/*                type="radio"*/}
                    {/*                name="rdo-ani"*/}
                    {/*            />*/}
                    {/*            {Video}*/}
                    {/*        </Label>*/}
                    {/*    </div>*/}
                    {/*</FormGroup>*/}
                    <FormGroup className="mb-3">
                        <div className="col-form-Label">
                            {"Категория"}:
                            <Typeahead
                                id="multiple-typeahead"
                                className="mt-2"
                                //clearButtons
                                labelKey="category"
                                multiple
                                options={categories}
                                onChange={e => onCategoryChange(e)}
                                placeholder="Выберите категорию"
                            />
                        </div>
                    </FormGroup>
                    <div className="email-wrapper">
                        <div className="theme-form">
                            <FormGroup>
                                {"Содержание"}:{/*<CKEditors*/}
                                {/*          content={content}*/}
                                {/*          events={{*/}
                                {/*              'change': onChange*/}
                                {/*          }}/>*/}
                                <textarea
                                    className="form-control"
                                    rows={10}
                                    value={content}
                                    onChange={e => onChange(e.target.value)}
                                    placeholder={"Содержание заявки"}
                                />
                            </FormGroup>
                        </div>
                    </div>
                    <FormGroup className="mb-3">
                        {/*<Dropzone*/}
                        {/*    // getUploadParams={getUploadParams}*/}
                        {/*    // onChangeStatus={handleChangeStatus}*/}
                        {/*    maxFiles={10}*/}
                        {/*    multiple={false}*/}
                        {/*    canCancel={false}*/}
                        {/*    inputContent="Перенесите сюда файлы"*/}
                        {/*    styles={{*/}
                        {/*        dropzone: { width: "100%", height: 50 },*/}
                        {/*        dropzoneActive: { borderColor: "green" },*/}
                        {/*    }}*/}
                        {/*/>*/}
                        {/*{coverUrl && <Image attrImage={{ className: s.image_preview, src: coverUrl }} />}*/}
                        {/*<Input*/}
                        {/*    required={true}*/}
                        {/*    accept="image/*"*/}
                        {/*    type="file"*/}
                        {/*    onChange={changeImageUrl}*/}
                        {/*/>*/}
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <div className="btn-showcase text-end">
                            <ButtonMain
                                type={"button"}
                                onClick={createAppeal}
                            >
                                Отправить
                            </ButtonMain>
                            {/*<Btn attrBtn={{ color: "light", type: "reset" }}>{Discard}</Btn>*/}
                        </div>
                    </FormGroup>
                </Col>
            </Form>
        </Fragment>
    );
};
export default FormAppeal;
