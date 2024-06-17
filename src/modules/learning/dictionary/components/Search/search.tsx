import { FC, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { useAppDispatch } from "Redux/hooks";
import { getTermsRequest, searchTermsRequest } from "modules/learning/dictionary";
import { SearchForm } from "models/learning/dictionary/SearchForm";
import { SearchInput } from "Components/SearchInput";

const SearchTerm: FC = () => {
    const dispatch = useAppDispatch();

    const { control, handleSubmit } = useForm<SearchForm>({ values: { query: "" } });

    const searchHandler = useCallback(
        (form: SearchForm) => {
            if (form.query) {
                dispatch(searchTermsRequest(form.query));
            } else {
                dispatch(getTermsRequest());
            }
        },
        [dispatch]
    );

    return (
        <form onSubmit={handleSubmit(searchHandler)}>
            <Controller
                control={control}
                name="query"
                render={({ field: { onChange, value } }) => (
                    <SearchInput
                        value={value}
                        onChange={onChange}
                    />
                )}
            />
        </form>
    );
};

export default SearchTerm;
