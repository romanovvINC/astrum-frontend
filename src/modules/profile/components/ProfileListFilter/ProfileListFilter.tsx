import { FC, useCallback, useEffect } from "react";
import { Filter } from "ui/Filter";
import { useAppDispatch, useAppSelector } from "Redux/hooks";
import { setFilter, setPredicate, profileSelectors, getProfileListFilterRequest } from "modules/profile";
import ProfileListFilterSkeleton from "modules/profile/components/ProfileListFilter/ProfileListFilterSkeleton";

const ProfileListFilter: FC = () => {
    const { pendingFilter, filter, filterVariants } = useAppSelector(profileSelectors.getProfileListFilter);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getProfileListFilterRequest());
    }, []);

    const setFilterSearchHandler = useCallback((predicate: string) => {
        dispatch(setPredicate({ predicate }));
    }, []);

    const setFilterHandler = useCallback((filter: { [fieldName: string]: string }) => {
        dispatch(setFilter(filter));
    }, []);

    if (pendingFilter) {
        return <ProfileListFilterSkeleton />;
    }

    return (
        <Filter
            title="Найти сотрудника"
            filter={filter}
            filterVariants={filterVariants}
            onSetFilter={setFilterHandler}
            onSetPredicate={setFilterSearchHandler}
        />
    );
};

export default ProfileListFilter;
