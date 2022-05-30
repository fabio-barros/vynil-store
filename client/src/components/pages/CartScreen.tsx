import {
    ApolloError,
    QueryResult,
    useLazyQuery,
    useQuery,
} from "@apollo/client";
import {
    FC,
    Fragment,
    useContext,
    useEffect,
    useReducer,
    useState,
} from "react";
import { Button, Col, Form, Image, ListGroup, Row } from "react-bootstrap";
import { useLocation } from "react-router";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext";

import {
    GET_RECORD_QUERY,
    ProductsContext,
    Record,
    RecordInventoryData,
    RecordsInventoryData,
} from "../../contexts/ProductsContext";
import { CartActionsKind } from "../../reducers/CartReducer";
import { Loader } from "../Loader";
import { Message } from "../Message";

interface CartScreenProps {}
interface RecordVars {
    id: string | undefined;
}

const CartScreen: FC<CartScreenProps> = ({}) => {
    const { id } = useParams();
    // const [cart, setCart] = useState<Record[]>([]);

    // const [cart, dispatch] = useReducer(reducer, initialState);
    const { cartItems, dispatch } = useContext(CartContext);
    const [executeQuery, { loading }] = useLazyQuery<
        RecordInventoryData,
        RecordVars
    >(GET_RECORD_QUERY, {
        variables: { id: id },
        onCompleted(data) {
            dispatch({
                type: CartActionsKind.ADD_TO_CART,
                payload: data.record,
            });

            // setCart([
            //     ...cart,
            //     localStorage.getItem("cartItems")
            //         ? JSON.parse(localStorage.getItem("cartItems") || "")
            //         : "",
            // ]);
        },
    });
    // const setCartHandler = () => {
    //     setCart([
    //         ...cart,
    //         localStorage.getItem("cartItems")
    //             ? JSON.parse(localStorage.getItem("cartItems") || "")
    //             : "",
    //     ]);
    // };

    const qty = useLocation().search.split("=")[1];
    console.log(cartItems);

    useEffect(() => {
        if (id) {
            executeQuery();
        }
    }, [executeQuery, id]);

    return (
        <Fragment>
            {" "}
            <Link className="btn btn-light  my-3" to="/">
                Continuar comprando
            </Link>
            {!loading ? (
                cartItems.length === 0 ? (
                    <Message variant="info">
                        Carrinho Vazio <Link to="/">Voltar</Link>
                    </Message>
                ) : (
                    <ListGroup variant="flush">
                        {cartItems.map((item) => (
                            <ListGroup.Item key={item.id}>
                                <Row>
                                    <Col md={2}>
                                        <Image
                                            src={`../${item.albumCover}`}
                                            alt={item.albumName}
                                            fluid
                                            rounded
                                        ></Image>
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/product/${item.id}`}>
                                            {item.albumName}
                                        </Link>
                                    </Col>
                                    <Col md={2}>R${item.price}</Col>
                                    <Col md={2}>
                                        <Form.Control
                                            as="select"
                                            value={qty}
                                            // onChange={(e) =>
                                            //     dispatch(
                                            //         addToCart(
                                            //             item.product,
                                            //             Number(e.target.value)
                                            //         )
                                            //     )
                                            // }
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
                                            // onClick={() =>
                                            //     removeFromCartHandler(
                                            //         item.product
                                            //     )
                                            // }
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
        </Fragment>
    );
};
export default CartScreen;
