import { FC, ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "Redux/hooks";
import { authSelectors } from "modules/auth";

interface IPrivateRouteProps {
    children: ReactElement;
}
const PrivateRoute: FC<IPrivateRouteProps> = ({ children }) => {
    const { isAuth } = useAppSelector(authSelectors.getAuthInfo);

    if (!isAuth || !localStorage.getItem("@ACCESS_TOKEN")) {
        return <Navigate to={`/login`} />;
    }

    return children;
};

export default PrivateRoute;
