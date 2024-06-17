import React, { FC } from "react";
import { Card, CardBody } from "reactstrap";
import { LoginForm } from "modules/auth";

import s from "./AutorizationPages.module.scss";

const LoginPage: FC = () => {
    return (
        <div className={s.container}>
            <Card>
                <CardBody>
                    <LoginForm />
                </CardBody>
            </Card>
        </div>
    );
};

export default LoginPage;
