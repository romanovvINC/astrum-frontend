import React from "react";
import { Bell, X } from "react-feather";
import { Media } from "reactstrap";
import { Link } from "react-router-dom";
import { HeaderNotificationSvg } from "../../../UiKit/icons/svgIcons";
import { getDefaultAvatar } from "../../../Mocks/MockFunctions";
import { getPublishDateString } from "../../../Helpers/GetPublishDateString";

const Notification = () => {
    return (
        <div className={"onhover-dropdown"}>
            <div className="notification-box">
                <HeaderNotificationSvg />
                <span className="badge rounded-pill badge-warning">4</span>
            </div>
            <div className={`onhover-show-div notification-dropdown`}>
                <div className="dropdown-title">
                    <h3>Notification</h3>
                    <a className="f-right">
                        <Bell />
                    </a>
                </div>
                <ul className={"simple-list custom-scrollbar"}>
                    {[
                        {
                            id: 1,
                            img: getDefaultAvatar(),
                            name: "name",
                            username: "dimonchikamen",
                            time: getPublishDateString(new Date()),
                        },
                        {
                            id: 2,
                            img: getDefaultAvatar(),
                            name: "name__2",
                            username: "dimonchikamen",
                            time: getPublishDateString(new Date()),
                        },
                    ].map(item => {
                        return (
                            <li key={item.id}>
                                <Media>
                                    <div className={`notification-img ${item.class}`}>
                                        <Media
                                            style={{ width: 30, height: 30 }}
                                            src={item.img}
                                            alt=""
                                        />
                                    </div>
                                    <Media body>
                                        <h5>
                                            <Link
                                                to={`/users/${item.username}`}
                                                className="f-14 m-0"
                                            >
                                                {item.name}
                                            </Link>
                                        </h5>
                                        <p>{item.desp}</p>
                                        <span>{item.time}</span>
                                    </Media>
                                    <div className="notification-right">
                                        <a href="#javascript">
                                            <X />
                                        </a>
                                    </div>
                                </Media>
                            </li>
                        );
                    })}
                    <li className={"p-0"}>
                        <a className="btn btn-primary">Check all</a>
                    </li>
                </ul>
            </div>
        </div>
    );
};
export default Notification;
