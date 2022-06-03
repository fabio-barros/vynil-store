import { useQuery } from "@apollo/client";
import { FC, Fragment, useState } from "react";
import {
    Row,
    Col,
    Image,
    ListGroup,
    Card,
    Button,
    Form,
    Container,
} from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
    GET_RECORD_QUERY,
    Record,
    RecordInventoryData,
} from "../../contexts/ProductsContext";
import products from "../../products/products";
import { Loader } from "../Loader";
import { Message } from "../Message";
import { Rating } from "../Rating";

interface ProductScreenProps {}
interface RecordVars {
    id: string | undefined;
}

export const ProductScreen: FC = () => {
    const { id } = useParams();
    const [qty, setQty] = useState(0);
    const { loading, data, error } = useQuery<RecordInventoryData, RecordVars>(
        GET_RECORD_QUERY,
        {
            variables: { id: id },
            context: { headers: { authorization: "" } },
        }
    );

    let navigate = useNavigate();
    const addToCartHandler = () => {
        navigate(`/cart/${id}?qty=${qty}`);
    };

    return (
        <Container>
            <Link className="btn btn-light  my-3" to="/">
                Voltar
            </Link>
            {!loading ? (
                <>
                    <Row>
                        {console.log(data?.record)}
                        <Col md={5}>
                            <Image
                                src={`../${data?.record.albumCover}`}
                                alt={data?.record.albumName}
                                width="420"
                                height="400"
                                fluid
                            />
                        </Col>
                        <Col sm={12} md={4}>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h3>{data?.record.albumName}</h3>
                                </ListGroup.Item>
                                <ListGroup.Item as="div">
                                    <Rating
                                        value={
                                            data?.record.rating
                                                ? data?.record.rating
                                                : 0
                                        }
                                        text={`${data?.record.reviewsQty} avaliações`}
                                    />
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Preço: R${data?.record.price}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Descrição: {data?.record.description}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={3}>
                            <Card>
                                <ListGroup.Item variant="flush">
                                    <Row>
                                        <Col>Preço:</Col>
                                        <Col>
                                            <strong>
                                                R${data?.record.price}
                                            </strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item variant="flush">
                                    <Row>
                                        <Col>Status:</Col>
                                        <Col>
                                            {(data?.record.qtyInStock
                                                ? data?.record.qtyInStock
                                                : 0) > 0
                                                ? "Em estoque"
                                                : "Indiponível"}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                {(data?.record.qtyInStock
                                    ? data?.record.qtyInStock
                                    : 0) > 0 && (
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Quantidade:</Col>
                                            <Col>
                                                <Form.Control
                                                    as="select"
                                                    value={qty}
                                                    onChange={(e) =>
                                                        setQty(
                                                            parseInt(
                                                                e.target.value
                                                            )
                                                        )
                                                    }
                                                >
                                                    {[
                                                        ...Array(
                                                            data?.record
                                                                .qtyInStock
                                                        ).keys(),
                                                    ].map((x: number) => (
                                                        <option
                                                            value={x + 1}
                                                            key={x + 1}
                                                        >
                                                            {x + 1}
                                                        </option>
                                                    ))}
                                                </Form.Control>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                )}
                                <ListGroup.Item>
                                    <Button
                                        onClick={addToCartHandler}
                                        className="btn-block"
                                        type="button"
                                        disabled={
                                            (data?.record.qtyInStock
                                                ? data.record.qtyInStock
                                                : 0) === 0
                                        }
                                    >
                                        Adicionar ao carrinho
                                    </Button>
                                </ListGroup.Item>
                            </Card>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col md={6}>
                            <h2>Avaliações</h2>
                            {data?.record.reviews.length === 0 && (
                                <Message variant="info">Sem Avaliações</Message>
                            )}
                            <ListGroup variant="flush">
                                {data?.record.reviews.map((review) => (
                                    <ListGroup.Item key={review.comment}>
                                        <strong>{review.name}</strong>
                                        <Rating value={review.rating} />
                                        {/* <p>
                                            {review.createdAt.substring(0, 10)}
                                        </p> */}
                                        <p>{review.comment}</p>
                                    </ListGroup.Item>
                                ))}
                                {/* <ListGroup>
                                    <h2>Escreva uma avaliação</h2>
                                    {userInfo. ? (
                                        <h1></h1>
                                    ) : (
                                        <Message>
                                            Faça <Link to="/login">login</Link>{" "}
                                            para escrever uma avaliação
                                        </Message>
                                    )}
                                </ListGroup> */}
                            </ListGroup>
                        </Col>
                    </Row>
                </>
            ) : (
                <Loader />
            )}
        </Container>
    );
};
