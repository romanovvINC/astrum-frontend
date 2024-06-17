import { FC, useEffect, useState } from "react";
import { ButtonMain } from "ui/Button";
import { ArrowDown } from "ui/icons";

import s from "./BackToTop.module.scss";

const BackToTop: FC = () => {
    const [visible, setVisible] = useState<boolean>(false);

    const scrollToTheTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        const toggleVisible = () => {
            const scrolled = document.documentElement.scrollTop;

            if (scrolled > 800) {
                setVisible(true);
            } else {
                setVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisible);

        return () => {
            window.removeEventListener("scroll", toggleVisible);
        };
    }, []);

    return (
        <div
            className={s.to_top}
            onClick={scrollToTheTop}
        >
            <ButtonMain className={`${s.button} ${visible ? s.visible : s.hidden}`}>
                <ArrowDown
                    className={s.arrow}
                    color="#000"
                />
            </ButtonMain>
        </div>
    );
};

export default BackToTop;
