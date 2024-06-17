import { FC, ReactElement, useEffect } from "react";

interface IInfiniteListProps {
    children: ReactElement[] | ReactElement;
    isLoading: boolean;
    isLoadingAsync: boolean;
    loadingSkeleton?: ReactElement;
    asyncLoadingSkeleton?: ReactElement;
    onScrollNearTheEnd: () => void;
}

const InfiniteList: FC<IInfiniteListProps> = ({
    children,
    isLoading,
    isLoadingAsync,
    loadingSkeleton,
    asyncLoadingSkeleton,
    onScrollNearTheEnd,
}) => {
    useEffect(() => {
        const scrollHandler = (e: any) => {
            if (
                e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) <
                    200 &&
                !isLoading &&
                !isLoadingAsync
            ) {
                onScrollNearTheEnd();
            }
        };
        document.addEventListener("scroll", scrollHandler);
        return function () {
            document.removeEventListener("scroll", scrollHandler);
        };
    }, [isLoading, isLoadingAsync, onScrollNearTheEnd]);

    if (isLoading && loadingSkeleton) {
        return loadingSkeleton;
    }

    return <div>{children}</div>;
};

export default InfiniteList;
