import { FC, Fragment, useContext } from "react";
import {
    Button,
    Card,
    Col,
    Container,
    Image,
    ListGroup,
    Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext";
import { PaymentMethodContext } from "../../contexts/PaymentMethodContext";
import { ShippingContext } from "../../contexts/ShippingContext";
import { UserContext } from "../../contexts/UserContext";
import CheckoutSteps from "../CheckoutSteps";
import { Message } from "../Message";

interface PlaceOrderScreenProps {}

const PlaceOrderScreen: FC<PlaceOrderScreenProps> = ({}) => {
    const { userInfo, dispatch: userContextDispatch } = useContext(UserContext);
    const { cartItems, dispatch: cartContextDispatch } =
        useContext(CartContext);
    const { shippingAddress, shippingAddressDispatch } =
        useContext(ShippingContext);
    const { paymentMethod } = useContext(PaymentMethodContext);

    const itemsPrice = Number(
        cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    ).toFixed(2);
    const shippingPrice = Number(
        Number(itemsPrice) > 300
            ? 0
            : cartItems.reduce((acc, item) => acc + 10 * item.qty, 0)
    ).toFixed(2);
    const total = Number(Number(itemsPrice) + Number(shippingPrice)).toFixed(2);

    const placeOrderHandler = () => {};

    return (
        <Container>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup>
                        <ListGroup.Item>
                            <h2>Envio</h2>
                            <p>
                                <strong>Endereço:</strong>
                                {shippingAddress.address},
                                {shippingAddress.number},{shippingAddress.city},
                                {shippingAddress.postalCode},
                                {shippingAddress.state}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Pagamento</h2>
                            <p>
                                <strong>Método:</strong>
                                {paymentMethod.method}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Produtos</h2>

                            <strong>Produtos:</strong>
                            {cartItems.length === 0 ? (
                                <Message variant="info">
                                    Carrinho vazio.
                                </Message>
                            ) : (
                                <ListGroup variant="flush">
                                    {cartItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image
                                                        src={item.albumCover}
                                                        alt={item.albumName}
                                                        fluid
                                                        rounded
                                                    />
                                                </Col>
                                                <Col>
                                                    <Link
                                                        to={`/product/${item.id}`}
                                                    >
                                                        {item.albumName}
                                                    </Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} * R$
                                                    {item.price} = R$
                                                    {item.qty * item.price}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>Sumário</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Produtos</Col>
                                    <Col>R${itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Frete</Col>
                                    <Col>R${shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>R${total}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button
                                    type="button"
                                    className="btn-block"
                                    disabled={cartItems.length === 0}
                                    onClick={placeOrderHandler}
                                >
                                    Concluir Pedido
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};
export default PlaceOrderScreen;
