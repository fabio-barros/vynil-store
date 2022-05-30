import {
    ApolloError,
    QueryResult,
    useLazyQuery,
    useQuery,
} from "@apollo/client";
import { FC, Fragment, useContext, useEffect, useState } from "react";
import {
    Button,
    Card,
    Col,
    Form,
    Image,
    ListGroup,
    Row,
} from "react-bootstrap";
import { useLocation, useNavigate } from "react-router";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext";

import {
    GET_RECORD_QUERY,
    Record,
    RecordInventoryData,
    RecordsInventoryData,
} from "../../contexts/ProductsContext";
import { CartActionsKind, CartProduct } from "../../reducers/CartReducer";
import { Loader } from "../Loader";
import { Message } from "../Message";

interface CartScreenProps {}
interface RecordVars {
    id: string | undefined;
}

const CartScreen: FC<CartScreenProps> = ({}) => {
    const { id } = useParams();
    const [qty, setQty] = useState<number>(0);
    const [productId, setProductId] = useState<string>("");
    const locationQty = Number(useLocation().search.split("=")[1]);

    const { cartItems, dispatch } = useContext(CartContext);

    const [executeQuery, { loading }] = useLazyQuery<
        RecordInventoryData,
        RecordVars
    >(GET_RECORD_QUERY, {
        variables: { id: productId },
        onCompleted(data) {
            const payload: CartProduct = { ...data.record, qty: qty };
            dispatch({
                type: CartActionsKind.ADD_TO_CART,
                payload: payload,
            });
        },
    });

    const changeQtyHanler = (product: CartProduct, qty: number) => {
        console.log(qty);
        setQty(qty);
        dispatch({
            type: CartActionsKind.ADD_TO_CART,
            payload: {
                ...product,
                qty: qty,
            },
        });
    };

    let navigate = useNavigate();
    const goToCheckoutHandler = () => {
        navigate(`/login?redirect=shipping`);
    };

    useEffect(() => {
        if (id) {
            setQty(locationQty);
            setProductId(id);
            executeQuery();
        }
    }, [executeQuery, id, locationQty]);

    return (
        <Fragment>
            {" "}
            <Link className="btn btn-light  my-3" to="/">
                Continuar comprando
            </Link>
            <Row>
                <Col md={8}>
                    {!loading ? (
                        cartItems.length === 0 ? (
                            <Message variant="info">
                                Carrinho Vazio <Link to="/">Voltar</Link>
                            </Message>
                        ) : (
                            <ListGroup variant="flush">
                                {cartItems.map((item: CartProduct) => (
                                    <ListGroup.Item key={item.id}>
                                        <Row>
                                            <Col md={2}>
                                                <Link
                                                    to={`/product/${item.id}`}
                                                >
                                                    <Image
                                                        src={`../${item.albumCover}`}
                                                        alt={item.albumName}
                                                        fluid
                                                        rounded
                                                    ></Image>
                                                </Link>
                                            </Col>
                                            <Col md={3}>
                                                <Link
                                                    to={`/product/${item.id}`}
                                                >
                                                    {item.albumName}
                                                </Link>
                                            </Col>
                                            <Col md={2}>R${item.price}</Col>
                                            <Col md={2}>
                                                <Form.Control
                                                    as="select"
                                                    value={item.qty}
                                                    onChange={(e) =>
                                                        changeQtyHanler(
                                                            item,
                                                            Number(
                                                                e.target.value
                                                            )
                                                        )
                                                    }
                                                >
                                                    {[
                                                        ...Array(
                                                            item.qtyInStock
                                                        ).keys(),
                                                    ].map((x) => (
                                                        <option
                                                            value={x + 1}
                                                            key={x + 1}
                                                        >
                                                            {x + 1}
                                                        </option>
                                                    ))}
                                                </Form.Control>
                                            </Col>
                                            <Col md={2}>
                                                <Button
                                                    type="button"
                                                    variant="light"
                                                    onClick={() =>
                                                        dispatch({
                                                            type: CartActionsKind.REMOVE_FROM_CART,
                                                            payload: {
                                                                ...item,
                                                            },
                                                        })
                                                    }
                                                >
                                                    <i className="fas fa-trash"></i>
                                                </Button>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        )
                    ) : (
                        <Loader />
                    )}
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2
                                    style={{
                                        fontSize: "1.4rem",
                                        padding: "0.5rem 0",
                                    }}
                                >
                                    Subtotal (
                                    {cartItems.reduce(
                                        (acc, item) => acc + item.qty,
                                        0
                                    )}
                                    ) items
                                </h2>
                                R$
                                {cartItems
                                    .reduce(
                                        (acc, item) =>
                                            acc + item.qty * item.price,
                                        0
                                    )
                                    .toFixed(2)}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button
                                    type="button"
                                    className="btn-block"
                                    disabled={cartItems.length === 0}
                                    // onClick
                                >
                                    Finalizar Compra
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </Fragment>
    );
};
export default CartScreen;
