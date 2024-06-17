import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { authRoutes, routes } from "./Routes";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import Layout from "../Layout/Layout";
import { useEffect } from "react";
import { useAppDispatch } from "Redux/hooks";
import { checkAuthRequest } from "modules/auth";

const Routers = () => {
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();

    useEffect(() => {
        dispatch(checkAuthRequest());
    }, []);

    useEffect(() => {
        if (!pathname.includes("login") && !pathname.includes("registration")) {
            localStorage.setItem("@PREV_PATH", pathname);
        }
    }, [pathname]);

    return (
        <Routes>
            <Route
                element={
                    <PublicRoute>
                        <Outlet />
                    </PublicRoute>
                }
            >
                {authRoutes.map((r, i) => {
                    return (
                        <Route
                            key={i}
                            path={r.path}
                            element={r.component}
                        />
                    );
                })}
            </Route>
            <Route
                element={
                    <PrivateRoute>
                        <Layout />
                    </PrivateRoute>
                }
            >
                {routes.map((r, i) => (
                    <Route
                        key={i}
                        path={r.path}
                        element={r.Component}
                    />
                ))}
                <Route
                    path="*"
                    element={<Navigate to={"/feed"} />}
                />
            </Route>
        </Routes>
    );
};
export default Routers;
