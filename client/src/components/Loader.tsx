import { FC } from "react";
import { Spinner } from "react-bootstrap";

interface LoaderProps {}

export const Loader: FC<LoaderProps> = ({}) => {
    return (
        <Spinner
            animation="border"
            role="status"
            style={{
                width: "100px",
                height: "100px",
                margin: "auto",
                display: "block",
            }}
        >
            <span className="sr-only">Carregando...</span>
        </Spinner>
    );
};
