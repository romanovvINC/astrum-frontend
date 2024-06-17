import { FC, useState } from "react";
import { SelectArrowIcon } from "ui/icons";

import classNames from "classnames";
import s from "./alphabet.module.scss";

const Alphabet: FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const clickHandler = (): void => {
        setIsOpen(!isOpen);
    };

    return (
        <div style={{ margin: "10px 0" }}>
            <button
                className={s.show_alphabet}
                type="button"
                onClick={clickHandler}
            >
                {isOpen ? "Скрыть алфавит" : "Показать алфавит"}
                <SelectArrowIcon
                    width={12}
                    color="#999"
                    className={classNames(s.icon, { [s.rotated]: isOpen })}
                />
            </button>

            {isOpen && (
                <>
                    <div
                        id="ru"
                        className={s.alphabet}
                    >
                        <div>А</div>
                        <div>Б</div>
                        <div>В</div>
                        <div>Г</div>
                        <div>Д</div>
                        <div>Е</div>
                        <div>Ж</div>
                        <div>З</div>
                        <div>И</div>
                        <div>К</div>
                        <div>Л</div>
                        <div>М</div>
                        <div>Н</div>
                        <div>О</div>
                        <div>П</div>
                        <div>Р</div>
                        <div>С</div>
                        <div>Т</div>
                        <div>У</div>
                        <div>Ф</div>
                        <div>Х</div>
                        <div>Ц</div>
                        <div>Ч</div>
                        <div>Ш</div>
                        <div>Щ</div>
                        <div>Э</div>
                        <div>Ю</div>
                        <div>Я</div>
                    </div>
                    <div
                        id="en"
                        className={s.alphabet}
                    >
                        <div>A</div>
                        <div>B</div>
                        <div>C</div>
                        <div>D</div>
                        <div>E</div>
                        <div>F</div>
                        <div>G</div>
                        <div>H</div>
                        <div>I</div>
                        <div>J</div>
                        <div>K</div>
                        <div>L</div>
                        <div>M</div>
                        <div>N</div>
                        <div>O</div>
                        <div>P</div>
                        <div>Q</div>
                        <div>R</div>
                        <div>S</div>
                        <div>T</div>
                        <div>U</div>
                        <div>V</div>
                        <div>W</div>
                        <div>X</div>
                        <div>Y</div>
                        <div>Z</div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Alphabet;
