import { FC } from "react";
import { Image } from "ui/Image";
import s from "./FeedWidget.module.css";

interface IFeedWidgetProps {
    imageSrc: string;
}

const FeedWidget: FC<IFeedWidgetProps> = ({ imageSrc }) => {
    return (
        <div className={s.container}>
            <Image
                className={s.widget}
                src={imageSrc}
            />
        </div>
    );
};

export default FeedWidget;
