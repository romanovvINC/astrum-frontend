import { FC, useCallback, useEffect } from "react";
import { Col, Row } from "reactstrap";
import { useAppDispatch, useAppSelector } from "Redux/hooks";
import { getInventoryListRequest, inventorySelectors } from "modules/inventory";
import { InfiniteList } from "Components/InfiniteList";
import { InventoryCard } from "./InventoryCard";
import { getInventoryListAsyncRequest } from "modules/inventory/store";
import InventoryListSkeleton from "modules/inventory/components/InventoryList/InventoryListSkeleton";

const InventoryList: FC = () => {
    const { pending, pendingAsync, inventoryList, canPendingAsync, filter, error } = useAppSelector(
        inventorySelectors.getInventoryState
    );
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getInventoryListRequest(filter));
    }, [filter]);

    const loadItemsAsyncHandler = useCallback(() => {
        if (canPendingAsync) {
            dispatch(getInventoryListAsyncRequest(filter));
        }
    }, [filter, canPendingAsync]);

    return (
        <InfiniteList
            isLoading={pending && inventoryList.length === 0}
            isLoadingAsync={pendingAsync}
            loadingSkeleton={<InventoryListSkeleton />}
            onScrollNearTheEnd={loadItemsAsyncHandler}
        >
            <Row>
                {inventoryList.map(item => (
                    <Col
                        key={item.id}
                        xl={6}
                    >
                        <InventoryCard {...item} />
                    </Col>
                ))}
            </Row>
        </InfiniteList>
    );
};

export default InventoryList;
