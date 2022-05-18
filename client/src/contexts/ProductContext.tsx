import { ApolloError, gql, useQuery } from "@apollo/client";
import { createContext, FC, Fragment } from "react";

const GET_RECORDS_QUERY = gql`
    query GetRecordsQuery {
        records {
            id
            artistName
            albumName
            albumCover
            releaseDate
            price
            rating
            reviewsQty
        }
    }
`;

interface Review {
    name: string;
    rating: number;
    comment: string;
}

interface Producer {
    name: string;
}

export interface Record {
    id: string;
    artistName: string;
    albumName: string;
    releaseDate: number;
    // producers: Producer[];
    albumCover: string;
    // genres: string[];
    // description: string;
    price: number;
    // qtyInStock: number;
    rating: number;
    // reviews: Review[];
    reviewsQty: number;
}

export interface RecordInventoryData {
    records: Record[];
}
interface ProductContextProps {
    loading: boolean;
    data: RecordInventoryData | undefined;
    error: ApolloError | undefined;
}

export const ProductsContext = createContext({} as ProductContextProps);

const ProductContextProvider: FC = ({ children }) => {
    const { loading, data, error } =
        useQuery<RecordInventoryData>(GET_RECORDS_QUERY);
    return (
        <ProductsContext.Provider value={{ loading, error, data }}>
            {children}
        </ProductsContext.Provider>
    );
};
export default ProductContextProvider;
