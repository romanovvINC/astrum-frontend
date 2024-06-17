import React, { FC, Fragment } from "react";
import { Button, Col, Container, NavItem, NavLink, Row } from "reactstrap";
import s from "./HeaderWithTabs.module.scss";
import { Link } from "react-router-dom";
import { ButtonMain } from "ui/Button";

interface IHeaderWithTabsProps {
    tabsData: { title: string; value: string }[];
    activeTab: string;
    createButtonTitle?: string;
    createButtonHref?: string;
    onClickTab: (newTab: string) => void;
    onButtonClick?: () => void;
}

const HeaderWithTabs: FC<IHeaderWithTabsProps> = ({
    tabsData,
    activeTab,
    createButtonTitle,
    createButtonHref,
    onClickTab,
    onButtonClick,
}) => {
    return (
        <Container fluid={false}>
            <div className="page-title">
                <Row>
                    <Col
                        xs="12"
                        sm="6"
                    >
                        <ul className={s.nav}>
                            {tabsData.map((t, i) => {
                                return (
                                    <Fragment key={`nav-item-${i}`}>
                                        <NavItem className={`${s.tab} ${activeTab === t.value ? s.active : ""}`}>
                                            <NavLink
                                                className={`${s.nav_item} ${activeTab === t.value ? s.active : ""}`}
                                                onClick={() => onClickTab(t.value)}
                                            >
                                                {t.title}
                                            </NavLink>
                                        </NavItem>
                                        {i !== tabsData.length - 1 && (
                                            <li className={s.divider}>
                                                <div className={s.vertical_divider} />
                                            </li>
                                        )}
                                    </Fragment>
                                );
                            })}
                        </ul>
                    </Col>
                    <Col
                        xs="12"
                        sm="6"
                        className={s.right_column}
                    >
                        <div className={s.buttons_container}>
                            {createButtonHref && createButtonTitle ? (
                                <Link to={createButtonHref}>
                                    <ButtonMain
                                        variant={"secondary"}
                                        className={s.button}
                                        onClick={onButtonClick}
                                    >
                                        {createButtonTitle}
                                    </ButtonMain>
                                </Link>
                            ) : createButtonTitle ? (
                                <ButtonMain
                                    variant={"secondary"}
                                    className={s.button}
                                    onClick={onButtonClick}
                                >
                                    {createButtonTitle}
                                </ButtonMain>
                            ) : (
                                ""
                            )}
                        </div>
                    </Col>
                </Row>
            </div>
        </Container>
    );
};

export default HeaderWithTabs;
