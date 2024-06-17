import { FC } from "react";
import { Container } from "reactstrap";
import { ProductInfoHeader, ProductInfo } from "modules/product";
import { useParams } from "react-router-dom";

const ProductInfoPage: FC = () => {
    const { id } = useParams();
    return (
        <Container fluid={false}>
            {/*TODO.. ПРОВЕРИТЬ НА АДМИНА И МЕНЕДЖЕРА */}
            <ProductInfoHeader enableActions={true} />
            <ProductInfo productId={id!} />
        </Container>
    );
};

export default ProductInfoPage;
