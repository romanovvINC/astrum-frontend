import React, { FC, useMemo, useState } from "react";
import { Container } from "reactstrap";
import { MiniAppList } from "modules/miniapps";

const MiniAppListPage: FC = () => {
    return (
        <Container fluid={false}>
            <h2 style={{ marginBottom: 20, fontWeight: 600 }}>Мини-приложения</h2>
            <MiniAppList />
        </Container>
    );
}

export default MiniAppListPage;