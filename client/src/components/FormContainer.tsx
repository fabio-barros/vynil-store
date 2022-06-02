import { FC, Fragment } from "react";
import { Col, Container, Row } from "react-bootstrap";

interface FormContainerProps {}

const FormContainer: FC<FormContainerProps> = ({ children }) => {
    return (
        <Container
            // className="py-3"

            style={{
                alignSelf: "center",
                // justifySelf: "center",
            }}
        >
            <Row
                style={{
                    display: "flex",
                    padding: "1.5rem",
                    alignContent: "center",
                    justifyContent: "center",
                }}
            >
                <Col xs={12} md={6}>
                    {children}
                </Col>
            </Row>
        </Container>
    );
};
export default FormContainer;
