import { FC, Fragment, useContext } from "react";
import { Col, Row } from "react-bootstrap";
import { ProductsContext } from "../../contexts/ProductsContext";
import products from "../../products/products";
import { Loader } from "../Loader";
import { Product } from "../Product";

interface HomeProps {}

export const Home: FC<HomeProps> = () => {
    const { loading, error, data } = useContext(ProductsContext);
    return (
        <Fragment>
            <h1>Discos</h1>
            {!loading ? (
                <Row>
                    {data?.records.map((product) => (
                        <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                            <Product product={product} />
                        </Col>
                    ))}
                </Row>
            ) : (
                <Loader />
            )}
        </Fragment>
    );
};
