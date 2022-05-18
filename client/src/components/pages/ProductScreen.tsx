import { useQuery } from "@apollo/client";
import { FC, Fragment } from "react";
import { Row, Col, Image, ListGroup, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import {
    GET_RECORD_QUERY,
    Record,
    RecordInventoryData,
} from "../../contexts/ProductsContext";
import products from "../../products/products";
import { Rating } from "../Rating";

interface ProductScreenProps {}
interface RecordVars {
    id: string | undefined;
}

export const ProductScreen: FC = () => {
    const { id } = useParams();

    const { loading, data, error } = useQuery<RecordInventoryData, RecordVars>(
        GET_RECORD_QUERY,
        {
            variables: { id: id },
        }
    );
    // const product = products.find((p) => p.id === id) || {
    //     artistName: "Jay-Z",
    //     albumName: "Reasonable Doubt",
    //     releaseDate: 1996,
    //     producers: "pd",
    //     albumCover: "images/REASONABLE.jpg",
    //     description: "Its fo rizzle nizzle mi fo maurizzle stuff bibendum. ",
    //     genres: `Hip hop`,
    //     price: 0.0,
    //     numInStock: 10,
    //     rating: 4.5,
    //     numReviews: 12,
    // };

    return (
        <Fragment>
            <Link className="btn btn-light  my-3" to="/">
                Voltar
            </Link>
            {!loading ? (
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
                        <ListGroup>
                            <ListGroup.Item className="border-0">
                                <h3>{data?.record.albumName}</h3>
                            </ListGroup.Item>
                            <ListGroup.Item className="border-0" as="div">
                                <Rating
                                    value={
                                        data?.record.rating
                                            ? data?.record.rating
                                            : 0
                                    }
                                    text={`${data?.record.reviewsQty} avaliações`}
                                />
                            </ListGroup.Item>
                            <ListGroup.Item className="border-0">
                                Preço: R${data?.record.price}
                            </ListGroup.Item>
                            {/* <ListGroup.Item className="border-0">
                            Descrição: {data?.record.description}
                        </ListGroup.Item> */}
                        </ListGroup>
                    </Col>
                    <Col md={3}>
                        <Card>
                            <ListGroup.Item variant="flush">
                                <Row>
                                    <Col>Preço:</Col>
                                    <Col>
                                        <strong>R${data?.record.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item variant="flush">
                                <Row>
                                    <Col>Status:</Col>
                                    {/* <Col>
                                    {product.numInStock > 0
                                        ? "Em estoque"
                                        : "Indiponível"}
                                </Col> */}
                                </Row>
                            </ListGroup.Item>
                        </Card>
                    </Col>
                </Row>
            ) : (
                <h3>F</h3>
            )}
        </Fragment>
    );
};
