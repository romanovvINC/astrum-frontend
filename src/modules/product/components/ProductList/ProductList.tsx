import React, { FC, useCallback, useEffect } from "react";
import { Col, Row, Spinner } from "reactstrap";
import { ProductListItem, ProductListItemSkeleton } from "./ProductListItem";
import { useAppDispatch, useAppSelector } from "Redux/hooks";
import { getProductListAsyncRequest, getProductListRequest, productSelectors } from "modules/product";
import { InfiniteList } from "Components/InfiniteList";

const ProductList: FC = () => {
    const { pending, pendingAsync, canPendingAsync, error } = useAppSelector(productSelectors.getProductState);
    const { products, filter } = useAppSelector(productSelectors.getProductListInfo);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (products.length === 0) {
            dispatch(getProductListRequest(filter));
        }
    }, []);

    const searchProductsHandler = useCallback(() => {
        if (canPendingAsync) {
            dispatch(getProductListAsyncRequest(filter));
        }
    }, [filter, canPendingAsync]);

    if (error) {
        return (
            <Row>
                <h3 style={{ fontWeight: 400 }}>{error}</h3>
            </Row>
        );
    } else if (!pending && products.length === 0) {
        return (
            <Row>
                <h3 style={{ fontWeight: 400 }}>Нет продуктов</h3>
            </Row>
        );
    } else {
        return (
            <InfiniteList
                isLoading={pending && products.length === 0}
                isLoadingAsync={pendingAsync}
                loadingSkeleton={
                    <Row>
                        <Col
                            xl="12"
                            sm="6"
                        >
                            <ProductListItemSkeleton />
                        </Col>
                        <Col
                            xl="12"
                            sm="6"
                        >
                            <ProductListItemSkeleton />
                        </Col>
                    </Row>
                }
                asyncLoadingSkeleton={
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Spinner />
                    </div>
                }
                onScrollNearTheEnd={searchProductsHandler}
            >
                {products.map(a => (
                    <Col
                        key={a.id}
                        xl="12"
                        sm="6"
                    >
                        <ProductListItem {...a} />
                    </Col>
                ))}
            </InfiniteList>
        );
    }
};

export default ProductList;
