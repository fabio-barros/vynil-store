import { FC, Fragment } from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

interface CheckoutStepsProps {
    step1: any;
    step2: any;
    step3?: any;
    step4?: any;
}

const CheckoutSteps: FC<CheckoutStepsProps> = ({
    step1,
    step2,
    step3,
    step4,
}) => {
    return (
        <Nav className="justify-content-center mb-4">
            <Nav.Item>
                {step1 ? (
                    <LinkContainer to="/login">
                        <Nav.Link>Entrar</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>Entrar</Nav.Link>
                )}
            </Nav.Item>
            <Nav.Item>
                {step2 ? (
                    <LinkContainer to="/shipping">
                        <Nav.Link>Envio</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>Envio</Nav.Link>
                )}
            </Nav.Item>
            <Nav.Item>
                {step3 ? (
                    <LinkContainer to="/payment">
                        <Nav.Link>Pagamento</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>Pagamento</Nav.Link>
                )}
            </Nav.Item>
            <Nav.Item>
                {step4 ? (
                    <LinkContainer to="/placeorder">
                        <Nav.Link>Concluir </Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>Concluir </Nav.Link>
                )}
            </Nav.Item>
        </Nav>
    );
};
export default CheckoutSteps;
