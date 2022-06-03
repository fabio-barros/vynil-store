import { FC, Fragment } from "react";
import { Col, Container, ListGroup, Row } from "react-bootstrap";
import CheckoutSteps from "../CheckoutSteps";

interface PlaceOrderScreenProps {}

const PlaceOrderScreen: FC<PlaceOrderScreenProps> = ({}) => {
    return (
        <Container>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup>
                        <ListGroup.Item>
                            <h2>Envio</h2>
                            <p>
                                <strong>Endereço</strong>
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Pagamento</h2>
                            <p>
                                <strong>Método:</strong>
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Produtos</h2>
                            <p>
                                <strong>Método:</strong>
                            </p>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
};
export default PlaceOrderScreen;
