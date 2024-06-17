import { FC, useCallback, useContext, useEffect, useRef, useState } from "react";
import { Col, Fade, Row } from "reactstrap";
import CheckContext from "../../_helper/customizer/index";
import { ToggleIcon } from "ui/icons/svgIcons";
import UserWallet from "../../Components/Account/UserWallet";
import { useAppSelector } from "Redux/hooks";
import { authSelectors } from "modules/auth";
import { UserAvatar } from "../../Components/UserAvatar";
import { getDefaultAvatar } from "../../Mocks/MockFunctions";
import CollapseMenu from "./CollapseMenu";
import s from "./Header.module.scss";
import classNames from "classnames";
import Notification from "./Notification";
import MarketCartShortInfo from "./MarketCartShortInfo";

const Header: FC = () => {
    //eslint-disable-next-line
    //@ts-ignore
    const { toggleIcon, toggleSidebar } = useContext(CheckContext);
    const { avatarUrl, money } = useAppSelector(authSelectors.getBasicInfo);
    const [menuIsOpen, setMenuOpen] = useState(false);
    const avatarRef = useRef<HTMLDivElement>(null);
    const fadeRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const clickOutsideHandler = (e: any) => {
            if (
                menuIsOpen &&
                fadeRef.current &&
                avatarRef.current &&
                !fadeRef.current.contains(e.target) &&
                !avatarRef.current.contains(e.target)
            ) {
                setMenuOpen(false);
            }
        };
        window.addEventListener("click", clickOutsideHandler);
        return () => {
            window.removeEventListener("click", clickOutsideHandler);
        };
    }, [menuIsOpen]);

    const toggleMenuHandler = useCallback(() => setMenuOpen(prev => !prev), []);

    const closeMenuHandler = useCallback(() => setMenuOpen(false), []);

    const openCloseSidebar = () => toggleSidebar(!toggleIcon);

    return (
        <Row className={s.header}>
            <Col className={s.left_content}>
                <ToggleIcon
                    style={{ cursor: "pointer" }}
                    onClick={openCloseSidebar}
                />
                <UserWallet money={money} />
            </Col>
            <Col className={s.right_content}>
                <MarketCartShortInfo />
                {/*<Notification />*/}
                <div ref={avatarRef}>
                    <UserAvatar
                        className={s.user_profile}
                        avatarUrl={avatarUrl ?? getDefaultAvatar()}
                        onClick={toggleMenuHandler}
                    />
                </div>
            </Col>
            <Fade
                className={classNames(s.collapse_menu, { [s.opened]: menuIsOpen })}
                in={menuIsOpen}
                innerRef={fadeRef}
            >
                <CollapseMenu onClose={closeMenuHandler} />
            </Fade>
        </Row>
    );
};
export default Header;
