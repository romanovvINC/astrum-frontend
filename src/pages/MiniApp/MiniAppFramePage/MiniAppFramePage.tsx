import React, { FC } from "react";
import { useParams } from "react-router-dom";
import { Container } from "reactstrap";
import { MiniAppFrame } from "modules/miniapps"

const MiniAppFramePage: FC = () => {
    const { id } = useParams()
    return <Container fluid={false}>
        <MiniAppFrame appId={id!} />
    </Container>
}

export default MiniAppFramePage;