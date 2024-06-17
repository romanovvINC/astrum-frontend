import { FC, useState } from "react";
import { Row } from "reactstrap";
import { useAppDispatch, useAppSelector } from "Redux/hooks";
import errorImg from "assets/images/search-not-found.png";
import { marketSelectors, addBasketProductRequest } from "modules/market";
import { MarketProduct } from "models/market/MarketProduct";
import ProductModal from "./ProductModal";
import MarketProductCard from "./MarketProductCard";
import { Image } from "ui/Image";

const ProductGrid: FC<any> = props => {
    let imagesrc = "";
    const layoutColumns = 3;
    const [dataid, setDataid] = useState("");
    const [openModal, setOpenModal] = useState(false);

    const onClickHandle = (i: MarketProduct) => {
        return () => {
            setOpenModal(true);
            setDataid(i.id);
        };
    };

    const { id: basketId } = useAppSelector(marketSelectors.getMarketBasket);
    const dispatch = useAppDispatch();

    const addToCarts = (productId: string) => {
        dispatch(
            addBasketProductRequest({
                productId,
                basketId,
                amount: 1,
            })
        );
    };

    const products = props.marketProducts;

    return (
        <div className="product-wrapper-grid">
            <Row className="gridRow">
                {products ? (
                    products.map((item: any) => {
                        if (item.coverUrl === undefined || item.coverUrl === null)
                            imagesrc =
                                "https://www.casavanity.com/modules/tea_lookbook/views/img/images/7dd432c8b0a1a7851d81077428351c08a437bd8b_watch.jpg";
                        else imagesrc = item.coverUrl;
                        return (
                            <div
                                id="gridId"
                                className={`${
                                    layoutColumns === 3 ? "col-xl-3 col-lg-6 col-sm-6 xl-4" : "col-xl-" + layoutColumns
                                }`}
                                key={item.id}
                            >
                                <MarketProductCard
                                    item={item}
                                    imageSrc={imagesrc}
                                    onClickAddToBasket={addToCarts}
                                    onClickProduct={onClickHandle(item)}
                                />
                            </div>
                        );
                    })
                ) : (
                    <Image
                        className={"img-fluid m-auto"}
                        src={errorImg}
                        alt={""}
                    />
                )}
                {openModal && (
                    <ProductModal
                        value={openModal}
                        setOpenModal={setOpenModal}
                        dataid={dataid}
                        products={products}
                        basketId={basketId}
                    />
                )}
            </Row>
        </div>
    );
};
export default ProductGrid;
