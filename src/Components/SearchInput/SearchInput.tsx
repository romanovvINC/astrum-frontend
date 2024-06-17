import { FC, ChangeEvent } from "react";
import { Search } from "react-feather";
import { InputMain } from "ui/Input";

import s from "./SearchInput.module.scss";

type SearchInputProps = {
    value: string;
    onChange: (e: Date | ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | null) => void;
};

const SearchInput: FC<SearchInputProps> = ({ onChange, value }) => {
    return (
        <div className={s.search_term_form}>
            <InputMain
                value={value}
                onChange={onChange}
                placeholder="Поиск"
                label="Поиск термина"
                labelClassName={s.label}
            />

            <button
                className={s.search_button}
                type="submit"
            >
                <Search className={s.search_icon} />
            </button>
        </div>
    );
};

export default SearchInput;
