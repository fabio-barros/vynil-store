import { FC, Fragment, useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { ProductsContext } from "../../contexts/ProductsContext";
import { UserContext } from "../../contexts/UserContext";
import products from "../../products/products";
import { Loader } from "../Loader";
import { Message } from "../Message";
import { Product } from "../Product";

interface HomeProps {}

export const Home: FC<HomeProps> = () => {
    const { loading, error, data } = useContext(ProductsContext);
    const { userInfo } = useContext(UserContext);

    return (
        <Container>
            {userInfo.user ? (
                <Message variant="success">{`Usuário: ${userInfo.user.username}`}</Message>
            ) : (
                <></>
            )}
            <h1>Discos</h1>
            {error ? (
                <Message variant="warning">{error.message}</Message>
            ) : !loading ? (
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
        </Container>
    );
};
