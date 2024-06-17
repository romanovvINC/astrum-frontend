import { FC } from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import Slider from "react-slick";
import { Image } from "ui/Image";
import { ReactComponent as AngleLeft } from "../../../../assets/svg/sliderArrows/prev-arrow-icon.svg";
import { ReactComponent as AngleRight } from "../../../../assets/svg/sliderArrows/next-arrow-icon.svg";
import { useAppSelector } from "Redux/hooks";
import s from "./FeedSlider.module.scss";

interface IArrowProps {
    className?: string;
    style?: object;
    onClick?: (e: any) => void;
}

const PrevArrow: FC<IArrowProps> = ({ className, style, onClick }) => {
    return (
        <div
            className={`${className} ${s.control} ${s.prev_control}`}
            style={{ ...style }}
            onClick={onClick}
        >
            <AngleLeft className={s.control_image} />
        </div>
    );
};

const NextArrow: FC<IArrowProps> = ({ className, style, onClick }) => {
    return (
        <div
            className={`${className} ${s.control} ${s.next_control}`}
            style={{ ...style }}
            onClick={onClick}
        >
            <AngleRight className={s.control_image} />
        </div>
    );
};

const config = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1500,
    autoplaySpeed: 6000,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
};

const FeedSlider: FC = () => {
    const banners = useAppSelector(state => state.feedReducer.state.banners);
    return (
        <Row className={s.slider_container}>
            <Col>
                <Card>
                    <CardBody>
                        <Slider {...config}>
                            {banners.map(e => {
                                return (
                                    <div
                                        key={e.id}
                                        className={s.cont}
                                    >
                                        <Image
                                            className={s.i}
                                            src={e.imageUrl}
                                        />
                                    </div>
                                );
                            })}
                        </Slider>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    );
};

export default FeedSlider;
