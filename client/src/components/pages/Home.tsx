import { FC, Fragment } from "react";
import { Col, Row } from "react-bootstrap";
import products from "../../products/products";
import { Product } from "../Product";

interface HomeProps {}

export const Home: FC<HomeProps> = () => {
    return (
        <Fragment>
            <h1>Discos</h1>

            <Row>
                {products.map((product) => (
                    <Col key={product.albumName} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product} />
                    </Col>
                ))}
            </Row>
        </Fragment>
    );
};
