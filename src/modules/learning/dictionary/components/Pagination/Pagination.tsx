import { FC } from "react";
import Slider, { Settings } from "react-slick";
import Arrow from "ui/icons/ArrowDown";
import { ButtonMain } from "ui/Button";
import { PaginationItem } from "models/learning/dictionary/PaginationItem";
import { useAppSelector } from "Redux/hooks";
import { dictionarySelectors } from "modules/learning/dictionary";

import s from "./Pagination.module.scss";

interface IArrowProps {
    className?: string;
    style?: object;
    onClick?: (e: any) => void;
}

const PrevArrow: FC<IArrowProps> = ({ className, style, onClick }) => {
    return (
        <ButtonMain
            className={`${className} ${s.control} ${s.prev}`}
            style={{ ...style }}
            onClick={onClick}
        >
            <Arrow
                className={s.arrow_prev}
                color="#000"
            />
        </ButtonMain>
    );
};

const NextArrow: FC<IArrowProps> = ({ className, style, onClick }) => {
    return (
        <ButtonMain
            className={`${className} ${s.control} ${s.next}`}
            style={{ ...style }}
            onClick={onClick}
        >
            <Arrow
                className={s.arrow_next}
                color="#000"
            />
        </ButtonMain>
    );
};

const Pagination: FC<PaginationItem> = ({ position, onClick, length }) => {
    const settings: Settings = {
        infinite: false,
        slidesToShow: 10,
        slidesToScroll: 10,
        speed: 500,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
    };

    const { answeredPages } = useAppSelector(dictionarySelectors.getPractice);

    return (
        <div className={s.slider_container}>
            <Slider {...settings}>
                {Array.from({ length }, (_, idx) => idx + 1).map((item, index) => (
                    <ButtonMain
                        variant="default"
                        key={index}
                        className={`${s.page}  ${
                            position === index ? s.current : answeredPages.includes(item) && s.answered
                        }`}
                        onClick={() => onClick(index)}
                    >
                        {item}
                    </ButtonMain>
                ))}
            </Slider>
        </div>
    );
};

export default Pagination;
