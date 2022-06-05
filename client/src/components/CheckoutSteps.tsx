import { FC, Fragment, useContext } from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { UserContext } from "../contexts/UserContext";

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
    const { userInfo, dispatch } = useContext(UserContext);

    return (
        <Nav className="justify-content-center mb-4">
            <Nav.Item>
                {step1 && !userInfo.access_token ? (
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
                        <Nav.Link>
                            {" "}
                            <span
                                style={
                                    step1 && step2 && !step3
                                        ? {
                                              color: "#343A40",
                                              fontSize: "1.05rem",
                                              fontWeight: "bold",
                                          }
                                        : {}
                                }
                            >
                                Envio
                            </span>
                        </Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>Envio</Nav.Link>
                )}
            </Nav.Item>
            <Nav.Item>
                {step3 ? (
                    <LinkContainer to="/payment">
                        <Nav.Link>
                            {" "}
                            <span
                                style={
                                    step1 && step2 && step3 && !step4
                                        ? {
                                              color: "#343A40",
                                              fontSize: "1.05rem",
                                              fontWeight: "bold",
                                          }
                                        : {}
                                }
                            >
                                Pagamento
                            </span>{" "}
                        </Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>Pagamento</Nav.Link>
                )}
            </Nav.Item>
            <Nav.Item>
                {step4 ? (
                    <LinkContainer to="/placeorder">
                        <Nav.Link>
                            {" "}
                            <span
                                style={
                                    step1 && step2 && step3 && step4
                                        ? {
                                              color: "#343A40",
                                              fontSize: "1.05rem",
                                              fontWeight: "bold",
                                          }
                                        : {}
                                }
                            >
                                Concluir
                            </span>{" "}
                        </Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>Concluir </Nav.Link>
                )}
            </Nav.Item>
        </Nav>
    );
};
export default CheckoutSteps;
