import { FC } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

interface ProductInterface {
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

interface ProductProps {
    product: ProductInterface;
}

export const Product: FC<ProductProps> = ({ product }) => {
    const {
        albumCover,
        artistName,
        albumName,
        releaseDate,
        rating,
        numReviews,
        price,
    } = product;
    return (
        <Card className="my-2 border-0">
            <Link to={`/product/${albumName}`}>
                <Card.Img src={albumCover} variant="top"></Card.Img>
            </Link>
            <Card.Body className="p-2">
                <Link to={`/${albumName}`}>
                    <Card.Title as="div">
                        <strong>{`${artistName} - ${albumName}`}</strong>
                    </Card.Title>
                    <Card.Subtitle>
                        <strong>{releaseDate}</strong>
                    </Card.Subtitle>
                </Link>
                <Card.Text as="h3">R${price}</Card.Text>
            </Card.Body>
        </Card>
    );
};
