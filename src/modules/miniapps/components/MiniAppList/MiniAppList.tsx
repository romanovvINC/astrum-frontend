import { Col, Row } from "reactstrap";
import { MiniAppCard } from "./MiniAppCard";
import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "Redux/hooks";
import { MiniAppSelectors } from "modules/miniapps"
import { getMiniAppsListRequest } from "modules/miniapps/store";

const MiniAppList: FC = () => {
    const {
        pendingList,
        miniAppList,
    } = useAppSelector(MiniAppSelectors.getMiniAppState);
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getMiniAppsListRequest())
    }, []);

    return (
        <Row>
            { miniAppList.length === 0 ? (
                <h3 style={{ fontWeight: 400 }}>Нет мини-приложений</h3>
            ) : (
                miniAppList.map(miniApp => (
                    <Col xl={3} key={miniApp.id}>
                        { <MiniAppCard {...miniApp} /> }
                    </Col>
                ))
            )}
        </Row>
    )
}

export default MiniAppList;