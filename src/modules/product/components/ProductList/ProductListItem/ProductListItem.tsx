import React, { FC, memo, useCallback, useState } from "react";
import { Card, Col, Collapse, Row } from "reactstrap";
import { Link } from "react-router-dom";
import { ProductInfo } from "models/product/ProductInfo";
import { getDefaultProductImage } from "Mocks/MockFunctions";
import { getUserDateString } from "Helpers/GetUserDateString";
import { Image } from "ui/Image";
import { SelectArrowIcon } from "ui/icons";

import classNames from "classnames";
import s from "./ProductListItem.module.scss";

const ProductListItem: FC<ProductInfo> = ({
    id,
    name,
    description,
    customer,
    startDate,
    endDate,
    coverUrl,
    projects,
}) => {
    const startDateString = getUserDateString(startDate);
    const endDateString = endDate ? getUserDateString(endDate) : "В разработке";
    const [projectsOpened, setOpened] = useState(false);

    const toggleOpenProjectList = useCallback(() => setOpened(prev => !prev), []);

    return (
        <Card className={s.article}>
            <div className={`blog-box blog-list`}>
                <Row className="blog-box blog-list">
                    {coverUrl && (
                        <Col xl="5 col-12">
                            <Image
                                style={{ paddingRight: 0 }}
                                className={"img-fluid sm-100-w"}
                                src={coverUrl ?? getDefaultProductImage()}
                                alt={""}
                            />
                        </Col>
                    )}
                    <Col xl="7 col-12">
                        <div className={`blog-details ${s.detail}`}>
                            <div className="blog-date">{`${startDateString} - ${endDateString}`}</div>
                            <Link to={id}>
                                <h6 className={s.title}>{name}</h6>
                            </Link>
                            <div className="blog-bottom-content">
                                <ul className={`simple-list ${s.author_info}`}>
                                    <li>
                                        <span className={s.span_1}>Проекты:</span>
                                        <span className={s.span_2}> {projects.length}</span>
                                    </li>
                                    <li>
                                        <span className={s.span_1}>Заказчик:</span>
                                        <span className={s.span_2}> {customer.name}</span>
                                    </li>
                                </ul>
                                <hr />
                                <p className={`mt-0 ${s.description}`}>{description}</p>
                            </div>
                            {projects.length > 0 && (
                                <div
                                    className={s.icon_container}
                                    onClick={toggleOpenProjectList}
                                >
                                    <SelectArrowIcon
                                        className={classNames(s.collapse_icon, { [s.rotated]: projectsOpened })}
                                        width={24}
                                        height={12}
                                    />
                                </div>
                            )}
                        </div>
                    </Col>
                </Row>
                {projects.length > 0 && (
                    <Row>
                        <Col xl="12 col-12">
                            <Collapse isOpen={projectsOpened}>
                                <ul className={s.project_list}>
                                    {projects.map((p, i) => {
                                        return (
                                            <li
                                                key={`${p.id}-${i}`}
                                                className={s.project_info_li}
                                                style={{ borderRadius: 10 }}
                                            >
                                                <Link
                                                    className={s.project_info}
                                                    to={`/projects/${p.id}`}
                                                >
                                                    <h4>
                                                        {i + 1}. {p.name}
                                                    </h4>
                                                    <span>{p.startDate.getFullYear()}</span>
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </Collapse>
                        </Col>
                    </Row>
                )}
            </div>
        </Card>
    );
};

export default memo(ProductListItem);
