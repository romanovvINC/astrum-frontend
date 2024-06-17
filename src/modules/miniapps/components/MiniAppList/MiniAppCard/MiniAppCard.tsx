import React, { FC } from "react";
import { MiniApp } from "models/miniapp/MiniApp";
import styles from './MiniAppCard.module.scss'
import { Card } from "reactstrap";
import { Link } from "react-router-dom";

const MiniAppCard: FC<MiniApp> = ({ id, name, link, coverUrl }) => {
    return (
        <div className={styles.miniApp}>
            <Card>
                <div style={{backgroundImage: `url(${coverUrl})`}} className={styles.miniApp_img}></div>
                <Link to={id}>
                    <h4 className={styles.miniApp_title}>{ name }</h4>
                </Link>
            </Card>
        </div>)
}

export default MiniAppCard;