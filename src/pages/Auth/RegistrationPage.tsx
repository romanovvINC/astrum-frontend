import React, { FC } from "react";
import { Card, CardBody } from "reactstrap";
import { RegistrationForm } from "modules/auth";

import s from "./AutorizationPages.module.scss";

const RegistrationPage: FC = () => {
    return (
        <div className={s.container}>
            <Card>
                <CardBody>
                    <RegistrationForm />
                </CardBody>
            </Card>
        </div>
    );
};

export default RegistrationPage;
