import { FC } from "react";
import { Col, Container, Row } from "react-bootstrap";

interface FooterProps {}

export const Footer: FC<FooterProps> = ({}) => {
    return (
        <Container>
            <Row>
                <Col className="text-center py-3">Copyright &copy;</Col>
            </Row>
        </Container>
    );
};
