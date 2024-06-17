import { FC, ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "Redux/hooks";
import Loader from "../Layout/Loader";
import { authSelectors } from "modules/auth";

interface IPublicRouteProps {
    children: ReactElement;
}

const PublicRoute: FC<IPublicRouteProps> = ({ children }) => {
    const { isAuth } = useAppSelector(authSelectors.getAuthInfo);

    if (isAuth && localStorage.getItem("@ACCESS_TOKEN")) {
        return <Navigate to={localStorage.getItem("@PREV_PATH") ?? "/feed"} />;
    } else if (!isAuth && localStorage.getItem("@ACCESS_TOKEN")) {
        return <Loader />;
    }

    return children;
};

export default PublicRoute;
