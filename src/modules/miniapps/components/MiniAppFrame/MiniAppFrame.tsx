import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "Redux/hooks";
import { MiniAppSelectors } from "modules/miniapps";
import { getMiniAppInfoRequest } from "modules/miniapps/store";
import styles from './MiniAppFrame.module.scss'
import { authSelectors } from "modules/auth";

interface IMiniAppFrame {
    appId: string;
}

const MiniAppFrame: FC<IMiniAppFrame> = ({ appId }) => {
    const { link } = useAppSelector(MiniAppSelectors.getMiniAppInfo);
    const { userId } = useAppSelector(authSelectors.getBasicInfo);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getMiniAppInfoRequest(appId))
    }, []);

    return (
        <div className={styles.app_wrapper}>
            <iframe className={styles.app_frame} src={`${link}?userId=${userId}`}>
            </iframe>
        </div>
    )
}

export default MiniAppFrame;