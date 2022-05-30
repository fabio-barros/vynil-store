import { FC } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Record } from "../contexts/ProductsContext";
import { Rating } from "./Rating";
import "../styles/Product.css";
export interface ProductInterface {
    id: string;
    artistName: string;
    albumName: string;
    releaseDate: number;
    producers: string;
    albumCover: string;
    genres: string;
    description: string;
    price: number;
    numInStock: number;
    rating: number;
    numReviews: number;
}

export interface ProductProps {
    product: Record;
}

export const Product: FC<ProductProps> = ({ product }) => {
    const {
        id,
        albumCover,
        artistName,
        albumName,
        releaseDate,
        rating,
        reviewsQty,
        price,
    } = product;
    return (
        <Card className="card my-2 border-0 ">
            <Link to={`/product/${id}`}>
                <Card.Img
                    className="card-img"
                    src={albumCover}
                    variant="top"
                ></Card.Img>
            </Link>
            <Card.Body className="p-2 card-body">
                <Link to={`/product/${id}`}>
                    <Card.Title as="div">
                        <h4 style={{ fontSize: "1rem" }}>{`${albumName}`}</h4>
                        <strong
                            style={{ fontSize: "1rem" }}
                        >{`${artistName}`}</strong>
                    </Card.Title>
                    <Card.Subtitle>
                        <strong>{releaseDate}</strong>
                    </Card.Subtitle>
                </Link>
                <Card.Text as="div">
                    <Rating value={rating} text={`${reviewsQty} avaliações`} />
                </Card.Text>
                <Card.Text as="h3">R${price}</Card.Text>
            </Card.Body>
        </Card>
    );
};
