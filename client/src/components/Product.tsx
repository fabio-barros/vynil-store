import { FC } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Record } from "../contexts/ProductContext";
import { Rating } from "./Rating";

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
        <Card className="my-2 border-0">
            <Link to={`/product/${id}`}>
                <Card.Img src={albumCover} variant="top"></Card.Img>
            </Link>
            <Card.Body className="p-2">
                <Link to={`/product/${id}`}>
                    <Card.Title as="div">
                        <strong>{`${artistName} - ${albumName}`}</strong>
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
